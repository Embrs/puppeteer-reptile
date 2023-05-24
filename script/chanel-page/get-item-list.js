// 取得商品列表
import utils from "../../utils/index.js";
import GetItemTypes from "./get-item-types.js"; // 取得單一商品內的不同樣式資訊

export default async (browser, page, styleInfo) => {
  // 前往列表
  if (!await utils.ToPage(page,styleInfo.link)) return [];
  
  // 商品連結
  const itemList = await page.evaluate(async () => {
    return [...document.querySelectorAll(".txt-product>p")]
      .map((el) => {
        const sku = el.dataset.id;
        const link = el.querySelector("a")?.href;
        return {sku, link};
      });
  });

  // 取得單一商品內的不同樣式資訊
  const _dataList = [];
  for (const itemInfo of itemList) {
    await utils.LogWrite("start", ["item", itemInfo.sku]);
    const _datas = await GetItemTypes(browser, page, itemInfo);
    _dataList.push(..._datas);
    await utils.LogWrite("end", ["item", itemInfo.sku]);
  }
  return _dataList;
};