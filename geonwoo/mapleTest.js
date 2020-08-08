// https://maplestory.nexon.com/News/Update?page=1

const puppeteer = require('puppeteer');
const runPupperteer = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    // DB에서 가지고 온 번호
    const lastNumber = 0;

    await page.goto('https://maplestory.nexon.com/News/Update?page=1');
    // await page.goto('https://maplestory.nexon.com/news/update/590?page=1');

    const contents = await page.$$eval('.update_board li p a', (elements) => {
      return elements.map((element) => {
        const href = element.href;
        const id = href.match(/\d{3,4}/)[0];
        const title = element.children[0].textContent;
        return [id, href, title];
      });
    });

    // console.log(contents);
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
    await page.waitFor(10000);
    await browser.close();
  }
};
const getPatchNote = async (page, href) => {
  await page.goto(href);
  const content = await page.$eval('.new_board_con', (element) => {
    return element.innerHTML;
  });
  return content;
};

runPupperteer();