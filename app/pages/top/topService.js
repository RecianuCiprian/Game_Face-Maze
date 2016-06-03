angular.module('myApp').service('topservice', ['$q','$timeout','$http',function($q,$timeout,$http){

return({
  easymode:easymode,
  mediummode:mediummode,
  hardmode:hardmode
});

/*procesez detaliile generale */
function easymode(startP,numberR)
{
  var deffered=$q.defer(); //q = promise // asteapta raspunsul in fuctie de timeout
  

  $http.post('/zeasytop', { start: startP, number: numberR } )
  .success(function(data,status)
  {
    if(status === 200 && data)
    {
      deffered.resolve(data); // a fost acceptat promis
    } 
    else 
    {
        deffered.reject();
    }
  })
  .error(function(data)
  {
      deffered.reject();
  });

  return deffered.promise;
}

function mediummode()
{
  var deffered=$q.defer(); //q = promise // asteapta raspunsul in fuctie de timeout

  $http.get('/mediutop')
  .success(function(data,status)
  {
    if(status === 200 && data)
    {
      deffered.resolve(data); // a fost acceptat promis
    } 
    else 
    {
        deffered.reject();
    }
  })
  .error(function(data)
  {
      deffered.reject();
  });

  return deffered.promise;
}

function hardmode()
{
  var deffered=$q.defer(); //q = promise // asteapta raspunsul in fuctie de timeout

  $http.get('/hardtop')
  .success(function(data,status)
  {
    if(status === 200 && data)
    {
      deffered.resolve(data); // a fost acceptat promis
    } 
    else 
    {
        deffered.reject();
    }
  })
  .error(function(data)
  {
      deffered.reject();
  });

  return deffered.promise;
}

}]);


