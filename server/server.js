const express = require('express');
const cors = require('cors');
const model = require('../database/index');

const port = 3004;
const app = express();

app.use(require('morgan')('dev'));

app.use(cors());
app.use(express.static('public'));
app.use('/listing/:id', express.static('public'));

app.get('/api/nearbyPlaces/:id', (req, res) => {
  const { id } = req.query;
  model.Listing.find({ id })
    .then((result) => {
      res.send(result[0].places);
      // console.log(result);
    });
  // ranges from 8 - 13
  // const randomAmount = Math.floor(Math.random() * 6 + 8);
  // model.Place.aggregate([{ $sample: { size: randomAmount } }])
  //   .then((result) => {
  //     console.log(result);
  //     res.send(result);
  //   });
});

app.get('/api/savedlist', (req, res) => {
  model.SavedList.find().exec()
    .then((result) => {
      res.send(result);
    });
});

app.post('/api/savedlist', (req, res) => {
  model.SavedList.find().exec()
    .then((result) => {
      res.send(result);
    });
});

app.put('/api/savedlist', (req, res) => {
  model.SavedList.find().exec()
    .then((result) => {
      res.send(result);
    });
});

app.delete('/api/savedlist', (req, res) => {
  model.SavedList.find().exec()
    .then((result) => {
      res.send(result);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${[port]}`);
});
