import "../css/content.css";
import { createColumn, createContainer, createKeyValue } from "./component";
import { finalData } from "../utils/model";

const UI_Render = (data: finalData): void => {
  const POINT = document.getElementById("centerCol") as HTMLDivElement;

  if (POINT) {
    const Container = createContainer();

    // ASIN Column
    const ASIN_Column = createColumn();
    const ASIN_Data = createKeyValue({ key: "ASIN", value: data.ASIN });
    if (ASIN_Data) ASIN_Column.appendChild(ASIN_Data);
    Container.appendChild(ASIN_Column);

    // Total Seller Column
    const TotalSeller_Column = createColumn();
    const TotalFBA_Data = createKeyValue({ key: "FBA", value: data.totalFBA });
    const TotalFBM_Data = createKeyValue({ key: "FBM", value: data.totalFBM });
    if (TotalFBA_Data) TotalSeller_Column.appendChild(TotalFBA_Data);
    if (TotalFBM_Data) TotalSeller_Column.appendChild(TotalFBM_Data);
    Container.appendChild(TotalSeller_Column);

    // Sales Rank Column
    const SalesRank_Column = createColumn();
    const SalesRank90_Data = createKeyValue({
      key: "SR-90",
      value: data.avgSalesRank90,
    });
    const SalesRank180_Data = createKeyValue({
      key: "SR-180",
      value: data.avgSalesRank180,
    });
    const SalesRankAvg_Data = createKeyValue({
      key: "SR-avg",
      value: data.avgSalesRank,
    });
    const SalesRankDrop_Data = createKeyValue({
      key: "SR-drop",
      value: data.salesRankDrops30,
    });
    if (SalesRank90_Data) SalesRank_Column.appendChild(SalesRank90_Data);
    if (SalesRank180_Data) SalesRank_Column.appendChild(SalesRank180_Data);
    if (SalesRankAvg_Data) SalesRank_Column.appendChild(SalesRankAvg_Data);
    if (SalesRankDrop_Data) SalesRank_Column.appendChild(SalesRankDrop_Data);
    Container.appendChild(SalesRank_Column);

    // Price Average Column
    const PriceAvg_Column = createColumn();
    const PriceAvg90_Data = createKeyValue({
      key: "PA-90",
      value: (data.avgPrice90 / 100).toFixed(2),
    });
    const PriceAvg180_Data = createKeyValue({
      key: "PA-180",
      value: (data.avgPrice180 / 100).toFixed(2),
    });
    const PriceAvg_Data = createKeyValue({
      key: "PA",
      value: (data.avgPrice / 100).toFixed(2),
    });
    if (PriceAvg90_Data) PriceAvg_Column.appendChild(PriceAvg90_Data);
    if (PriceAvg180_Data) PriceAvg_Column.appendChild(PriceAvg180_Data);
    if (PriceAvg_Data) PriceAvg_Column.appendChild(PriceAvg_Data);
    Container.appendChild(PriceAvg_Column);

    // Lowest FBA and its Competitor Column
    const FBA_Column = createColumn();
    const LowestFBA_Data = createKeyValue({
      key: "Lowest FBA",
      value: (data.lowestFBA / 100).toFixed(2),
    });
    const Rise5cent_Data = createKeyValue({
      key: "5% Rise",
      value: (data.rise5Percent / 100).toFixed(2),
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

// Calling function on message from the background js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse({ message: "received" });
  if (request.finalData) UI_Render(request.finalData);
});
