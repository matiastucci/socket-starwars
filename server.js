var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);

var port  = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

  var code;

  socket.on('join', function (data) {
    code = data.code;
    socket.join(code); // We are using room of socket io
  });

  socket.on('lightsaber type', function (type) {
    socket.in(code).emit('lightsaber type', type);
  });

  socket.on('tiltLR', function (tiltLR) {
    socket.in(code).emit('tiltLR', tiltLR);
  });

  socket.on('tiltFB', function (tiltFB) {
    socket.in(code).emit('tiltFB', tiltFB);
  });

  socket.on('toggle lightsaber', function () {
    socket.in(code).emit('toggle lightsaber');
  });

});

server.listen(port, function(){
  console.log('listening on *:'+port);
});