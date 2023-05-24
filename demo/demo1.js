import puppeteer from "puppeteer";
import ExcelWrite from "../utils/ExcelWrite"; // 寫入 excel

//puppeteer.launch範例化開啟瀏覽器
async function basic() {
  //可以傳入一個options物件({headless: false})，可以設定為無介面瀏覽器，也可以設定有介面瀏覽器
  //無介面瀏覽器效能更高更快，有介面一般用於偵錯開發
  let options = {
      //設定視窗的寬高
      defaultViewport:{
        width: 1400,
        height: 800
      },
      //設定為有介面，如果為true，即為無介面
      headless:false,
      //設定放慢每個步驟的毫秒數
      slowMo: 100
  };
  // 建立瀏覽器
  let browser = await puppeteer.launch(options);

  // 打來新分頁
  let page = await browser.newPage();

  // 前往分頁
  await page.goto("https://developers.google.com/web/");

  // input 輸入值
  await page.type(".devsite-search-field", "Headless Chrome");

  // 等待建議疊加層出現，然後單擊“顯示所有結果”
  const allResultsSelector = ".devsite-suggest-all-results";
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  // 等待結果頁面加載並顯示結果。
  const resultsSelector = ".gsc-results .gs-title";
  await page.waitForSelector(resultsSelector);

  // 從頁面中提取結果。
  const links = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
      const title = anchor.textContent.split("|")[0].trim();
      return [title, anchor.href];
    });
  }, resultsSelector);

  ExcelWrite( links, "puppetter-test/demo" );

 // 結束關閉瀏覽器
  await browser.close();
} basic();
