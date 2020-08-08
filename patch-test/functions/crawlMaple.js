const MaplePatch = require('../models/MaplePatch');
const puppeteer = require('puppeteer');
    
const runPupperteer = async() => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  try {
    await page.goto('https://maplestory.nexon.com/News/Update?page=1');

    const contents = await page.$$eval('.update_board li p a', (elements) => {
      return elements.map((element) => {
        const href = element.href;
        const id = href.match(/\d{3,4}/)[0];
        const title = element.children[0].textContent;
        return [id, href, title];
      });
    });

    await MaplePatch.findOne({}, {index:1}, async (err, result) => {
      if(err)
        console.log(err);
      else{
        const lastNumber = result.index;
        console.log(lastNumber);

        const pageIndex = contents.findIndex((con) => {
          return Number(con[0]) === lastNumber;
        });
        const lastPages = contents.slice(0, pageIndex); 

        const patches = [];
        for(let i = 0; i < lastPages.length; i++)
          patches.push(await getPatchNote(page, lastPages[i][1]));
        
        console.log(patches);

        for(let i = 0; i < lastPages.length; i++){
          const index = lastPages[i][0];
          const title = lastPages[i][2];
          const content = patches[i];
          let newMaplePatch = new MaplePatch({index, title, content});
          console.log("Create 완료");
      
          newMaplePatch
          .save()
          .then(newPatch => {
              console.log(newPatch);
              console.log('저장완료');
          })
          .catch(err => {
              console.log(err);
          });
        }
        console.log('Successfully Finished Scrapping [Maplestory]');
      }
    }).sort({index: -1}).limit(1);
    
  }catch(e) {
    console.log('MAPLESTORY ERROR =>');
    console.error(e);
  }finally{
    await page.waitFor(2000);
    await browser.close();
  }
};

const getPatchNote = async(page, href) => {
  await page.goto(href);
  const content = await page.$eval('.new_board_con', (element) => {
    return element.innerHTML;
  });
  return content;
};

module.exports = runPupperteer;