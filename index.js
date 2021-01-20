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
  