var express = require('express');
var fs = require('fs');
//var defer=require('promised-io/promise').defer;
//var Type = require('type-of-is');
//var passport= require('passport');
var user = require('../models/user');


module.exports=function(router,passport){

	router.post('/login', function (req, res) {

		passport.authenticate('local-login',function(err,user,message) {
			if (err) {
				return res.status(400).json({status: err});
			}
			if (!user) {
				return res.status(400).json({status: message});
			}
			//console.log(req);
			req.logIn(user, function (err) {
				if (err) {
					return res.status(500).json({
						err: 'Could not log in user'
					});
				}
				res.status(200).json({
					status: 'Login successful!'
				});
			});
		})(req,res);



		// console.log(req.cookies);
		// console.log('============================================');
		// console.log(req.session);
	});

	//authenticate cumva preia deja req.body si vede acolo daca se afla username si password sau ce informatii ii dam noi
	router.post('/register', function (req, res) {

		passport.authenticate('local-singup', function (err, user, mesage) {//(1)

			if (err) {
				return res.status(401).json({status: err});
			}

			if (!user) {
				return res.status(400).json({status: mesage});
			} else {
				return res.status(200).json({
					status: 'Register successful!',
					email: req.body.email,
					password: req.body.password
				});
			}
		})(req,res);

	});

	router.get('/facebooklogin/facebook',passport.authenticate('facebook',{ scope: ['user_friends', 'manage_pages',' read_custom_friendlists '] }));

	router.get('/facebooklogin/facebook/return',

		passport.authenticate('facebook',{successRedirect:'/#/user/images',
			failureRedirect:'/'})
	);

};

