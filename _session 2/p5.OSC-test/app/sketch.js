let socket;

function setup() {
	createCanvas(500, 500);
	setupOsc(12000, 8000);

  setInterval(() => {
    sendOsc("/test", 0.07);
  }, 500);
}

function draw() {
	background(250);
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
  console.log(msg);
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
