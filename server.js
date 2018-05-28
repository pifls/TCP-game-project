const { createServer } = require('net');
const server = createServer();

let players = [];
let id = 1;

board = new Array(5)
for (i=0; i < 5; i++) {
   board[i] = new Array(5)
 }

for(let i=0; i < 5; i++){
  for(let j=0; j < 5; j++){
    board[i][j] = 0;
  }
}

// MAX ILOŚĆ GRACZY
server.maxConnections = 2;

server.on('connection', (socket) => {
  socket.logged = false;
  socket.id = id;
  id++;

  socket.write("CONNECT\n");

  socket.on('data', data => {

    if(checkLogin(data) !== ' ' && socket.logged === false){
      socket.login = checkLogin(data);
      socket.write('OK');
      socket.logged = true;
    } else{
      socket.write('ERROR\n');
    }

})
});

server.listen(3000);


function checkLogin(d){

  if(d[0] == 76 &&
     d[1] == 79 &&
     d[2] == 71 &&
     d[3] == 73 &&
     d[4] == 78 &&
     d[5] == 32   ){

       let login = d.toString().substr(6).slice(0, -1).trim();
       return login;
     } else{
       return ' ';
     }

}
