import GetItemList from "./get-item-list.js"; // 取得商品列表
import utils from "../../utils/index.js";

export default async (browser) => {
  // 新分頁
  let page = await browser.newPage();
  if (!await utils.ToPage(page, "https://www.chanel.com/tw/fashion/handbags/c/1x1x1/")) return;

  const styleList = await page.evaluate(async () => {
    return [...document.querySelectorAll(".fs-button__bg-transparent>span>a")]
      .map((a) => ({ name: a.text, link: a.href }));
  });

  await utils.LogWrite("開始爬取",["start"]);


  // 前往各款式
  for (const styleInfo of styleList) {
    await utils.LogWrite("start",["style", `${styleInfo.name}`]);
    const _datas = await GetItemList(browser, page, styleInfo);
    await utils.LogWrite("end",["style", `${styleInfo.name}`]);
    
    // 儲存資料
    const _t = utils.Now();
    const _time = `${_t.Y}${_t.M}${_t.D}_${_t.h}${_t.m}${_t.s}`;
    utils.JsonWrite(_datas, `./data/chanel_${_time}_${styleInfo.name}`);
  }
  await utils.LogWrite("結束爬取",["complete"]);
};
