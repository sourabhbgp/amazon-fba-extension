export const isAmazonUrl = (e: string): boolean => {
  return /^https?:\/\/(www|smile)\.amazon\.[\w.]{2,6}\//.test(e.trim());
};

export const isAmazonShopURL = (e: string): boolean => {
  if (e && isAmazonUrl(e)) return /\/l\/\d{8,16}(\/|\?|$)/.test(e);
  return false;
};

export const isAmazonBestSellersUrl = (e: string): boolean => {
  return isAmazonUrl(e) && /\/(best-sellers|bestsellers)/i.test(e);
};

export const isMostWishedURL = (e: string): boolean => {
  if (e && isAmazonUrl(e)) return /\/most-wished-for\/|\/most-gifted\//.test(e);
  return false;
};

export const isAmazonSearchUrl = (e: string): boolean => {
  return isAmazonUrl(e) && (/\/s[\/?]/.test(e) || /\/search\//.test(e));
};

export const isAmazonCategoryUrl = (e: string): boolean => {
  return /https?:\/\/(www|smile)\.amazon\.[\w.]+\/([\w\d\-%]+\/)?b[/?]/.test(e);
};

// Check Amazon Product Page
export const isAmazonProductUrl = (e: string): boolean => {
  return (
    isAmazonUrl(e) &&
    !/\/stores\/node\//.test(e) &&
    !isAmazonShopURL(e) &&
    !isMostWishedURL(e) &&
    !isAmazonBestSellersUrl(e) &&
    /(\/((B[A-Z\d]{9})|(\d{9}[A-Z\d]))($|\/|\?))|(\/dp\/((B[A-Z\d]{9})|(\d{9}[A-Z\d])))/.test(
      e
    )
  );
};

export const isAmazonCOM = (e: string): boolean => {
  if (e.includes("amazon.com")) return true;
  else return false;
};
