// https://expressjs.com/fr/advanced/best-practice-security.html

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router.js');
const mongoose = require('mongoose');
const resources = require('./utils/resources');

const PORT = process.env.PORT || 5000;

const dbURL = resources.env == 'development' ? 'mongodb://localhost:27017/arduino' : process.env['MONGODB_URI'];

const ALLOWED_METHOD = ["POST", "GET", "PUT"];

console.log('dbURL: ' + dbURL);
console.log('port:' + PORT);

mongoose.connect(dbURL);

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// This header can be a security breach: https://github.com/nasa/openmct/issues/1036
app.disable('x-powered-by');


app.use((req, res, next) => {
  req.setTimeout(300000);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const method = req.method;
  const url = req.url;
  const body = JSON.stringify(req.body);

  console.log(method + ":" + url + " FROM " + ip);
  console.log('body:' + body);
  console.log();
  next();
});

app.use((req, res, next) => {
  if (ALLOWED_METHOD.includes(req.method)) {
    next();
  } else {
    res.status(405).send({success: false, message: `Method ${req.method} not allowed`});
  }
})

app.use('/api', router);

app.use((req, res, next) => {
  res.status(404).send({success: false, message: '404 not found'});
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
