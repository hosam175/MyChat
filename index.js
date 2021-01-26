const express = require('express')

const bodyParser = require('body-parser');
const app = express();

const request = require("request");
const { defaults } = require('request');

const PAGE_ACCESS_TOKEN = "EAAJ8qdCTQo4BAFfBFhog0o2gTkXOkR0XiwWuvuQZBBe05m15oywxaDZCbmnBsx8kJXl9ZCQ3aaZAzCyoWAiwLGgX8CXt8mHoUZCNB8GuqcHSSiOBO1jQ79UEurZCUyortEY3U8dw0FPrZAH8QSZAgtN3nXDXWMoHAQzI1oys9GhXyj2RZBAy0bnSjZAm5Q6iy3LUkZD";

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
  setupGretingText();
  setupGetStartedButton();
  setupPersistentMenu();


  res.send("Done");
});

function setupPersistentMenu() {
  var data = {
    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": true,
        "call_to_actions": [
          {
            "type": "postback",
            "title": "Talk to an agent",
            "payload": "PAYLOAD1"
          },
          {
            "type": "postback",
            "title": "Outfit suggestions",
            "payload": "PAYLOAD2"
          },
          {
            "type": "web_url",
            "title": "Shop now",
            "url": "https://www.facebook.com/Ourchat-100608232037119/",
            "webview_height_ratio": "full"
          }
        ]
      }
    ]

  };
  request(
    {

      url: "https://graph.facebook.com/v9.0/me/messenger_profile?access_token=" + PAGE_ACCESS_TOKEN,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      form: data
    },
    function (error, response, body) {

      console.log(response);
      console.log(body);
    }
  );

}



function setupGetStartedButton() {
  var data = {
    "get_started": {
      "payload": "GET_STARTED_PAYLOAD"
    }

  };
  request(
    {

      url: "https://graph.facebook.com/v9.0/me/messenger_profile?access_token=" + PAGE_ACCESS_TOKEN,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      form: data
    },
    function (error, response, body) {

      console.log(response);
      console.log(body);
    }
  );

}
function setupGretingText() {
  var data = {
    "greeting": [
      {
        "locale": "default",
        "text": " أهلا وسهلا{{user_full_name}} كيف فيني ساعدك"
      }

    ]
  };

  request(
    {

      url: "https://graph.facebook.com/v9.0/me/messenger_profile?access_token=" + PAGE_ACCESS_TOKEN,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      form: data
    },
    function (error, response, body) {

      console.log(response);
      console.log(body);
    }
  );

}

app.post("/webhook", function (req, res) {

  var data = req.body;
  if (data.object === "page") {
    data.entry.forEach(function (entry) {

      var pageID = entry.id;
      var timeStamp = entry.time;
      entry.messaging.forEach(function (event) {
        if (event.message) {

          var messageText = event.message.text;
          receivedMessage(event);
        }
        else if (event.postback) {
          receivedPostback(event);
        }
      });
    });

    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  var senderid = event.sender.id;
  var messageText = event.message.text;
  switch (messageText) {
    case "hi":
      var msg = "You send Hi , How are you?"
      sendTextMessage(senderid, msg)
      break;
    case "help":
      break;
    default:
      break;
  }
}
function sendTextMessage(recipientId, msg) {
  var data = {
    "recipient": {
      "id": recipientId
    },
    "message": {
      "text": msg
    }
  };
  request(
    {

      url: "https://graph.facebook.com/v9.0/me/messages?access_token=" + PAGE_ACCESS_TOKEN,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      form: data
    },
    function (error, response, body) {

      console.log(response);
      console.log(body);
    }
  );
}


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
