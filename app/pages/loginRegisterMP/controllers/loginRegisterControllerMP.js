angular.module('myApp').controller('FacebookController', ['$scope','$location','$facebook',function($scope,$location,$facebook){
		  
      console.log("[FBCtrl]Facebookcontroller");

      $scope.welcomeMsg="Please log in";
      $scope.isLoggedIn=false;

      $scope.login=function(){
        $facebook.login().then(function(){
          console.log("[FBCtrl]LoggedIn");
          $scope.isLoggedIn=true;
          //refresh();
        })

      };

      $scope.logout=function(){
        $facebook.logout().then(function(){
          console.log("[FBCtrl]LoggedOut");
          //TODO:verifca daca mai sunt logat pe facebook getstatus
          $scope.isLoggedIn=false;
          refresh();
        },function(err){
            $scope.isLoggedIn=false;
            refresh();
        });
      };

      $scope.PlayPacman=function(){

      };

      function refresh(){
          $facebook.api("/me").then(function(response){
          $scope.welcomeMsg="You are now logged in";
          $scope.userInfo=response;
          $facebook.api('/me/picture').then(function(response){
          $scope.picture=response.data.url;
          })
        },function(err){
           $scope.welcomeMsg="Please log in";
        });
      }
		}
]);