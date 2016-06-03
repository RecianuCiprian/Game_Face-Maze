var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose=require('mongoose');
var configDB=require('./config/database');
var MongoStore = require('connect-mongo')(session);
var mongodb = require('mongodb');


mongoose.connect(configDB.url);
var app= express();

app.use(express.static(path.join(__dirname, '../app')));
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'annySringCeva',
	//cookie: {
	//	secure: true,
	//	expires: false
	//},
	saveUninitialized:true,// save sesion to a database
	resave:true,//nothings change, save again
	store:new MongoStore({mongooseConnection:mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

//unauthorized routes
var unauthRoutes = express.Router();
require('./Routes/app.unauthRoutes.js')(unauthRoutes,passport);
app.use('/', unauthRoutes);

//authorized routes
var authRoutes = express.Router();
require('./Routes/app.authRoutes.js')(authRoutes);
app.use('/user', authRoutes);

app.get('/',function(req,res){
	 res.sendFile(path.join(__dirname,'../app/pages','index.html'));
	// console.log(req.cookies);
	// console.log('============================================');
	// console.log(req.session);
});


module.exports = app;