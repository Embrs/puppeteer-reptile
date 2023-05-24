// 元件自動往下滾動
export default async(page, ms=100, htmltag="html") => {
  await page.evaluate(async (htmltag, ms) => {
    await new Promise((resolve) => {
      const el = document.querySelector(`${htmltag}`);
      let scrollTop = -1;
      const interval = setInterval(() => {
        el.scrollTo({top: el.scrollTop + 100, behavior: "smooth"});
        console.dir(scrollTop, el.scrollTop);
        if(el.scrollTop !== scrollTop) {
          scrollTop = el.scrollTop;
          return;
        }
        clearInterval(interval);
        resolve();
      }, ms);
      // window.scrollTo({
        // top: document.documentElement.offsetHeight,
        // behavior: "smooth"
      // });
    });
  }, htmltag, ms);
};
