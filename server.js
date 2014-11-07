var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);

var port  = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.send('welcome to the socket-move server');
});

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

http.listen(port, function(){
  console.log('listening on *:'+port);
});