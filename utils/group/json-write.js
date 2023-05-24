import fs from "fs";
export default (data, filename="text") => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(data));
};
