const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// const writer = csvWriter();
const zlib = require('zlib');

const writer = zlib.createGzip();
const faker = require('faker');

async function dataGen() {
  writer.pipe(fs.createWriteStream('data10mSmall.csv.gz'));
  // const header = 'id,url,title,city,state,country,plusVerified,propertyType,price,averageReview,totalReviews,about,theSpace,neighborhood\n';
  const header = 'id,url,title,city,state\n';
  // const header = 'id,url,title\n';

  // const header = 'id,url\n';
  writer.write(header);
  for (let restaurantID = 0; restaurantID < 10000000; restaurantID += 1) {
    // const rand = Math.floor(Math.random() * 6 + 5);
    // for (let i = 0; i < 5; i += 1) {
    const randi = Math.floor(Math.random() * 100 + 1);
    let plusVerified = true;
    if (Math.random() > 0.5) {
      plusVerified = false;
    }

    // randomly choost savedList

    // generates a places data
    const newPlace = {
      id: restaurantID,
      url: randi,
      title: faker.lorem.sentence(),
      city: faker.address.city(),
      state: faker.address.state(),
      // country: faker.address.state(),
      // plusVerified,
      // propertyType: faker.lorem.words(),
      // price: Math.floor(Math.random() * 200 + 100),
      // averageReview: Math.random() + 4,
      // totalReviews: Math.floor(Math.random() * 100 + 100),
      // savedList,
      // about: faker.lorem.words(),
      // theSpace: faker.lorem.words(),
      // neighborhood: faker.lorem.words(),
    };

    if (restaurantID % 100000 === 0) {
      console.log(restaurantID);
    }

    const
      {
        // id, url, title, city, state, country, propertyType, price, averageReview, totalReviews, about, theSpace, neighborhood,
        id, url, title, city, state,
      } = newPlace;
    // const stringBuffer = (`${id},${url},${title},${city},${state},${country},${plusVerified},${propertyType},${price},${averageReview},${totalReviews},${about},${theSpace},${neighborhood}\n`);
    const stringBuffer = (`${id},${url},${title},${city},${state}\n`);
    // const stringBuffer = (`${id},${url},${title}\n`);
    const ableToWrite = writer.write(stringBuffer);
    // const ableToWrite = writer.write(newPlace);
    if (!ableToWrite) {
      await new Promise((resolve) => {
        writer.once('drain', resolve);
      })
        .catch((err) => {
          console.log(err);
        });
    }
    // }
  }
  writer.end();
  console.log('done');
}

dataGen();
