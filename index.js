const express = require('express')

const bodyParser = require('body-parser');
const app = express();

const request = require("request");

const PAGE_ACCESS_TOKEN ="EAAJ8qdCTQo4BAFFoOrN1nW1bsw3XTqR3f0BCgfCJohp6eYRPN7ZAUIBu7QxxRAZAZCxWOLD9T3c18nOwVAt1cu4qAOTuq8rWlu5cFoDnY5RNUsbQ2VWvAE3cACUbgHOcvEwZAyrs9Rs6LiZA9QDwZCK9hP3jgcj9qw2UHQOoxbpMvKH2SKVhqJXZAYrYVZCMxHgZD" ;

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

  app.get("/setup", function (req, res) {
 
    "data": [
      {
        "whitelisted_domains": [
          "https://facebook.com/"
        ],
        "greeting": [
          {
             "locale": "default",
             "text": "Hello!"
          },
          {
             "locale": "en_US",
             "text": "Timeless apparel for the masses."
          }
       ]
    }
 ]
  };
  
  request(
    {

       url : "https://graph.facebook.com/v9.0/me/messenger_profile?access_token=" + PAGE_ACCESS_TOKEN ,
       method :"POST" ,
       headers :{ "Content-Type": "application/json"},
       form : data
    },
    function(error, response, body){

      console.log(response);
      console.log(body);
    }
      );
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
  