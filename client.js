var net = require('net');

var client = new net.Socket();
client.connect(3000, function() {

});

client.on('data', function(data) {
    if(data.toString().slice(0, -1) === 'CONNECT'){
      client.write('LOGIN pimpek ');
  }
    if(data.toString()[0] === 'S'){
      client.write('BEGIN N\n');
    }
		console.log(data.toString().slice(0, -1));

});
