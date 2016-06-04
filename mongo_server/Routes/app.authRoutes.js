var fs = require('fs');
var multiplaty=require('connect-multiparty'), multipartyUse = multiplaty();
var User=require('../models/user');


module.exports=function(router){
	router.use(multipartyUse);
	router.use(function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.status(400).json({status:'You arrant logged in'})
	});



	router.post('/upload/images',function(req,res){

		var fil=fs.readFileSync(req.files.file.path);


		User.findOneAndUpdate({_id:req.user._id},{$push: {'local.images': fil}},{safe: true,upsert: true}
			,function(err){
			if(err){
				res.status(500).json({Status:"Database occurred a problem"})
			}
			res.status(200).json({status:"Upload successful"});
		});

	});

	router.get('/images', function (req, res) {
		User.findById(req.user._id,function(err,result){
			if(err){
				res.status(500).json({status:"Server error"});
			}

			var rez =[];
			for(var i=0;i<result.local.images.length;i++){
				rez.push(result.local.images[i].toString('base64'));
			}
			res.status(200).json(rez);
		});

	});

	router.get('/logout',function(req,res){
		console.log('logout');
		req.logout();
		res.redirect('/');
	});


	//authenticate cumva preia deja req.body si vede acolo daca se afla username si password sau ce informatii ii dam noi

};




