const { createServer } = require('net');
const server = createServer();

let players = [];
let id = 1;
let check = false;
let check1 = 0;
let check2 = false;
let check3 = false;
let check4 = false;
let beginCheck = 0;
var x = false;
var y = false;
var k = false;

let score = 3;

board = new Array(5)
for (i = 0; i < 5; i++) {
  board[i] = new Array(5)
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    board[i][j] = 0;
  }
}

server.on('connection', (socket) => {
  socket.logged = false;
  socket.id = id;
  id++;

  socket.write("CONNECT\n");

  socket.on('data', data => {




    if ((checkBegin(data) === 'S' ||
        checkBegin(data) === 'N' ||
        checkBegin(data) === 'W' ||
        checkBegin(data) === 'E') &&
      check === true &&
      check1 !== 2 &&
      socket.logged === true) {
      socket.head = checkBegin(data);
      socket.write('OK\n');
      check1++;
      socket.begin = true;
    } else {
      if (socket.logged === true && check1 !== 2 && check2 === false) {
        socket.write('ERROR2\n');
      }
    }

    if (checkLogin(data) !== ' ' && socket.logged === false) {
      players.push(socket);
      socket.login = checkLogin(data);
      socket.write('OK\n');
      socket.logged = true;
      socket.game = false;
      socket.moveMade = false;
      socket.direction = 'S';
      socket.begin = false;
      socket.isPlaying = true;
      socket.check5 = false;
      socket.x = false;
      socket.points = 0;

      socket.y = false;
      socket.lost = false;

      socket.score = 0;

      // MAX ILOŚĆ GRACZY
      server.maxConnections = 2;
    } else {
      if (socket.logged === false) {
        socket.write('ERROR1\n');
      }
    }

    if (players.length === 2 && check === false) {
      for (var i = 0; i < players.length; i++) {
        players[i].write(`START ${players[i].login}\n`);

        let x = getRandomInt(5);
        let y = getRandomInt(5);

        while (board[x][y] !== 0) {
          let x = getRandomInt(5);
          let y = getRandomInt(5);
        }
        board[x][y] = players[i].id;
        players[i].xPos = x;
        players[i].yPos = y;
        beginCheck++;
      }
      check = true;

      for (var i = 0; i < players.length; i++) {
        players[i].write(`PLAYERS\n`);
        for (let j = 0; j < 2; j++) {
          players[i].write(`${players[j].login}. ${getCO(board, players[j])}\n`);
        }
      }
    }

    if (beginCheck === 2 && check1 === 2) {
      check2 = true;
      for (let i = 0; i < players.length; i++) {

        if (players[i].game === false) {
          players[i].write('GAME\n');
          players[i].game = true;
        }
        if (players[i].x === false) {
          players[i].setTimeout(1000);
          players[i].on('timeout', () => {

            if(players[i].check5 === true){
            switch (players[i].head) {
              case 'N':
                switch (players[i].direction) {
                  case 'S':
                    if (players[i].xPos - 1 >= 0 && board[players[i].xPos - 1][players[i].yPos] === 0 ) {
                      board[players[i].xPos - 1][players[i].yPos] = players[i].id;
                      players[i].xPos--;
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;

                    }
                    break;
                  case 'L':
                    if (players[i].yPos - 1 >= 0 && board[players[i].xPos][players[i].yPos - 1] === 0 ) {
                      board[players[i].xPos][players[i].yPos - 1] = players[i].id;
                      players[i].yPos--;
                      players[i].head = 'W';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'R':
                    if (players[i].yPos + 1 <= 4 && board[players[i].xPos][players[i].yPos + 1] === 0) {
                      board[players[i].xPos][players[i].yPos + 1] = players[i].id;
                      players[i].yPos++;
                      players[i].head = 'E';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                }
                break;
              case 'S':
                switch (players[i].direction) {
                  case 'S':
                    if (players[i].xPos + 1 <= 4 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                      board[players[i].xPos + 1][players[i].yPos] = players[i].id;
                      players[i].xPos++;
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'L':
                    if (players[i].yPos + 1 <= 4 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                      board[players[i].xPos][players[i].yPos + 1] = players[i].id;
                      players[i].yPos++;
                      players[i].head = 'E';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'R':
                    if (players[i].yPos - 1 >= 0 && board[players[i].xPos][players[i].yPos - 1] === 0) {
                      board[players[i].xPos][players[i].yPos - 1] = players[i].id;
                      players[i].yPos--;
                      players[i].head = 'W';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                }
                break;
              case 'W':
                switch (players[i].direction) {
                  case 'S':
                    if (players[i].yPos - 1 >= 0 && board[players[i].xPos][players[i].yPos - 1] === 0) {
                      board[players[i].xPos][players[i].yPos - 1] = players[i].id;
                      players[i].yPos--;
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'L':
                    if (players[i].xPos + 1 <= 4 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                      board[players[i].xPos + 1][players[i].yPos] = players[i].id;
                      players[i].xPos++;
                      players[i].head = 'S';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'R':
                    if (players[i].xPos - 1 >= 0 && board[players[i].xPos - 1][players[i].yPos] === 0) {
                      board[players[i].xPos - 1][players[i].yPos] = players[i].id;
                      players[i].xPos--;
                      players[i].head = 'N';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                }
                break;
              case 'E':
                switch (players[i].direction) {
                  case 'S':
                    if (players[i].yPos + 1 <= 4 && board[players[i].xPos][players[i].yPos + 1] === 0) {
                      board[players[i].xPos][players[i].yPos + 1] = players[i].id;
                      players[i].yPos++;
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'L':
                    if (players[i].xPos - 1 >= 0 && board[players[i].xPos - 1][players[i].yPos] === 0) {
                      board[players[i].xPos - 1][players[i].yPos] = players[i].id;
                      players[i].xPos++;
                      players[i].head = 'N';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                  case 'R':
                    if (players[i].xPos + 1 <= 4 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                      board[players[i].xPos + 1][players[i].yPos] = players[i].id;
                       players[i].xPos++;
                      players[i].head = 'S';
                    } else {
                      players[i].isPlaying = false;
                      score--;
                      players[i].score = score;
                    }
                    break;
                }
                break;
            }
          }

         if(i === 1){
            for (let i = 0; i < players.length; i++) {
                if(players[i].isPlaying === true){
                players[i].write(`${board.join('\n')}\n\n`);
              } else{
                if(players[i].lost === false){
                  if(players[i].score < 2) {
                    if(k === false){
                    players[i].write(`WIN\n`);
                    k = true;
                  }
                  } else {
                players[i].write(`LOST ${players[i].score}\n`);
                players[i].lost = true;
              }
              }
              }
            }
          } else {

            if(players[i].isPlaying === true){
            players[i].write(`${board.join('\n')}\n\n`);
          } else{
            if(players[i].lost === false){
              if(players[i].score < 2) {
                if(k === false){
                players[i].write(`WIN\n`);
                k = true;
              }
              } else {
            players[i].write(`LOST ${players[i].score}\n`);
            players[i].lost = true;
          }
          }
          }



          }

         if(players[i].isPlaying === true){
          //  players[i].write(`${board.join('\n')}\n\n`);
            players[i].moveMade = false;
            players[i].x = true;
            players[i].direction = 'S';
            players[i].check5 = true;
         }



          });
        }

      }

      if (((checkMove(data) === 'L' ||
          checkMove(data) === 'S' ||
          checkMove(data) === 'R') &&
        socket.moveMade === false)) {
        socket.direction = checkMove(data);
        socket.write('OK\n');
        socket.moveMade = true;
      } else {
        if(socket.begin === true){
          socket.begin = false;
        } else {
        socket.write('ERROR3\n');
      }
      }
    }


  })
});

server.listen(3000);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function checkLogin(d) {

  if (d[0] == 76 &&
    d[1] == 79 &&
    d[2] == 71 &&
    d[3] == 73 &&
    d[4] == 78 &&
    d[5] == 32) {

    let output = d.toString().substr(6).slice(0, -1).trim();
    return output;
  } else {
    return ' ';
  }
}

function checkBegin(d) {

  if (d[0] == 66 &&
    d[1] == 69 &&
    d[2] == 71 &&
    d[3] == 73 &&
    d[4] == 78 &&
    d[5] == 32) {

    let output = d.toString().substr(6).slice(0, -1).trim();
    return output;
  } else {
    return ' ';
  }
}

function checkMove(d) {

  if (d[0] == 77 &&
    d[1] == 79 &&
    d[2] == 86 &&
    d[3] == 69 &&
    d[4] == 32) {

    let output = d.toString().substr(5).slice(0, -1).trim();
    return output;
  } else {
    return ' ';
  }
}

function getCO(a, s) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (a[i][j] === s.id) {
        return `${j + 1} ${i + 1}`;
      }
    }
  }
}
