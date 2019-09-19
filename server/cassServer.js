require('newrelic');
const express = require('express');
const cors = require('cors');
const model = require('../database/index');
const client = require('../database/cassandra/index');

const port = 3004;
const app = express();

app.use(require('morgan')('dev'));

app.use(cors());
app.use(express.static('public'));
app.use('/listing/:id', express.static('public'));

app.get('/api/listing/:id', (req, res) => {
  // console.log(req.params.id);
  let { id } = req.params;
  if (!id) {
    id = 0;
  }
  const query = `SELECT city FROM city_by_id WHERE id = ${id}`;
  client.execute(query)
    .then((response) => {
      const { city } = response.rows[0];
      const query = `SELECT * FROM places_by_city WHERE city = '${city}'`;
      // const query = 'SELECT * FROM places_by_city LIMIT 7';
      return client.execute(query);
    })
    .then((response) => {
      const arr = response.rows.map((places) => places.Row);
      res.send(response.rows);
    });
});

app.get('/api/savedlist/:id', (req, res) => {
  let { id } = req.params;
  if (!id) {
    id = 0;
  }
  const query = `SELECT * FROM favList_by_userID WHERE userID = ${id}`;
  client.execute(query)
    .then((response) => {
      const arr = response.rows.map((places) => places.Row);
      res.send(response.rows);
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
