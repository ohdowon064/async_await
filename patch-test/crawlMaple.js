// module.exports =  
const MaplePatch = require('./models/MaplePatch');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:dhehdnjs123@education-9l52i.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
    
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

    const patches = [];
    for(let i = 0; i < contents.length; i++)
      patches.push(await getPatchNote(page, contents[i][1]));
    
    console.log(patches);

    for(let i = 0; i < patches.length; i++){
      const index = contents[i][0];
      const title = contents[i][2];
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

  }catch(e) {
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

runPupperteer();