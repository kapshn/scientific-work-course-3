const TPLSmartDevice = require('tplink-lightbulb');
const light = new TPLSmartDevice('192.168.1.56');

module.exports.change_state = function(state, time, brightness) {
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
    //console.log(response)
  })
  .catch(e => console.error(e))
}
