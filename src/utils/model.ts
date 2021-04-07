export interface offer {
  isFBA: boolean;
  isAmazon: boolean;
  condition: number;
  offerCSV: Array<number>;
}

export interface stats {
  avg90: number[];
  avg180: number[];
  salesRankDrops30: number;
  offerCountFBM: number;
  offerCountFBA: number;
}

export interface finalOffer {
  totalOffer: number;
  totalAmazon: number;
  totalFBM: number;
  totalFBA: number;
  lowestFBA: number;
  rise5Percent: number;
  totalcomp: number;
}

export interface finalSalesRank {
  avgSalesRank90: number;
  avgSalesRank180: number;
  avgSalesRank: number;
  salesRankDrops30: number;
}

export interface finalPrice {
  avgPrice90: number;
  avgPrice180: number;
  avgPrice: number;
}
export interface ASIN {
  ASIN: string;
}

export interface productSchema {
  offers: Array<offer>;
  stats: stats;
}

export type finalData = finalOffer & finalSalesRank & finalPrice & ASIN;
