angular.module('lightsabers.controllers', [])

.controller('DashCtrl', function($scope,$state,Lightsaber,DeviceOrientation) {

  if(!Lightsaber.getCode() || !Lightsaber.getType()){
    $state.go('tab.config');
  }

  $scope.showFirefoxButton = function(){
    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if(is_firefox){
      return true;
    }
    return false;
  }

  $scope.toggle = function(){
      Lightsaber.toggle();
  }

  DeviceOrientation.addListener();

})

.controller('AboutCtrl', function($scope) {
  
})

.controller('ConfigCtrl', function($scope,$state,$stateParams,Lightsaber) {

  $scope.data = {};
  $scope.data.type = Lightsaber.getType();
  
  if($stateParams.code){
    $scope.data.code = $stateParams.code;
    Lightsaber.setCode($scope.data.code);
  }
  else{
    $scope.data.code = Lightsaber.getCode();
  }

  $scope.setType = function(type){
    if(type){
      Lightsaber.setType(type);
      $state.go('tab.dash');
    }
    else{
      alert('You have to choose a type');
    }
  }

});
