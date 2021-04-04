import { getFilteredData } from "../utils/filter";
import { isAmazonProductUrl, isAmazonCOM } from "../utils/helper";
import { getASINfromURL } from "../utils/scrap";

let current_url: string;
const KEEPA_API = "https://api.keepa.com";
const KEEPA_PRIVATE_KEY =
  "9dd96r1pbi6d686ucbg1p888311v158tbq4bfugggjj0a9khic62nlhldcte8tr5";
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

// const getStockInfo = async () => {
//   const rawResponse = await fetch(
//     "https://www.amazon.com/gp/item-dispatch/ref=aod_dpdsk_new_1?kidkid=55",
//     {
//       method: "POST",
//       // headers: {
//       //   Accept: "application/json",
//       //   "Content-Type": "application/json",
//       // },
//       // body: JSON.stringify({ a: 1, b: "Textual content" }),
//     }
//   );
//   // const content = await rawResponse.json();

//   // console.log(content);
// };

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
