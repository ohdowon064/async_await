const puppeteer = require('puppeteer');

const runPupperteer = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // DB에서 가지고 온 번호
  const lastNumber = 410;

  await page.goto('http://www.inven.co.kr/board/lol/3329');

  const contents = await page.$$eval('.sj_ln', (elements) => {
    return elements.map((element) => [
      element.parentNode.previousSibling.textContent,
      element.href,
      element.textContent.trim(),
    ]);
  });

  const pageIndex = contents.findIndex((con) => {
    return Number(con[0]) === lastNumber;
  });

  const lastPages = contents.slice(0, pageIndex);

  const getPatchNote = async (page, href) => {
    await page.goto(href);
    const content = await page.$eval('#powerbbsContent', (element) => {
      return element.innerHTML;
    });
    return content;
  };

  const lastPatches = [];

  // 최근 패치들을 담음.
  for (let i = 0; i < lastPages.length; i++) {
    lastPatches.push(await getPatchNote(page, lastPages[i][1]));
  }

  // html 결과들이 배열 형태로 온다.
  console.log(lastPatches);
  await browser.close();
};

runPupperteer();
