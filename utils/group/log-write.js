// 日誌記錄
import fs from "fs";

// 寫入log
const getTime = () => {
  const d = new Date();
  const Y = d.getFullYear();
  const M = `${d.getMonth()+1}`.padStart(2, "0");
  const D = `${d.getDate()}`.padStart(2, "0");
  const h = `${d.getHours()}`.padStart(2, "0");
  const m = `${d.getMinutes()}`.padStart(2, "0");
  const s = `${d.getSeconds()}`.padStart(2, "0");
  const ms = `${d.getMilliseconds()}`.padStart(2, "0");
  return {Y, M, D, h, m, s, ms}; 
};

export default async(msg, tagArray) => {
  return new Promise((resolve) => {
    fs.exists("logs", (exists) => {
      if(!exists) {
        // 建資料夾
        fs.mkdir("logs",function(err) {console.log(err);});
      }
      // 串標籤
      let tagStr = `[${tagArray.join("][")}]`;
      const now = getTime();
      // 寫入
      fs.writeFile(`logs/${now.Y}${now.M}${now.D}.log`, `[${now.h}:${now.m}:${now.s}.${now.ms}]${tagStr} ${msg}\n`, {"flag":"a"}, () => resolve());
    });
  });
};