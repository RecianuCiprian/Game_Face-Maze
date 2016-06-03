angular.module('myApp').service('imageService',
	['$q','$timeout','$http', 
		function($q,$timeout,$http){

		return({
			imageProvider:imageProvider
			//upload:upload
		});

		//function upload(file){
        //
		//	var deffered=$q.defer();
		//	console.log(file);
		//	$http.post('/user/upload/images',{file:file})
		//		.success(function(data,status){
        //
		//			if(status === 200 && data){
		//				deffered.resolve(data);
		//			} else {
		//				deffered.reject(data);
		//			}
		//		})
		//		.error(function(data){
		//			deffered.reject(data);
		//		});
        //
		//	return deffered.promise;
		//}


		function imageProvider(){

			var deffered=$q.defer();

			$http.get('/user/images')
				.success(function(data,status){
					console.log(data);
					console.log(status);

					if(status === 200 && data){
		  				deffered.resolve(data);
		  			} else {
		            	deffered.reject(data);
		          	}
		          })
                  .error(function(data){
	  			deffered.reject(data);
	  			});

	        return deffered.promise;
		}
}]);