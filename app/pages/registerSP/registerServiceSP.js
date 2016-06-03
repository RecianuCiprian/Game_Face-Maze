angular.module('myApp').service('AuthService', 
	['$q','$timeout','$http',
	function($q,$timeout,$http){
	
	return({
		register:register
	});

	function register(email,password){

		var deferred=$q.defer();

		$http.post('/register',{email:email,password:password})
		.success(function(data,status){
			if(status==200 && data.status){
				deferred.resolve(data);
			}
			else{
				deferred.reject(data);
			}
		})
		.error(function(data){
				deferred.reject(data);
		});

		return deferred.promise;
	}
}]);

