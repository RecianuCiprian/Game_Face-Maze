//var express = require('express');
var fs = require('fs');
////var defer=require('promised-io/promise').defer;
////var Type = require('type-of-is');
////var passport= require('passport');
//var user = require('./models/user');
//var multer = require('multer');
var multiplaty=require('connect-multiparty'), multipartyUse = multiplaty();
var vals;

//var fil=fs.readFileSync("./upload/5743edad0a0a46f823f945d7-1464750007830.jpg");
//console.log(fil);


module.exports=function(router){
	router.use(multipartyUse);
	router.use(function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}

		res.status(400).json({status:'You arrant logged in'})
	});

	//var storage = multer.diskStorage({ //multers disk storage settings
	//	destination: function (req, file, cb) {
	//		//console.log(req);
	//		cb(null, './upload/')
	//	},
	//	filename: function (req, file, cb) {
    //
	//		var datetimestamp = Date.now();
	//		cb(null, req.user._id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
	//	}
	//});
    //
	//var upload = multer({ //multer settings
	//	storage: storage
	//}).single('file');

	router.post('/upload/images',function(req,res){
		//console.log(req);
		//console.log(req.files.file);
		//var stream=fs.createReadStream(req.files.file.path);
		//console.log(req.files.file);
		var fil=fs.readFileSync(req.files.file.path);
		//console.log(fil);
		//console.log(fil.toString('base64'));
		vals = (new Buffer(fil)).toString('base64');

		//onsole.log(vals);

		//upload(req,res,function(err){
		//	if(err){
		//		res.json({error_code:1,err_desc:err});
		//		return;
		//	}
		//	res.json({error_code:0,err_desc:null});
		//});
		//console.log(req);
		//res.status(200).json({status:'corect'});
	});

	router.get('/images', function (req, res) {
		//citirea fisierelor din folder

		var files=fs.readdirSync("./upload");
		var array=[];

		for(var i=0;i<files.length;i++){
			if(files[i].split('-')[0]==req.user._id){
				array.push(files);
			}
		}
		//console.log('ajung aici');
		//console.log(vals);
		//res.send(fil);
		res.status(200).json({ar:array,ceva:[vals]});
		//console.log(req.user);
	});

	router.get('/logout',function(req,res){
		console.log('logout');
		req.logout();
		res.redirect('/');
	});


	//authenticate cumva preia deja req.body si vede acolo daca se afla username si password sau ce informatii ii dam noi

};




