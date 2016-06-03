angular.module('myApp').controller('registerControler', 
	['$scope','$location','AuthService', 
		function($scope,$location,AuthService){
			
			$scope.register= function(){
				$scope.disable=true;
				$scope.error=false;

				AuthService.register($scope.registerForm.email,$scope.registerForm.password)
				.then(function(data){
					$location.path('/');
					$scope.disable=false;
					console.log("hello " + data.email + ' ' + data.password);
					$scope.loginForm={};
				})
				.catch(function(data){
					$scope.disable=false;
					alert(data.status);
					$scope.error=true;
					$scope.registerForm={};
					console.log("eroare");
				})
			};
}])
.directive('wjValidationError', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctl) {
      scope.$watch(attrs['wjValidationError'], function (errorMsg) {
        elm[0].setCustomValidity(errorMsg);
        ctl.$setValidity('wjValidationError', errorMsg ? false : true);
      });
    }
  };
});