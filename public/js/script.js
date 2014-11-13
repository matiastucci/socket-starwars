var socket = io.connect('http://localhost:8080');
var tiltLR,tiltFB,dir,lightsaberType;

Reveal.addEventListener('sync', function() {
  if(!code){
    var code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    $('.code').html(code);
    socket.emit('join',{code: code});
  }
  if(lightsaberType){
    $('.slides').css('zoom','1');
  }
}, false );

function compileNewLightsaber(type){
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {type: type});
  $('.lightsaber').html(rendered);
}

function deviceOrientationHandler(tiltLR, tiltFB, dir) {
  var logo = document.getElementById("lightsaber");
  logo.style.webkitTransform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
  logo.style.MozTransform = "rotate("+ tiltLR +"deg)";
  logo.style.transform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
}

// Some other fun rotations to try...
//var rotation = "rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
//var rotation = "rotate("+ tiltLR +"deg) rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";

function toggleSaber(){
  socket.emit('toggle lightsaber');
}

socket.on('lightsaber type', function(type){
  $('.sync-text').hide();
  $('.controls').remove();
  lightsaberType = type;
  compileNewLightsaber(type);
  $('.slides').css('zoom','1');
});

socket.on('tiltLR', function(data){
  tiltLR = data;
  deviceOrientationHandler(tiltLR, tiltFB, dir);
});

socket.on('tiltFB', function(data){
  tiltFB = data;
  deviceOrientationHandler(tiltLR, tiltFB, dir);
});

socket.on('toggle lightsaber', function(){
  var checked = document.getElementById(lightsaberType).checked;
  document.getElementById(lightsaberType).checked = !checked;
});