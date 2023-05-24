// 取得單一商品內的不同樣式資訊
import GetItemInfo from "./get-item-info.js"; // 取得商品資訊

export default async (browser, page, itemInfo) => {
  const _dataList = []; // 商品資訊

  // - 取得品資訊 ----------------------------------
  const _data = await GetItemInfo(browser, page, itemInfo.link);
  _data.sku = itemInfo.sku;
  _dataList.push(_data);

  // 取多種型號--------------------------------------
  const skus = await page.evaluate(async () => {
    return[...document.querySelectorAll(".link.js-tabpanel-anchor")].map((el) => el.dataset.value);
  });
  if (skus.length === 0) return _dataList;

  //--------------
  // 有多種型號，取得其他型號商品 ---------------------
  const basicUrl = await page.url();

  // 啟用頁面
  let skuPage = await browser.newPage();
  for (const sku of skus) {
    if (sku === itemInfo.sku) continue; // 排除目前商品,此頁面已跑過
    const _skuItemLink = basicUrl.replace(itemInfo.sku, sku);
    const _skuData = await GetItemInfo(browser, skuPage, _skuItemLink);
    _skuData.sku = sku;
    _dataList.push(_skuData);
  }
  
  // 關閉頁面
  skuPage.close();

  return _dataList;
};
