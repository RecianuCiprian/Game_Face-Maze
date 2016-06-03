angular.module('myApp').service('AuthServices',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

  	return({
  		login:login
  	});

  	function login(username,password){

  		var deferred=$q.defer();

  		$http.post('/login',
  			{email:username, password:password})
  		.success(function(data,status){
  			if(status === 200 && data.status){
  				deferred.resolve();
  			} else {
            deferred.reject();
          	}
  		})
  		.error(function(data){
				console.log(data);
  			deferred.reject();
  		});
  		return deferred.promise;
  	}
}]);