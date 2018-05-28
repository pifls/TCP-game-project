const { createServer } = require('net');
const server = createServer();

let players = [];
let id = 1;
let check = false;
let check1 = false;
let beginCheck = 0;

board = new Array(5)
for (i=0; i < 5; i++) {
   board[i] = new Array(5)
 }

for(let i=0; i < 5; i++){
  for(let j=0; j < 5; j++){
    board[i][j] = 0;
  }
}

server.on('connection', (socket) => {
  socket.logged = false;
  socket.id = id;
  id++;

  socket.write("CONNECT\n");

  socket.on('data', data => {


    if((checkBegin(data) === 'S' ||
        checkBegin(data) === 'N' ||
        checkBegin(data) === 'W' ||
        checkBegin(data) === 'E') &&
        check  === true &&
        check1 === false &&
        socket.logged === true){
          socket.firstMove = checkBegin(data);
          socket.write('OK\n');
          check1 = true;
        } else{
          if(socket.logged === true && check1 === false){
          socket.write('ERROR\n');
        }
        }

    if(checkLogin(data) !== ' ' && socket.logged === false){
      players.push(socket);
      socket.login = checkLogin(data);
      socket.write('OK\n');
      socket.logged = true;

      // MAX ILOŚĆ GRACZY
      server.maxConnections = 2;
    } else{
      if(socket.logged === false){
      socket.write('ERROR\n');
    }
    }

    if(players.length === 2 && check === false){
      for(var i = 0; i < players.length; i++){
        players[i].write(`START ${players[i].login}\n`);

        let x = getRandomInt(5);
        let y = getRandomInt(5);

        while(board[x][y] !== 0){
          let x = getRandomInt(5);
          let y = getRandomInt(5);
        }
        board[x][y] = players[i].id;
        beginCheck++;
    }
    check = true;

    for(var i = 0; i < players.length; i++){
    players[i].write(`PLAYERS\n`);
    for(let j=0; j < 2; j++){
      players[i].write(`${players[j].login}. ${getCO(board, players[j])}\n`);
    }
  }
}

      if(beginCheck === 2){
        socket.write('GAME\n');

        socket.setTimeout(100);
        socket.on('timeout', () => {
          socket.write(`${board.join("\n")}\n\n`);
      })
      }


})
});

server.listen(3000);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


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
function checkBegin(d){

  if(d[0] == 66 &&
     d[1] == 69 &&
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

function getCO(a, s){
  for(let i=0; i < 5; i++){
    for(let j=0; j < 5; j++){
      if(a[i][j] === s.id){
        return `${i + 1} ${j + 1}`;
      }
      }
    }
  }
