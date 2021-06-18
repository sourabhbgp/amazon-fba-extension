import "../css/content.css";
import { createColumn, createContainer, createKeyValue } from "./component";
import { finalData, finalOffer } from "../utils/model";
import { numberWithCommas, extractNumber } from "../utils/helper";
import { map, min } from "lodash";

const UI_Render = (data: finalData, offerData: finalOffer): void => {
  const POINT = document.getElementById("centerCol") as HTMLDivElement;

  if (POINT) {
    const Container = createContainer();

    // ASIN Column
    const ASIN_Column = createColumn("Basic Info", "#81ecec6b");
    const ASIN_Data = createKeyValue({ key: "ASIN", value: data.ASIN });

    const Current_BSR = createKeyValue({
      key: "Current BSR",
      value: `${offerData.currentBSR}`,
    });

    const Total_Offer = createKeyValue({
      key: "Total Offer",
      value: offerData.totalOffer,
    });

    const Total_Amazon = createKeyValue({
      key: "Amazon",
      value: offerData.totalAmazon,
    });

    const TotalFBA_Data = createKeyValue({
      key: "Total FBA",
      value: offerData.totalFBA,
    });
    const TotalFBM_Data = createKeyValue({
      key: "Total FBM",
      value: offerData.totalFBM,
    });

    if (ASIN_Data) ASIN_Column.appendChild(ASIN_Data);
    if (Current_BSR) ASIN_Column.appendChild(Current_BSR);
    if (Total_Offer) ASIN_Column.appendChild(Total_Offer);
    if (Total_Amazon) ASIN_Column.appendChild(Total_Amazon);
    if (TotalFBM_Data) ASIN_Column.appendChild(TotalFBM_Data);
    if (TotalFBA_Data) ASIN_Column.appendChild(TotalFBA_Data);
    Container.appendChild(ASIN_Column);

    // Sales Rank Column
    const SalesRank_Column = createColumn("Sales Rank", "#2ecc7159");

    const SalesRank30_Data = createKeyValue({
      key: "30 Days",
      value: numberWithCommas(data.avgSalesRank30),
    });

    const SalesRank90_Data = createKeyValue({
      key: "90 Days",
      value: numberWithCommas(data.avgSalesRank90),
    });
    const SalesRank180_Data = createKeyValue({
      key: "180 Days",
      value: numberWithCommas(data.avgSalesRank180),
    });
    const SalesRankAvg_Data = createKeyValue({
      key: "Average",
      value: numberWithCommas(Math.round(data.avgSalesRank)),
    });
    const SalesRankDrop_Data = createKeyValue({
      key: "Drop (30)",
      value: numberWithCommas(data.salesRankDrops30),
    });

    if (SalesRank30_Data) SalesRank_Column.appendChild(SalesRank30_Data);
    if (SalesRank90_Data) SalesRank_Column.appendChild(SalesRank90_Data);
    if (SalesRank180_Data) SalesRank_Column.appendChild(SalesRank180_Data);
    if (SalesRankAvg_Data) SalesRank_Column.appendChild(SalesRankAvg_Data);
    if (SalesRankDrop_Data) SalesRank_Column.appendChild(SalesRankDrop_Data);
    Container.appendChild(SalesRank_Column);

    // Price Average Column
    const PriceAvg_Column = createColumn("Price Average", "#9b59b647");
    const PriceAvg90_Data = createKeyValue({
      key: "90 Days",
      value: `$${numberWithCommas((data.avgPrice90 / 100).toFixed(2))}`,
    });
    const PriceAvg180_Data = createKeyValue({
      key: "180 Days",
      value: `$${numberWithCommas((data.avgPrice180 / 100).toFixed(2))}`,
    });
    const PriceAvg_Data = createKeyValue({
      key: "Average Price",
      value: `$${numberWithCommas((data.avgPrice / 100).toFixed(2))}`,
    });
    if (PriceAvg90_Data) PriceAvg_Column.appendChild(PriceAvg90_Data);
    if (PriceAvg180_Data) PriceAvg_Column.appendChild(PriceAvg180_Data);
    if (PriceAvg_Data) PriceAvg_Column.appendChild(PriceAvg_Data);
    Container.appendChild(PriceAvg_Column);

    // Lowest FBA and its Competitor Column
    const FBA_Column = createColumn("FBA Info", "#e74c3c4f");
    const AMZ_PRICE_Data = createKeyValue({
      key: "AMZ Price",
      value: `$${offerData.amzPrice}`,
    });

    const LowestFBA_Data = createKeyValue({
      key: "Lowest FBA",
      value: `$${offerData.lowestFBA}`,
    });
    const Rise5cent_Data = createKeyValue({
      key: "5% Rise",
      value: `$${offerData.rise5Percent}`,
    });
    const FBACompetitor_Data = createKeyValue({
      key: "Competitor",
      value: offerData.totalcomp,
    });
    if (AMZ_PRICE_Data) FBA_Column.appendChild(AMZ_PRICE_Data);
    if (LowestFBA_Data) FBA_Column.appendChild(LowestFBA_Data);
    if (Rise5cent_Data) FBA_Column.appendChild(Rise5cent_Data);
    if (FBACompetitor_Data) FBA_Column.appendChild(FBACompetitor_Data);
    Container.appendChild(FBA_Column);

    POINT.insertAdjacentElement("afterbegin", Container);
  }
};

