const puppeteer = require('puppeteer');

const runPupperteer = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // DB에서 가지고 온 번호
  const lastNumber = 411;

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

  // 최근 패치들을 담음.
  const lastPatches = await Promise.all(
    lastPages.map((pageInfo) => getPatchNote(page, pageInfo[1]))
  );

  // html 결과들이 배열 형태로 온다.
  console.log(lastPatches);
  await browser.close();
};

runPupperteer();
