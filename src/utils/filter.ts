import { filter, map, min } from "lodash";
import {
  finalOffer,
  finalPrice,
  finalSalesRank,
  offer,
  stats,
  finalData,
  productSchema,
  ASIN,
} from "./model";

// export const getOfferData = (
//   data: Array<offer>,
//   statsData: stats
// ): finalOffer => {
//   let totalFBA = filter(data, (d) => d.isFBA && d.condition === 1);
//   let totalFBM = statsData.offerCountFBM;

//   let totalAmazon = filter(data, (d) => d.isAmazon);

//   let lowestFBA: number = 0;
//   let totalcomp: number = 0;

//   if (totalFBA.length) {
//     let all_price: number[] = [];

//     map(totalFBA, (t) => {
//       let current_price = t.offerCSV[t.offerCSV.length - 2];
//       let ship_price = t.offerCSV[t.offerCSV.length - 1];
//       let final_price: number;
//       if (ship_price > 0) final_price = current_price + ship_price;
//       else final_price = current_price;
//       all_price.push(final_price);
//     });

//     if (min(all_price) !== undefined) lowestFBA = min(all_price) as number;

//     let rise_price = lowestFBA + lowestFBA * 0.05;

//     map(all_price, (p) => {
//       if (p >= lowestFBA && p <= rise_price) ++totalcomp;
//     });

//     return {
//       totalAmazon: totalAmazon.length,
//       totalOffer: totalAmazon.length + totalFBA.length + totalFBM,
//       totalFBM,
//       totalFBA: totalFBA.length,
//       lowestFBA,
//       rise5Percent: rise_price,
//       totalcomp: totalcomp,
//     };
//   } else
//     return {
//       totalAmazon: totalAmazon.length,
//       totalOffer: totalAmazon.length + totalFBA.length + totalFBM,
//       totalFBM,
//       totalFBA: 0,
//       rise5Percent: 0,
//       lowestFBA,
//       totalcomp,
//     };
// };

export const getSalesRankData = (data: stats): finalSalesRank => {
  let obj: finalSalesRank = {
    avgSalesRank30: 0,
    avgSalesRank: 0,
    avgSalesRank180: 0,
    avgSalesRank90: 0,
    salesRankDrops30: 0,
  };

  let count: number = 0;

  if (data.avg30[3] > 0) {
    obj.avgSalesRank30 = data.avg30[3];
    ++count;
  }

  if (data.avg90[3] > 0) {
    obj.avgSalesRank90 = data.avg90[3];
    ++count;
  }
  if (data.avg180[3] > 0) {
    obj.avgSalesRank180 = data.avg180[3];
    ++count;
  }
  if (count) {
    obj.avgSalesRank =
      (obj.avgSalesRank30 + obj.avgSalesRank90 + obj.avgSalesRank180) / count;
  }
  if (data.salesRankDrops30) obj.salesRankDrops30 = data.salesRankDrops30;

  return obj;
};

export const getPriceData = (data: stats): finalPrice => {
  let obj: finalPrice = {
    avgPrice180: 0,
    avgPrice90: 0,
    avgPrice: 0,
  };

  let count: number = 0;

  if (data.avg180[1] > 0) {
    obj.avgPrice180 = data.avg180[1];
    ++count;
  }
  if (data.avg90[1] > 0) {
    obj.avgPrice90 = data.avg90[1];
    ++count;
  }
  if (count) obj.avgPrice = (obj.avgPrice180 + obj.avgPrice90) / count;

  return obj;
};

export const getFilteredData = (
  data: productSchema,
  asin: string
): finalData => {
  return {
    ...getSalesRankData(data.stats),
    ...getPriceData(data.stats),
    ASIN: asin,
  };
};
