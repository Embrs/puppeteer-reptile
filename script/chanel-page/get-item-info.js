// 取得商品資訊
import utils from "../../utils/index.js";

export default async (browser, page, link) => {
  // 有給連結，前往頁面
  if (!await utils.ToPage(page,link)) return {};

  const data = await page.evaluate(async () => {
    // 種類
    const title = document.querySelector(".product-details__title")?.innerText || "";
    // 描述
    const subTitle = document.querySelector(".product-details__description")?.innerText || "";
    // 顏色
    const color = document.querySelector(".product-details__color")?.innerText || "";
    // 編號
    const skuText = (document.querySelector(".product-details__reference")?.innerText || "")
      .replace("編號  ", "");
    // 價格
    const price = (document.querySelector(".product-details__price")?.innerText || "")
      .replace("*", "");
    // 尺寸
    const size = document.querySelector(".js-dimension")?.innerText || "";
    // 圖片
    const imagesUrl = [
      ...document.querySelectorAll("[data-test*='imgProduct_SKU']")
    ].map((el)=>el?.dataset?.src || el.currentSrc).filter((url) => url);

    return {
      title, subTitle, color, skuText, size, imagesUrl,
      priceInfo: {
        tw: price
      }
    };
  });

  // 多國
  const otherCity = ["jp", "gb"];
  // 新分頁
  let cityPage = await browser.newPage();
  for (const city of otherCity) {
    if (!await utils.ToPage(cityPage, link.replace("/tw/",`/${city}/`), 0)) continue;
    const price = await cityPage.evaluate(async () => {
      return(document.querySelector(".product-details__price")?.innerText || "")
        .replace("*", "");
    });
    // 他國價格
    data.priceInfo[city] = price;
  }
  // 關閉分頁
  cityPage.close();
  return data;
};
