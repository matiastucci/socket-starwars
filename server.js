var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);

var port  = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

  socket.on('join', function (code) {
    socket.join(code);
  });

  socket.on('lightsaber type', function (type) {
    io.emit('lightsaber type', type);
  });

  socket.on('tiltLR', function (tiltLR) {
    io.emit('tiltLR', tiltLR);
  });

  socket.on('tiltFB', function (tiltFB) {
    io.emit('tiltFB', tiltFB);
  });

  socket.on('dir', function (dir) {
    io.emit('dir', dir);
  });

  socket.on('toggle lightsaber', function () {
    io.emit('toggle lightsaber');
  });

});

server.listen(port, function(){
  console.log('listening on *:'+port);
});