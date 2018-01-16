angular.module("App").controller("formControll",formControll);
function formControll($scope,myFactory){
    $scope.myFactory= myFactory;
    console.log(myFactory.name)


}