require('newrelic');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
// pools will use environment variables
// for connection information
const pool = new Pool({
  database: 'nearby',
});

const port = 3005;
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
  let query = `SELECT city FROM places_no_index WHERE id = ${id}`;
  pool.query(query, (err, results) => {
    // console.log(err, results);
    const { city } = results.rows[0];
    // console.log(city);
    query = 'SELECT * FROM places_no_index WHERE city = $1 LIMIT 10';
    // console.log(query);
    pool.query(query, [city], (err, results2) => {
      res.send(results2.rows);
    });
  });
});

// Creates a new listing
app.post('api/listing', (req, res) => {

});

// Deletes a listing
app.post('api/listing', (req, res) => {

});

app.get('/api/savedlist/:id', (req, res) => {
  let { id } = req.params;
  if (!id) {
    id = 0;
  }
  const query = `Select favList_by_userID.favListID, placeID_by_favListID.placeID, favList_by_userID.listName from favList_by_userID, placeID_by_favListID where favList_by_userID.favListID = placeID_by_favListID.favListID AND favList_by_userID.userID = ${id} LIMIT 5`;
  pool.query(query, (err, results) => {
    res.send(results.rows);
  });
});

// Creates a new entry for lists under current userID
app.post('/api/savedlist', (req, res) => {

});

// Creates new entry for listings in target list under current userID
app.put('/api/savedlist', (req, res) => {

});

// Deletes entry for listings in target list under current userID
app.delete('/api/savedlist', (req, res) => {

});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${[port]}`);
});
