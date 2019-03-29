# werdino-daily

> :pizza: :hamburger: The Werdino daily menu in English and German, delivered straight to Slack

![](media/screenshot.png)

## Serverless

> :bulb: The main function is found in `handler.js`

### Getting Started

Make sure you have the Serverless framework installed globally:

```
$ npm install -g serverless
```

and that you have set an env var named `SLACK_WEBHOOK_ADDRESS` and set it to the value of your Slack webhook address

### Deploy to lambda

Serverless will do a lot of magic with this one command, including wrapping your function in a `.zip` directory and uploading to S3 (required for Lambda), configuring CloudWatch, configuring IAM, etc:

```
$ serverless deploy
```

### Reading the logs

```
$ serverless logs --function run --tail
```