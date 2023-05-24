  // 前往商品
  // page.on("response", async (response) => {
  //   const url = response.url();
  //   // 判斷 商品資訊 API
  //   if (url.includes("https://www.chanel.com/tw/yapi/product/") && !url.includes("/availability/")) {
  //     const data = await response.json();
  //     const info = {
  //       code: data.code, // ID
  //       baseProduct: data.baseProduct, // 類型
  //       reference: data.reference, // 型號
  //       name: data.basic.name, // 品名
  //       enName: data.basic.defaultName, // 英文名
  //       imageList: data.basic.images, // 圖片
  //       price: data.price, // 價格
  //       fabricInfo: data.fabric, // 材質資訊
  //       colorInfo: { // 顏色
  //         name: data.color.name,
  //         enName: data.color.englishName
  //       }
  //     };
  //   }
  // });