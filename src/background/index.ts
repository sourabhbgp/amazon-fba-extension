import { isAmazonProductUrl, isAmazonCOM } from "../utils/helper";

let current_url: string;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  let STATUS = changeInfo.status;

  if (STATUS === "complete") {
    if (tab.url) {
      if (current_url !== tab.url) {
        current_url = tab.url;
        if (isAmazonCOM(current_url) && isAmazonProductUrl(current_url)) {
          console.log(current_url);
        }
      }
    }
  }
});