const main = () => {
  let finalOffer: finalOffer;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse({ message: "received" });

    offerClick()
      .then((d) => {
        if (d) {
          finalOffer = d;
          if (request.finalData && finalOffer) {
            // console.log(request.finalData, finalOffer);
            UI_Render(request.finalData, finalOffer);
          }
        }
      })
      .catch((err) => console.error(err));
  });
};

chrome.storage.sync.get(null, (data) => {
  if (data.token) main();
});

interface OfferList {
  whole_price: number;
  decimal_price: number;
  ship_from: string;
  ship_fee: string;
  sold_by: string;
}

const getOfferList = (): Array<OfferList> => {
  const DATA: Array<OfferList> = [];

  document.querySelectorAll("#aod-pinned-offer").forEach((ele, i) => {
    let point = ele.querySelector(
      "#aod-offer-heading h5"
    ) as HTMLHeadingElement;
    let wp = ele.querySelector(".a-price-whole") as HTMLSpanElement;

    let whole_price: number = 0;
    let decimal_price: number = 0;
    let ship_fee: string = "";
    let ship_from: string = "";
    let sold_by: string = "";
    let title: string = "";

    if (point && wp) {
      title = point.innerText.trim();

      if (!(title.toLowerCase() === "new")) return;

      let whole_price_point = ele.querySelector(
        ".a-price-whole"
      ) as HTMLSpanElement;
      let decimal_price_point = ele.querySelector(
        ".a-price-fraction"
      ) as HTMLSpanElement;
      let ship_from_point = ele.querySelectorAll(
        "#aod-offer-shipsFrom span"
      ) as NodeListOf<HTMLSpanElement>;

      if (whole_price_point) {
        whole_price = Number(whole_price_point.textContent);
      }

      if (decimal_price_point) {
        decimal_price = Number(decimal_price_point.textContent);
      }

      if (ship_from_point.length >= 2) {
        ship_from = ship_from_point[1].textContent?.trim() as string;
      }

      let ship_fee_point1 = ele.querySelector(
        `#aod-bottlingDepositFee-0`
      ) as HTMLDivElement;

      let ship_fee_point2 = ele.querySelector(
        "#delivery-message"
      ) as HTMLDivElement;

      if (
        ship_fee_point1 &&
        ship_fee_point1.nextElementSibling?.textContent?.trim()
      ) {
        ship_fee =
          ship_fee_point1.nextElementSibling.textContent.trim() as string;
      } else if (ship_fee_point2) {
        ship_fee = ship_fee_point2.innerText.split(":")[0].trim() as string;
      }

      let sold_by_point1 = ele.querySelector(
        "#aod-offer-soldBy a"
      ) as HTMLAnchorElement;

      let sold_by_point2 = ele.querySelectorAll(
        "#aod-offer-soldBy span"
      ) as NodeListOf<HTMLSpanElement>;

      if (sold_by_point1) {
        sold_by = sold_by_point1.innerText.trim();
      } else if (sold_by_point2.length >= 2) {
        sold_by = sold_by_point2[1].innerText.trim();
      }
      DATA.push({ whole_price, decimal_price, ship_from, ship_fee, sold_by });
    }
  });

  document.querySelectorAll("#aod-offer").forEach((ele, i) => {
    let point = ele.querySelector(
      "#aod-offer-heading h5"
    ) as HTMLHeadingElement;
    let wp = ele.querySelector(".a-price-whole") as HTMLSpanElement;

    let whole_price: number = 0;
    let decimal_price: number = 0;
    let ship_fee: string = "";
    let ship_from: string = "";
    let sold_by: string = "";
    let title: string = "";

    if (point && wp) {
      title = point.innerText.trim();

      if (!(title.toLowerCase() === "new")) return;

      let whole_price_point = ele.querySelector(
        ".a-price-whole"
      ) as HTMLSpanElement;

      let decimal_price_point = ele.querySelector(
        ".a-price-fraction"
      ) as HTMLSpanElement;

      let ship_from_point = ele.querySelectorAll(
        "#aod-offer-shipsFrom span"
      ) as NodeListOf<HTMLSpanElement>;

      if (whole_price_point) {
        whole_price = Number(whole_price_point.textContent);
      }

      if (decimal_price_point) {
        decimal_price = Number(decimal_price_point.textContent);
      }

      if (ship_from_point.length >= 2) {
        ship_from = ship_from_point[1].textContent?.trim() as string;
      }

      let ship_fee_point1 = ele.querySelector(
        `#aod-bottlingDepositFee-${i + 1}`
      ) as HTMLDivElement;

      let ship_fee_point2 = ele.querySelector(
        "#delivery-message"
      ) as HTMLDivElement;

      if (
        ship_fee_point1 &&
        ship_fee_point1.nextElementSibling?.textContent?.trim()
      ) {
        ship_fee =
          ship_fee_point1.nextElementSibling.textContent.trim() as string;
      } else if (ship_fee_point2) {
        ship_fee = ship_fee_point2.innerText.split(":")[0].trim() as string;
      }

      let sold_by_point1 = ele.querySelector(
        "#aod-offer-soldBy a"
      ) as HTMLAnchorElement;

      let sold_by_point2 = ele.querySelectorAll(
        "#aod-offer-soldBy span"
      ) as NodeListOf<HTMLSpanElement>;

      if (sold_by_point1) {
        sold_by = sold_by_point1.innerText.trim();
      } else if (sold_by_point2.length >= 2) {
        sold_by = sold_by_point2[1].innerText.trim();
      }

      DATA.push({ whole_price, decimal_price, ship_from, ship_fee, sold_by });
    }
  });

  return DATA;
};

