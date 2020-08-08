// https://maplestory.nexon.com/News/Update?page=1

const puppeteer = require('puppeteer');
const runPupperteer = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    // DB에서 가지고 온 번호
    const lastNumber = 0;

    await page.goto('http://kart.nexon.com/Kart/News/Patch/List.aspx');

    const contents = await page.$$eval('.tit_bx', (elements) => {
      return elements.map((element) => {
        const href = element.children[0].href;
        const id = href.match(/\d{5}/)[0];
        const title = element.textContent;
        return [id, href, title];
      });
    });

    console.log(contents);
    const pageIndex = contents.findIndex((con) => {
      return Number(con[0]) === lastNumber;
    });

    console.log(pageIndex);
    const lastPages = contents.slice(
      0,
      pageIndex === -1 ? undefined : pageIndex
    );
    console.log(lastPages);
    // 최근 패치들을 담음.

    const lastPatches = [];

    for (let i = 0; i < lastPages.length; i++) {
      lastPatches.push(await getPatchNote(page, lastPages[i][1]));
    }

    // html 결과들이 배열 형태로 온다.
    console.log(lastPatches);
  } catch (e) {
    console.error(e);
  } finally {
    await page.waitFor(1000);
    await browser.close();
  }
};
const getPatchNote = async (page, href) => {
  await page.goto(href);
  const content = await page.$eval('.board_imgarea', (element) => {
    return element.innerHTML;
  });
  return content;
};

runPupperteer();
