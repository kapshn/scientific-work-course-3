const TPLSmartDevice = require('tplink-lightbulb');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const light = new TPLSmartDevice(config.ip);

module.exports.change_state = function(state, time, brightness) {
  console.log(state, time, brightness);
  light.send({
    'smartlife.iot.smartbulb.lightingservice': {
      'transition_light_state': {
        'on_off': state,
        'transition_period': time,
        'brightness': brightness
      }
    }
  })
  .then(response => {
    console.log(response)
  })
  .catch(e => console.error(e))
}
module.exports.infoBrightness = function() {
  return light.info();
}
