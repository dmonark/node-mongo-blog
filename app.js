"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var http = require('http');

var cors = require('cors');

var path = require('path');

var app = express(); 

var mongoose = require('mongoose'); // Set up mongoose connection

var dev_db_url = 'mongodb+srv://factly:qWOH9xRuWuDtt6zA@cluster0-qdjtw.mongodb.net/test?retryWrites=true';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: '*',
	exposedHeaders: ['x-token', 'Content-Length']
}));

require('./server/routes')(app);
/*app.get('*', function (req, res) {
  return res.status(404).send({
    message: 'Not found.'
  });
});
*/
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port, function () {
  console.log("The server is running at localhost:".concat(port));
});

module.exports = server;