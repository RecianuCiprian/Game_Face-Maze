
var myApp = angular.module('myApp', ['ngFileUpload','infinite-scroll','ngRoute','ngFacebook','ngMaterial', 'ngAnimate','ngAria']);

myApp.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'pages/home/homeView.html',
      controller:'homeControler',
      access: {
        restricted: false
      }
    })
    .when('/user/images', {
      templateUrl:'pages/uploadedImages/images.html',
      controller: 'imagesControler',
      access:{
        restricted: true
      }
    })

    //added to test facebook app
    .when('/facebooklogin', {
        templateUrl: 'pages/loginRegisterMP/loginRegisterViewMP.html',
        controller:'FacebookController',
        access: {restricted: false}
      })


    
    //added top test page
    .when('/user/top', {
      templateUrl: 'pages/top/topView.html',
      controller:'TopController',
      access: {restricted: false}
    })

    .when('/login', {
      templateUrl:'pages/loginSP/loginView.html',
      controller:'loginControler',
      access:{
        restricted:false
      }
    })

    .when('/register',{
    	templateUrl:'pages/registerSP/registerViewSP.html',
    	controller:'registerControler',
    	access:{
    		restricted: false
    	}
    })   
                                                                                            
    .otherwise({
      redirectTo: '/'
    });


});

////////////////////////////////////////////////

myApp.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1714289672182002');
  $facebookProvider.setPermissions("email","public_profile","user_posts","publish_actions","user_photos");
});

myApp.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
 (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});
/////////////////////////////////////////////////
