import puppeteer from "puppeteer";
import ChanelPage from "./script/chanel-page/index.js";
// import LvPage from "./script/lv-page/index.js";

//puppeteer.launch範例化開啟瀏覽器
async function basic() {
  //可以傳入一個options物件({headless: false})，可以設定為無介面瀏覽器，也可以設定有介面瀏覽器
  //無介面瀏覽器效能更高更快，有介面一般用於偵錯開發
  let options = {
    defaultViewport:{ //設定視窗的寬高
      width: 1920,
      height: 1080
    },
    headless: false, //設定為有介面，如果為true，即為無介面
    // executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // 使用 Chrome 瀏覽器 (預設為 Chromium)
    // executablePath: "/Applications/Microsoft Edge.app/contents/MacOS/Microsoft Edge", // 使用 Edage 瀏覽器 (預設為 Chromium)
    slowMo: 100 //設定放慢每個步驟的毫秒數
  };
  // 建立瀏覽器
  const browser = await puppeteer.launch(options);

  // 訪問 Chanel 頁面腳本
  await ChanelPage(browser);
  
  // 訪問 Lv 頁面腳本
  // await LvPage(browser);
  
  // 結束關閉瀏覽器
  // await browser.close();
} basic();
