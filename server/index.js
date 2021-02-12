var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/user');
var tradeRoutes = require('./routes/trade');
var setupRoutes = require('./routes/setup');
var statsRoutes = require('./routes/stats');
var reportRoutes = require('./routes/report');
var dashboardRoutes = require('./routes/dashboard');

var mongoDbUri =
	'mongodb+srv://iamzee:password99@cluster0.bd2sz.mongodb.net/ddt?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', tradeRoutes);
app.use('/', setupRoutes);
app.use('/', statsRoutes);
app.use('/', reportRoutes);
app.use('/', dashboardRoutes);

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

var PORT = process.env.PORT || 3000;

app.listen(PORT);
