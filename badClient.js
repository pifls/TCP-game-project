var net = require('net');

var client = new net.Socket();
client.connect(3000, function() {

});

client.on('data', function(data) {

    if(data.toString().slice(0, -1) === 'CONNECT'){
      client.write('LOGIN pimpek ');

      while(true){
        client.write(client);
      }
  }



    console.log(data.toString().slice(0, -1));

});

client.on('error', function(ex) {
  client.destroy();
});
