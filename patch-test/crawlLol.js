// module.exports =  
const LolPatch = require('./models/LolPatch');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:dhehdnjs123@education-9l52i.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
    
const runPupperteer = async () => {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // DB에서 가지고 온 번호
    // const lastNumber = 411;

    await page.goto('http://www.inven.co.kr/board/lol/3329');

    const contents = await page.$$eval('.sj_ln', (elements) => {
      return elements.map((element) => [
        element.parentNode.previousSibling.textContent,
        element.href,
        element.textContent.trim(),
      ]);
    });

    // const pageIndex = contents.findIndex((con) => {
    //   return Number(con[0]) === lastNumber;
    // });

    const lastPages = contents;

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

    console.log(lastPatches);
    for(let i = 0; i < contents.length; i++){
        const title = contents[i][2];
        const content = lastPatches[i];
        const index = contents[i][0];
        let newLolPatch = new LolPatch({index, title, content});
        console.log("Create 완료");
    
        newLolPatch
        .save()
        .then(newPatch => {
            console.log(newPatch);
        })
        .catch(err => {
            console.log(err);
        });
    }
    await browser.close();
};

runPupperteer();