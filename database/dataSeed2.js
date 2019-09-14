const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const faker = require('faker');

let counter = 0;
async function dataGen() {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let restaurantID = 0; restaurantID < 10000000; restaurantID += 1) {
    // const rand = Math.floor(Math.random() * 6 + 5);
    // for (let i = 0; i < 5; i += 1) {
    const randi = Math.floor(Math.random() * 100 + 1);
    let plusVerified = true;
    if (Math.random() > 0.5) {
      plusVerified = false;
    }
    // generates a places data
    const newPlace = {
      id: counter,
      url: randi,
      title: faker.lorem.sentence(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      plusVerified,
      propertyType: faker.lorem.words(),
      price: Math.floor(Math.random() * 200 + 100),
      averageReview: Math.random() + 4,
      totalReviews: Math.floor(Math.random() * 100 + 100),
      about: faker.lorem.words(),
      theSpace: faker.lorem.words(),
      neighborhood: faker.lorem.words(),
    };

    if (counter % 100000 === 0) {
      console.log(counter);
    }
    counter += 1;


    const ableToWrite = writer.write(newPlace);
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
