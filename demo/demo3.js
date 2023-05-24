const puppeteer = require("puppeteer");
class DemoGoogleSearch {
  constructor() {
    this.start();
  }

  async start() {
    // 開啟chrome
    this.browser = await puppeteer.launch({
      headless: false, // 關閉headless模式, debug用
      executablePath: "/usr/bin/google-chrome", // 設定chrome可執行檔位置
    });

    // 建立新分頁
    this.page = await this.browser.newPage();

    // 前往google網址
    await this.page.goto("https://www.google.com/", {
      waitUntil: "networkidle0",
    });

    // 找到input attribute為"Google 搜尋"的DOM
    await this.page.waitForSelector("input[title*=\"Google 搜尋\"]");
    
    // 對input attribute為"Google 搜尋"的DOM輸入"Puppeteer"
    await this.page.type("input[title*=\"Google 搜尋\"]", "Puppeteer");
    
    // 按下Enter按鈕
    await this.page.keyboard.press("Enter");
  }
}

new DemoGoogleSearch();