// make it async function

const offerClick = (): Promise<finalOffer | void> => {
  return new Promise<finalOffer | void>((resolve, reject) => {
    let final: finalOffer;
    const POINT1 = document.querySelector(
      "a#buybox-see-all-buying-choices-announce"
    ) as HTMLAnchorElement;
    const PONIN2 = document.querySelector(
      ".a-touch-link.a-box.olp-touch-link"
    ) as HTMLAnchorElement;
    const POINT3 = document.querySelector(
      "#buybox-see-all-buying-choices a"
    ) as HTMLAnchorElement;
    const POINT = POINT1 ?? PONIN2 ?? POINT3 ?? "";
    if (POINT) {
      POINT.click();
      setTimeout(() => {
        let totalCount = getTotalOfferCount();
        autoScroll(totalCount)
          .then(() => {
            const data = getOfferList();
            final = arrangeOfferData(data);
            closeOfferModal();
            resolve(final);
          })
          .catch((err) => console.error(err));
      }, 2000);
    } else reject();
  });
};

const arrangeOfferData = (data: Array<OfferList>): finalOffer => {
  let final: finalOffer = {
    totalOffer: 0, //
    totalAmazon: 0, //
    totalFBM: 0, //
    totalFBA: 0, //
    lowestFBA: 0,
    rise5Percent: 0,
    totalcomp: 0,
    amzPrice: 0,
    currentBSR: "",
  };
  final.totalOffer = data.length;

  let FBA: any = [];
  let FBM = [];
  let AMAZON = [];
  let ship_free = 0;

  let all_price: Array<number> = [];

  map(data, (d) => {
    if (d.ship_from == "Amazon.com" && d.sold_by == "Amazon.com") {
      AMAZON.push(d);
      let final_price = 0;
      if (d.ship_fee.includes("FREE")) {
        ship_free = 0;
        final_price = d.whole_price + d.decimal_price / 100;
      } else {
        let num = `$${d.ship_fee.replace(/[^0-9\.]+/g, "")}`;
        final_price =
          d.whole_price + d.decimal_price / 100 + extractNumber(num);
      }
      final.amzPrice = final_price;
    } else if (d.ship_from == "Amazon.com" && d.sold_by != "Amazon.com") {
      let final_price = 0;
      if (d.ship_fee.includes("FREE")) {
        ship_free = 0;
        final_price = d.whole_price + d.decimal_price / 100;
      } else {
        let num = `$${d.ship_fee.replace(/[^0-9\.]+/g, "")}`;
        final_price =
          d.whole_price + d.decimal_price / 100 + extractNumber(num);
      }
      FBA.push({ ...d, final_price });
    } else if (d.ship_from != "Amazon.com" && d.sold_by != "Amazon.com") {
      FBM.push(d);
    }
  });
  final.totalAmazon = AMAZON.length;
  final.totalFBA = FBA.length;
  final.totalFBM = FBM.length;

  map(FBA, (t) => {
    all_price.push(t.final_price);
  });

  if (min(all_price) !== undefined) final.lowestFBA = min(all_price) as number;

  let rise_price = final.lowestFBA + final.lowestFBA * 0.05;

  final.rise5Percent = rise_price;

  map(all_price, (p) => {
    if (p >= final.lowestFBA && p <= rise_price) ++final.totalcomp;
  });

  let test = scrapBSR();
  let t = /[0-9,]+/.exec(test[0]);

  if (t?.length) final.currentBSR = t[0];
  return final;
};

