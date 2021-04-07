import "../css/content.css";
import { createColumn, createContainer, createKeyValue } from "./component";
import { finalData } from "../utils/model";
import { numberWithCommas } from "../utils/helper";

const UI_Render = (data: finalData): void => {
  const POINT = document.getElementById("centerCol") as HTMLDivElement;

  if (POINT) {
    const Container = createContainer();

    // ASIN Column
    const ASIN_Column = createColumn("Basic Info", "#81ecec6b");
    const ASIN_Data = createKeyValue({ key: "ASIN", value: data.ASIN });

    const Total_Offer = createKeyValue({
      key: "Total Offer",
      value: data.totalOffer,
    });

    const Total_Amazon = createKeyValue({
      key: "Amazon",
      value: data.totalAmazon,
    });

    const TotalFBA_Data = createKeyValue({
      key: "Total FBA",
      value: data.totalFBA,
    });
    const TotalFBM_Data = createKeyValue({
      key: "Total FBM",
      value: data.totalFBM,
    });
    if (ASIN_Data) ASIN_Column.appendChild(ASIN_Data);
    if (Total_Offer) ASIN_Column.appendChild(Total_Offer);
    if (Total_Amazon) ASIN_Column.appendChild(Total_Amazon);
    if (TotalFBM_Data) ASIN_Column.appendChild(TotalFBM_Data);
    if (TotalFBA_Data) ASIN_Column.appendChild(TotalFBA_Data);
    Container.appendChild(ASIN_Column);

    // Sales Rank Column
    const SalesRank_Column = createColumn("Sales Rank", "#2ecc7159");
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
    const LowestFBA_Data = createKeyValue({
      key: "Lowest FBA",
      value: `$${(data.lowestFBA / 100).toFixed(2)}`,
    });
    const Rise5cent_Data = createKeyValue({
      key: "5% Rise",
      value: `$${(data.rise5Percent / 100).toFixed(2)}`,
    });
    const FBACompetitor_Data = createKeyValue({
      key: "Competitor",
      value: data.totalcomp,
    });
    if (LowestFBA_Data) FBA_Column.appendChild(LowestFBA_Data);
    if (Rise5cent_Data) FBA_Column.appendChild(Rise5cent_Data);
    if (FBACompetitor_Data) FBA_Column.appendChild(FBACompetitor_Data);
    Container.appendChild(FBA_Column);

    POINT.insertAdjacentElement("afterbegin", Container);
  }
};

const main = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse({ message: "received" });
    if (request.finalData) UI_Render(request.finalData);
  });
};

chrome.storage.sync.get(null, (data) => {
  if (data.token) main();
});
