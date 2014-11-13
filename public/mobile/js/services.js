angular.module('lightsabers.services', [])

.factory('mySocket', function (socketFactory) {
  var baseUrl = 'https://socket-transform.herokuapp.com:443';
  // var baseUrl = 'http://10.208.32.147:8080';

  var myIoSocket = io.connect(baseUrl);

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})

.factory('Lightsaber', function(mySocket) {

  var type = 'yoda',code;

  return {
    getCode: function(){
      return code;
    },
    setCode: function(newCode){
      code = newCode.toLowerCase();
      mySocket.emit('join',{code: code});
    },
    toggle: function() {
      mySocket.emit('toggle lightsaber');
    },
    setType: function(newType){
      type = newType;
      mySocket.emit('lightsaber type',newType);
    },
    getType: function(){
      return type;
    },
    isFirefox: function(){
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }
  }

})

.factory('DeviceOrientation', function(mySocket, Lightsaber) {

  return {
    addListener: function() {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(eventData) {
            if(!eventData.gamma && !Lightsaber.isFirefox()){
              alert('You probably need to update your browser. Or try Firefox.');
            }
            else{
              mySocket.emit('tiltLR', eventData.gamma);
              mySocket.emit('tiltFB', eventData.beta);
            }
          }, false);
      }
      else{
        alert("Not supported on your device or browser.  Sorry.");
      }
    }
  }

});
