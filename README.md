# Lightsaber Controller

Transforming a [Scoth.io lightsaber](http://scotch.io/demos/pure-css3-star-wars-lightsaber-checkboxes) using CSS3, [HTML5 device orientation](http://www.html5rocks.com/en/tutorials/device/orientation), Node.js and [Socket.IO](http://socket.io)

[YouTube example](http://youtu.be/a1m8bfO54TQ)

## How to use

```
$ git clone https://github.com/matiastucci/socket-starwars
$ cd socket-starwars
$ npm install
$ node server.js
```

Next, you have to change the `baseUrl` variable in `socket-starwars/public/desktop/script.js` and `socket-starwars/public/mobile/js/services.js` with your IP address if you want to access this from your smartphone.

Then, point your browser to `http://localhost:8080`

## Libraries in use
### Desktop

* [reveal.js](http://lab.hakim.se/reveal-js)
* [mustache.js](https://github.com/janl/mustache.js)
* [QRCode.js](http://davidshimjs.github.io/qrcodejs)
* [Socket.IO](http://socket.io)

### Mobile

* [Ionic](http://ionicframework.com)
* [angular-socket-io](https://github.com/btford/angular-socket-io)

Cool project! 