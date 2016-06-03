angular.module('myApp')
    .controller('imagesControler', ['Upload','$scope','$location','$window','imageService', function(Upload,$scope,$location,$window,imageService) {


        imageService.imageProvider()
            .then(function(data){
                //console.log(data);
                //document.getElementById('img').setAttribute( 'src','data:image/png;base64,'+ data.ceva );
                $scope.images=data.ceva;
                //console.log(data[0].split('.').pop());
                //console.log(data); test CLOB
            },function() {
                $location.path('/');
                alert(data.status);
            });

        $scope.submit=function() {
            if ($scope.up.file.$valid && $scope.file) { //check if from is valid
                Upload.upload({
                    url: 'http://localhost:3000/user/upload/images', //webAPI exposed to upload the file
                    data: {file: $scope.file} //pass file as data, should be user ng-model
                }).then(function(){
                        console.log('ar trebui sa schimbe');
                        $window.location.reload();
                        //$location.path('/user/images');
                    }, function(){
                        //$window.alert('An error occured');
                        console.log("error");
                    },function(evt){
                        //console.log(evt);
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                    })
            }
        }




}]);



