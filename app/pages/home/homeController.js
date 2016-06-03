angular.module('myApp').controller('homeControler', 
	['$scope','$location', 
		function($scope,$location){

			$scope.login=function(){
				$location.path('/login');
			};

			$scope.register=function(){
				$location.path('/register');
			};

			$scope.faceBookLogin=function(){
				$location.path('/facebooklogin');
			};
	
}]);