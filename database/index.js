const mongoose = require('mongoose');
const config = require('./config');

const login = config.user ? `${config.user}:${config.password}@` : '';

const db = mongoose.connection;

mongoose.connect(`mongodb://${login}${config.host}/airbnb`, {
  useNewUrlParser: true,
});

const placeSchema = new mongoose.Schema({
  id: Number,
  url: String,
  title: String,
  city: String,
  state: String,
  country: String,
  plusVerified: Boolean,
  propertyType: String,
  price: Number,
  averageReview: Number,
  totalReviews: Number,
  savedList: [String],
  about: String,
  theSpace: String,
  neighborhood: String,
});

const Place = mongoose.model('Places', placeSchema);

const savedListSchema = new mongoose.Schema({
  name: String,
});

const SavedList = mongoose.model('SavedList', savedListSchema);


const listingsSchema = new mongoose.Schema({
  id: Number,
  places: [placeSchema],
});

const Listing = mongoose.model('Listings', listingsSchema);

module.exports = {
  db,
  SavedList,
  Place,
  Listing,
};
