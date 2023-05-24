import utils from "../../utils/index.js";

export default async(browser) => {
  // 新分頁
  let page = await browser.newPage();

  // 前往包款總覽- 頁面
  if (!await utils.ToPage(page, "https://tw.louisvuitton.com/zht-tw/bags/for-women/all-handbags/_/N-t1rrahxp")) return;

  // const list2 = await productListPage(page, "https://tw.louisvuitton.com/zht-tw/bags/for-women/all-handbags/_/N-t1rrahxp?page=2");
  // _total.push({list2});
  const _total = [];
  console.log(_total);
  // await page.keyboard.press("PageDown");

  // await ToPage(page, "https://relithe.com/zh/");

  // await ToPage(page, "https://relithe.com/zh/buy");

  // await AutoScroll(page, "html");

};
