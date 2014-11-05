var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);

var port  = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.send('welcome to the socket-move server');
});

io.on('connection', function (socket) {

  socket.on('tiltLR', function (data) {
    io.emit('tiltLR', data);
  });

  socket.on('tiltFB', function (data) {
    io.emit('tiltFB', data);
  });

  socket.on('dir', function (data) {
    io.emit('dir', data);
  });

  socket.on('toggle lightsable', function () {
    io.emit('toggle lightsable');
  });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});