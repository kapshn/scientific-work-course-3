const express = require('express')
const light = require('./light.js');
var bodyParser = require('body-parser');
var fs = require('fs');
const data = require('./res.json');
const preset = require('./preset.json');

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
  //light.change_state(parseInt(req.body.state, 10), parseInt(req.body.time, 10), parseInt(req.body.brightness, 10));
  console.log(req.body.queryResult.intent.displayName);
  if (req.body.queryResult.intent.displayName == "intent turn off light") {
    light.change_state(0, 1500, 15);
  }
  if (req.body.queryResult.intent.displayName == "intent turn on light") {
    light.change_state(1, 1500, parseInt(preset.on,10));
  }
  if (req.body.queryResult.intent.displayName == "intent nightmode") {
    light.change_state(1, 1500, parseInt(preset.nightmode,10));
  }
  if (req.body.queryResult.intent.displayName == "intent readmode") {
    light.change_state(1, 1500, parseInt(preset.readmode,10));
  }
  if (req.body.queryResult.intent.displayName == "intent up brightness") {
    var iB = light.infoBrightness();
    iB.then(info => {
      var nb = info.light_state.brightness+10;
      light.change_state(1, 1500, parseInt(nb,10));
    })
    .catch(e => console.error(e))
  }
  if (req.body.queryResult.intent.displayName == "intent down brightness") {
    var iB = light.infoBrightness();
    iB.then(info => {
      var nb = info.light_state.brightness-10;
      light.change_state(1, 1500, parseInt(nb,10));
    })
    .catch(e => console.error(e))
  }
  if (req.body.queryResult.intent.displayName == "intent set brightness") {
    //console.log(req.body.queryResult.parameters.number);
    light.change_state(1, 1500, parseInt(req.body.queryResult.parameters.number,10));
  }
  if (req.body.queryResult.intent.displayName == "intent turn on preset") {
    light.change_state(1, 1500, parseInt(preset.preset1,10));
  }
  if (req.body.queryResult.intent.displayName == "intent change") {
    if (req.body.queryResult.parameters.Preset == "Preset"){
      preset.preset1=req.body.queryResult.parameters.number;
      fs.writeFile('./preset.json', JSON.stringify(preset, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(preset));
      });
    }
    if (req.body.queryResult.parameters.action == "on"){
      preset.on=req.body.queryResult.parameters.number;
      fs.writeFile('./preset.json', JSON.stringify(preset, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(preset));
      });
    }
    if (req.body.queryResult.parameters.light == "read"){
      preset.readmode=req.body.queryResult.parameters.number;
      fs.writeFile('./preset.json', JSON.stringify(preset, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(preset));
      });
    }
    if (req.body.queryResult.parameters.light == "night"){
      preset.nightmode=req.body.queryResult.parameters.number;
      fs.writeFile('./preset.json', JSON.stringify(preset, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(preset));
      });
    }

  }
  res.status(200).json(data);
});
app.listen(8000)
// curl --data "state=0&time=1000&brightness=15" localhost:8000
// curl --data "state=1&time=1000&brightness=15" localhost:8000
// ./ngrok http 8000
