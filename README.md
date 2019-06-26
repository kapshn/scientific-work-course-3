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
