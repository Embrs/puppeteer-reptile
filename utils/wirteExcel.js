import fs from "fs";
import xlsx from "node-xlsx";// const excelData = [];

export default (dataArr=[["x1y1","x2y1"],["x1y2", "x2y2"]], filename="text", sheetName="sheet1" ) => {
  const fileName = `${filename}.xlsx`;
  const buffer = xlsx.build([{ name: sheetName, data: dataArr }]); // 拿到文件 buffer
  fs.writeFileSync(fileName, Buffer.from(buffer));
};
