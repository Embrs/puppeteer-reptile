import puppeteer from "puppeteer";

//puppeteer.launch範例化開啟瀏覽器
async function basic() {
  //可以傳入一個options物件({headless: false})，可以設定為無介面瀏覽器，也可以設定有介面瀏覽器
  //無介面瀏覽器效能更高更快，有介面一般用於偵錯開發
  let options = {
      //設定視窗的寬高
      defaultViewport:{
          width:1400,
          height:800
      },
      //設定為有介面，如果為true，即為無介面
      headless:false,
      //設定放慢每個步驟的毫秒數
      slowMo: 250
  };
  // 建立瀏覽器
  let browser = await puppeteer.launch(options);

  // 打來新分頁
  let page = await browser.newPage();
  
  // 設定需要存取網址
  await page.goto("https://relithe.com/zh/boutique");
  
  // 截圖
  await page.screenshot({path: "./puppetter-test/test.png"});

  //列印pdf
  await page.pdf({path: "./puppetter-test/example.pdf", format: "A4"});

 // 結束關閉
  await browser.close();
} basic();
