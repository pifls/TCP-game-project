var net = require('net');

var client = new net.Socket();
client.connect(3000, function() {

});

client.on('data', function(data) {

    console.log(data.toString().slice(0, -1));

    if(data.toString().slice(0, -1) === 'CONNECT'){
      client.write('LOGIN pimpek ');
  }
    if(data.toString()[0] === 'S' &&
       data.toString()[1] === 'T' &&
       data.toString()[2] === 'A' &&
       data.toString()[3] === 'R' &&
       data.toString()[4] === 'T'){
      client.write('BEGIN N\n');
    }

});
