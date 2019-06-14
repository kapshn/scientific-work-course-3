const express = require('express')
const light = require('./light.js');
var bodyParser = require('body-parser');

const app = express()
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// POST method route
app.post('/', function (req, res) {
  light.change_state(parseInt(req.body.state, 10), parseInt(req.body.time, 10), parseInt(req.body.brightness, 10));
  res.send();
});
app.listen(8000)
// curl --data "state=0&time=1000&brightness=15" localhost:8000
// curl --data "state=1&time=1000&brightness=15" localhost:8000
