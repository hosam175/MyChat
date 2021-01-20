const express = require('express')

const bodyParser = require('body-parser');
const app = express();
const request = require("request");
// app configuration
app.set('port', (process.env.PORT || 8000));


// setup our express application

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), function () {

    console.log('Application running on port: ', app.get('port'));
  });
  app.get("/", function (req, res) {

    res.send("Hey I am Here");
  });
  
  app.get("/webhook", function (req, res) {

    const PAGE_VERIFY_TOKEN = "ourchatbotwebapp1234";
  
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
  
    if (token === PAGE_VERIFY_TOKEN) {
  
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
  
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  });
  