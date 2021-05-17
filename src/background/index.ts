import { getFilteredData } from "../utils/filter";
import { isAmazonProductUrl, isAmazonCOM } from "../utils/helper";
import { getASINfromURL } from "../utils/scrap";

console.log("background js");

let current_url: string;
const KEEPA_API = "https://api.keepa.com";
// const KEEPA_PRIVATE_KEY =
//   "9dd96r1pbi6d686ucbg1p888311v158tbq4bfugggjj0a9khic62nlhldcte8tr5";

const KEEPA_PRIVATE_KEY =
  "2ml9p5fd5trs4tephqpm2j588a9gtnjs98u0fanc187e4r9v4dra7p67ub6nqjbp";
const DOMAIN_KEY = 1;

const getKeepaProductData = async (asin: string) => {
  try {
    const response = await fetch(
      `${KEEPA_API}/product?key=${KEEPA_PRIVATE_KEY}&domain=${DOMAIN_KEY}&asin=${asin}&stats=180&offers=40&only-live-offers=1&buybox=1`
    );
    if (response.ok) return await response.json();
  } catch (err) {
    throw new Error(err);
  }
};

const getStockInfo = async () => {
  let formData = new FormData();
  //  formData.append("session-id", "136-1203929-9325152");
  // formData.append("qid", "");
  // formData.append("sr", "");
  // formData.append("signInToHUC", "0");
  // formData.append("metric-asin.B07LFN65HS", "1");
  // formData.append("1registryItemID.1", "");
  // formData.append("registryID.1", "");
  formData.append("quantity.1", "99999");
  formData.append("discoveredAsins.0", "B00IKAF6LA");
  // formData.append("canonicalAsin.0", "B07LFN65HS");
  // formData.append("itemCount", "1");
  formData.append(
    "offeringID.1",
    "y4m9ff5quG0/+6SsXNCXCJPZbde1hSvaoBQwJWbyaaGX3fg97ZzKEVC69gtvM4GBSY8SJSziFLYf+wNpqXiFzH2WKTSmBmmT+eJGFtwy+o+SrY2KukMbZFXfR99UshkW1X7qqgqV3MGc/DDkdYatcEl1MGf8kciVS4JxARxk6ndD/0S/qvI3YQ=="
  );
  // formData.append("isAddon", "1");
  formData.append("submit.addToCart", "Add to cart");

  const rawResponse = await fetch(
    "https://www.amazon.com/gp/item-dispatch/ref=aod_dpdsk_new_1?kidkid=55",
    {
      method: "POST",
      body: formData,
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ a: 1, b: "Textual content" }),
    }
  );
  // const content = await rawResponse.json();

  // console.log(content);
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  let STATUS = changeInfo.status;
  chrome.storage.sync.get(null, async (data) => {
    if (data.token) {
      if (STATUS === "complete") {
        if (tab.url) {
          // if (current_url !== tab.url) {
          current_url = tab.url;
          if (isAmazonCOM(current_url) && isAmazonProductUrl(current_url)) {
            let asin = getASINfromURL(current_url);
            if (asin) {
              // await getStockInfo();
              let data = await getKeepaProductData(asin);

              if (data && data.products.length) {
                let finalData = getFilteredData(data.products[0], asin);

                chrome.tabs.query({}, function (tabs) {
                  let current = tabs.filter((d) => d.url === current_url);
                  if (current[0]) {
                    if (current[0].id) {
                      chrome.tabs.sendMessage(
                        current[0].id,
                        { finalData },
                        (response) => {}
                      );
                    }
                  }
                });
              }
            }
          }
          // }
        }
      }
    }
  });
});