const closeOfferModal = () => {
  const POINT = document.querySelector("#aod-background") as HTMLAnchorElement;
  if (POINT) POINT.click();
};

const getTotalOfferCount = (): number => {
  const POINT = document.querySelector(
    "#aod-filter-offer-count-string"
  ) as HTMLSpanElement;
  let TOTAL_COUNT = 0;
  if (POINT) TOTAL_COUNT = Number(POINT.innerText.replace(/[^0-9]/g, ""));
  return TOTAL_COUNT;
};

const autoScroll = (totalCount: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    var totalHeight = 0;
    var distance = 100;
    var timer = setInterval(() => {
      let TOTAL_LOADED = document.querySelectorAll("#aod-offer").length;
      let ele = document.getElementById("all-offers-display-scroller");

      if (ele) {
        ele.scrollBy(0, distance);
        totalHeight += distance;

        if (totalCount === TOTAL_LOADED) {
          clearInterval(timer);
          resolve();
        }
      } else reject();
    }, 10);
  });
};

const scrapBSR = () => {
  try {
    const TEXT = "Best Sellers Rank";
    let List: any = [];

    const detail = document.querySelectorAll(
      "#productDetails_detailBullets_sections1 > tbody > tr"
    ) as NodeListOf<HTMLTableRowElement>;
    const nextDom = document.getElementById("SalesRank") as HTMLElement;

    const anotherDom = document.querySelectorAll(
      ".detail-bullet-list"
    ) as NodeListOf<HTMLElement>;

    if (detail.length > 0) {
      detail.forEach((element) => {
        if (element.innerText.includes(TEXT)) {
          element.querySelectorAll("td > span > span").forEach((d) => {
            List.push(d.textContent);
          });
        }
      });
    } else if (nextDom) {
      let tempText = nextDom.innerText;
      if (tempText.includes(TEXT)) {
        let tempData = tempText.split(":")[1];

        let finalData = tempData.split("#");

        finalData.forEach((d) => {
          if (d.trim()) List.push(`#${d.trim()}`);
        });
      }
    } else if (anotherDom.length > 0) {
      anotherDom.forEach((ele) => {
        if (ele && ele.innerText.includes(TEXT)) {
          let tempData = ele.innerText.split(":")[1];
          let finalData = tempData.split("#");
          finalData.forEach((d) => {
            if (d.trim()) List.push(`#${d.trim()}`);
          });
        }
      });
    }

    return List;
  } catch (err) {
    console.log(err);
  }
};
