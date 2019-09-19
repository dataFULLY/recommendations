const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const faker = require('faker');


const fakeList = [];
const newPlaces = [];

const savedLists = [];
for (let i = 0; i < 10; i += 1) {
  fakeList.push(faker.lorem.word());
  const saveListName = {
    name: fakeList[i],
  };
  savedLists.push(saveListName);
}

for (let i = 1; i < 101; i += 1) {
  // randomly chooses true or false
  let plusVerified = true;
  if (Math.random() > 0.5) {
    plusVerified = false;
  }

  // randomly choost savedList
  const savedList = fakeList.slice(Math.floor(Math.random() * 20));

  // generates a places data
  const newPlace = {
    id: i,
    url: `https://mock-property-images.s3-us-west-1.amazonaws.com/houses/house-${i}.jpeg`,
    title: faker.lorem.sentence(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    plusVerified,
    propertyType: faker.lorem.words(),
    price: Math.floor(Math.random() * 200 + 100),
    averageReview: Math.random() + 4,
    totalReviews: Math.floor(Math.random() * 100 + 100),
    savedList,
    about: faker.lorem.words(),
    theSpace: faker.lorem.words(),
    neighborhood: faker.lorem.words(),
  };
  newPlaces.push(newPlace);
}

const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let id = 0; id < 10; id += 1) {
    const places = [];
    const rand = Math.floor(Math.random() * 6 + 5);
    for (let j = 0; j < rand; j += 1) {
      places.push(newPlaces[Math.floor(Math.random() * 100)]);
    }
    const obj = { id, places };
    console.log(obj);
    writer.write(obj);
  }
  writer.end();
  console.log('done');
};

dataGen();


const obj = [id, `https://mock-property-images.s3-us-west-1.amazonaws.com/houses/house-${randi}.jpeg`, faker.lorem.sentence(), faker.lorem.city(), faker.lorem.state(), faker.lorem.country(), plusVerified, faker.lorem.words(), Math.floor(Math.random() * 200 + 100), Math.random() + 4, Math.floor(Math.random() * 100 + 100), faker.lorem.words(), faker.lorem.words(), faker.lorem.words()];
