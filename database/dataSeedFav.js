const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// const writer = csvWriter();
const zlib = require('zlib');

const writer = zlib.createGzip();
const writer2 = zlib.createGzip();
const faker = require('faker');

let counter = 0;


const fakeList = [];
const newPlaces = [];

const savedLists = [];
for (let i = 0; i < 30; i += 1) {
  fakeList.push(faker.lorem.word());
  // const saveListName = {
  //   name: fakeList[i],
  // };
  // savedLists.push(saveListName);
}
console.log(fakeList);


async function dataGen() {
  writer.pipe(fs.createWriteStream('dataFavList10kUsers.csv.gz'));
  writer2.pipe(fs.createWriteStream('dataFavList10kUsers2.csv.gz'));
  // const header = 'id,url,title,city,state,country,plusVerified,propertyType,price,averageReview,totalReviews,about,theSpace,neighborhood\n';
  const header = 'favListID,listName,userID,placeID\n';
  const header2 = 'favListID,listName,userID\n';
  // const header = 'id,url,title\n';

  // const header = 'id,url\n';
  let favListID = 0;
  writer.write(header);
  writer2.write(header2);
  for (let userID = 0; userID < 100000; userID += 1) {
    const favListNum = Math.floor(Math.random() * 4 + 6);
    for (let i = 0; i < favListNum; i += 1) {
      // randomly choost savedList
      const listName = fakeList[Math.floor(Math.random() * 30)];
      const stringBuffer2 = (`${favListID},${listName},${userID}\n`);

      for (let j = 0; j < Math.floor(Math.random() * 8 + 6); j += 1) {
        const placeID = Math.floor(Math.random() * 10000000);
        const stringBuffer = (`${favListID},${listName},${userID},${placeID}\n`);
        // if (listName === undefined) console.log(stringBuffer);
        const ableToWrite = writer.write(stringBuffer);
        if (!ableToWrite) {
          await new Promise((resolve) => {
            writer.once('drain', resolve);
          })
            .catch((err) => {
              console.log(err);
            });
        }
        counter += 1;

        if (counter % 10000 === 0) {
          console.log(counter);
        }
      }
      const ableToWrite2 = writer2.write(stringBuffer2);
      favListID += 1;
    }
  }
  writer.end();
  writer2.end();
  console.log('done');
}

dataGen();
