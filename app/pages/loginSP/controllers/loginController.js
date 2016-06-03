angular.module('myApp').controller('loginControler', 
	['$scope','$location','AuthServices', 
		function($scope,$location,AuthServices){

		$scope.login=function(){
          //console.log("hello");
			       //initial values
      		$scope.error = false;
      		//$scope.disabled = true;

      		AuthServices.login($scope.loginForm.userName,$scope.loginForm.password)
              .then(function(){
                $location.path('/user/images');
                $scope.disabled=false;

                console.log("hello " + $scope.loginForm.userName + ' ' + $scope.loginForm.password);
                //$scope.loginForm={};
              })
			.catch(function(){
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.disabled = false;
					$scope.loginForm = {};
				});

		};
}]);