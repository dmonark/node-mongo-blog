const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://factly:qWOH9xRuWuDtt6zA@cluster0-qdjtw.mongodb.net/test?retryWrites=true';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(404).send({
  message: 'Not found.',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`The server is running at localhost:${port}`);
});