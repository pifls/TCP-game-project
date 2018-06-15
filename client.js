var net = require('net');

var client = new net.Socket();
client.connect(3000,'150.254.68.180', function() {

});

client.on('data', function(data) {

  if (data.toString().slice(0, -1) === 'CONNECT') {
    client.write('LOGIN plejer ');
  }
  if (data.toString()[0] === 'S' &&
     data.toString()[1] === 'T' &&
     data.toString()[2] === 'A' &&
     data.toString()[3] === 'R' &&
     data.toString()[4] === 'T') {
    client.write('BEGIN N\n');
  }

  console.log(data.toString().slice(0, -1));

});

client.on('error', function(ex) {
  client.destroy();
});
