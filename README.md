# scientific-work-course-3
### DEVELOPMENT OF A SYSTEM TO CONTROL A SMART LIGHT BULB USING A VOICE ASSISTANT
## Setup
1. rename `preset_save.json` to `preset.json`
2. create `config.json`
  ```JSON
  {
    "ip":"lightbulb ip"
  }
  ```
3. create DialogFlow agent
4. Go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `SmartBulb.zip` this directory.
5. run Ngrok on port 8000
6. Copy ngrok link
7. Back in Dialogflow Console > **Fulfullment** > **Enable** Webhook.
      + Paste the URL into the **URL** field > **Save**.
**done!**

## Guide
# Main change state method
```javascript
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
```
Here method to change state by API, take 3 parameters: state (0/1), time (how much time should be a transition) and brightness (0-100)

In `server.js` in method ```javascript app.post()``` big switch case, wich takes parameters from post-request body for find solution, after finding use ```javascript change_state(s, t, b)``` or **something else**
# something else
Another 2 types of methods or changing `preset.json`, wich keep your preset settings, or
1. find current brightness by ```javascript .infoBrightness()```
2. changing brightness for 10% up or down from current
