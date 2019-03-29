const fetch = require('fetch-everywhere')
const messageBuilder = require('./helpers/messageBuilder')
const devConfig = require('./config/config.dev.json');
const getWerdinoData = require('.')

const getWebhookAddress = () => {
  const envAddress = process.env.SLACK_WEBHOOK_ADDRESS;
  
  if (envAddress && typeof envAddress === 'string') {
    return envAddress;
  }
  return devConfig.SLACK_WEBHOOK_ADDRESS;
}

function runWerdino() {
  getWerdinoData().then(data => {
    const blocks = messageBuilder(data)
  
    fetch(getWebhookAddress(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blocks })
      }
    )
      .then(response => {
        console.log(response.status, response.statusText)
      })
      .catch(error => console.error('Error with Slack Webhook:', error))
  }).catch(err => console.log(`Error in getWerdinoData: ${err}`));
}

module.exports.runWerdino = runWerdino;
