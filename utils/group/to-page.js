// 前往頁面
import LogWrite from "./log-write.js";

// timeout = 0 為無限制 
export default async(page, url, timeout=30000) => {
  try {
    page.setDefaultNavigationTimeout(timeout);
    await page.goto(url);
    await page.waitForTimeout(1500);
    // await page.goto(url,{waitUntil: "load", timeout: 0});
    // await page.waitForNavigation({waitUntil: "domcontentloaded"}); // networkidle2
    return true;
  } catch (err) {
    await LogWrite(`${err}: ${url}`,["toUrl", "Error"]);
    return false;
  }
}; 