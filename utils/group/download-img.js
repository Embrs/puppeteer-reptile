// 下載圖片
import fs from "fs";

export default async (page, imgUrl, filePath="./") => {
  const matches = /.*\.(jpg|png|svg|gif)$/.exec(imgUrl);
  try {
    if (matches && (matches.length === 2)) {
      let viewSource = await page.goto(imgUrl); // 前往圖片
      const extension = matches[1]; // 副檔名
      const fileName = matches[0].split("/").pop(); // 檔名

      // 寫入檔案
      fs.writeFile(
        `${filePath}${fileName}`,
        await viewSource.buffer(), // 加載
        (err) => {
          if(err) return console.log("err");
        }
      );
      await page.waitForTimeout(500);
    }
  } catch (error) {
    console.log("download Fail:", error);
  }
};
