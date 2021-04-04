import "../css/content.css";
import {
  createColumn,
  createColumn2,
  createContainer,
  createKeyValue,
  createKeyValue2,
} from "./component";
import { finalData } from "../utils/model";

const UI_Render = (data: finalData): void => {
  const POINT = document.getElementById("centerCol") as HTMLDivElement;

  if (POINT) {
    const Container = createContainer();

    // ASIN Column
    const ASIN_Column = createColumn2("Basic Info");
    const ASIN_Data = createKeyValue2({ key: "ASIN", value: data.ASIN });
    const TotalFBA_Data = createKeyValue2({
      key: "Total FBA",
      value: data.totalFBA,
    });
    const TotalFBM_Data = createKeyValue2({
      key: "Total FBM",
      value: data.totalFBM,
    });
    if (ASIN_Data) ASIN_Column.appendChild(ASIN_Data);
    if (TotalFBM_Data) ASIN_Column.appendChild(TotalFBM_Data);
    if (TotalFBA_Data) ASIN_Column.appendChild(TotalFBA_Data);
    Container.appendChild(ASIN_Column);

    // // Total Seller Column
    // const TotalSeller_Column = createColumn();
    // const TotalFBA_Data = createKeyValue({ key: "FBA", value: data.totalFBA });
    // const TotalFBM_Data = createKeyValue({ key: "FBM", value: data.totalFBM });
    // if (TotalFBA_Data) TotalSeller_Column.appendChild(TotalFBA_Data);
    // if (TotalFBM_Data) TotalSeller_Column.appendChild(TotalFBM_Data);
    // Container.appendChild(TotalSeller_Column);

    // Sales Rank Column
    const SalesRank_Column = createColumn2("Sales Rank");
    const SalesRank90_Data = createKeyValue2({
      key: "90 days",
      value: data.avgSalesRank90,
    });
    const SalesRank180_Data = createKeyValue2({
      key: "180 days",
      value: data.avgSalesRank180,
    });
    const SalesRankAvg_Data = createKeyValue2({
      key: "average",
      value: data.avgSalesRank,
    });
    const SalesRankDrop_Data = createKeyValue2({
      key: "drop (30)",
      value: data.salesRankDrops30,
    });
    if (SalesRank90_Data) SalesRank_Column.appendChild(SalesRank90_Data);
    if (SalesRank180_Data) SalesRank_Column.appendChild(SalesRank180_Data);
    if (SalesRankAvg_Data) SalesRank_Column.appendChild(SalesRankAvg_Data);
    if (SalesRankDrop_Data) SalesRank_Column.appendChild(SalesRankDrop_Data);
    Container.appendChild(SalesRank_Column);

    // Price Average Column
    const PriceAvg_Column = createColumn2("Price Average");
    const PriceAvg90_Data = createKeyValue2({
      key: "90 days",
      value: (data.avgPrice90 / 100).toFixed(2),
    });
    const PriceAvg180_Data = createKeyValue2({
      key: "180 days",
      value: (data.avgPrice180 / 100).toFixed(2),
    });
    const PriceAvg_Data = createKeyValue2({
      key: "average price",
      value: (data.avgPrice / 100).toFixed(2),
    });
    if (PriceAvg90_Data) PriceAvg_Column.appendChild(PriceAvg90_Data);
    if (PriceAvg180_Data) PriceAvg_Column.appendChild(PriceAvg180_Data);
    if (PriceAvg_Data) PriceAvg_Column.appendChild(PriceAvg_Data);
    Container.appendChild(PriceAvg_Column);

    // Lowest FBA and its Competitor Column
    const FBA_Column = createColumn2("FBA Info");
    const LowestFBA_Data = createKeyValue2({
      key: "Lowest FBA",
      value: (data.lowestFBA / 100).toFixed(2),
    });
    const Rise5cent_Data = createKeyValue2({
      key: "5% Rise",
      value: (data.rise5Percent / 100).toFixed(2),
    });
    const FBACompetitor_Data = createKeyValue2({
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
