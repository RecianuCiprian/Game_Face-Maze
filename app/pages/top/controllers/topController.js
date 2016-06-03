angular.module('myApp').controller("TopController", ["$scope",'$timeout','topservice',function($scope,$timeout,topservice) {
   	console.log("TopController");
   $scope.tab = 1;

  //var startP=1;
  var numberR=10;
  console.log("ceva");
    $scope.setTab = function(newTab)
    {
      var startP=1;//
      switch(newTab)
      {
        case 1: 
        {
          //$timeout(function()
          //{
            topservice.easymode(startP,numberR)
            .then(function(data)
            {
                $scope.data=data;
                /*console.log(data);
                console.log(startP);
                console.log(numberR);*/
               
            })
          //},1000)
          //.then(function(){
            //  startP= startP + numberR;
             // console.log(startP);
         // })
          break;
        }
        case 2:
        {
          topservice.mediummode()
          .then(function(data)
          {
              $scope.data=data;
              console.log(data);
          });
          break;
        }
        case 3:
        {
          topservice.hardmode()
          .then(function(data)
          {
              $scope.data=data;
              console.log(data);
          });
          break;
        }
      }


       $scope.user="";

       $scope.user="";   

       $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum)
    {
      startP=1;
      return $scope.tab === tabNum;
    };

    /*
    $scope.getEasy=funcion ()
    {
      topservice.easymode()
          .then(function(data)
          {
              $scope.data=data;
              console.log(data);
          });
          break;
    }*/

}]);

