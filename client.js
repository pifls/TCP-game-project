var net = require('net');

var client = new net.Socket();
client.connect(3000, function() {
	console.log('Connected');
});

client.on('data', function(data) {
    if(data.toString().slice(0, -1) === 'CONNECT'){
      client.write('LOGIN pimpek ');
  }
    if(data.toString()[0] === 'P'){
      client.write('BEGIN N');
    }

});
