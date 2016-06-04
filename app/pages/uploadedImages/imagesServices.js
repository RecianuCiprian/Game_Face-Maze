angular.module('myApp').service('imageService',
	['$q','$timeout','$http', 
		function($q,$timeout,$http){

		return({
			imageProvider:imageProvider
		});

		function imageProvider(){

			var deffered=$q.defer();

			$http.get('/user/images')
				.success(function(data,status){
					//console.log(data);
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