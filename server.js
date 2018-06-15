const {
  createServer
} = require('net');
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
var d = false;
var p = 0;

let score = 6;

let final1;
let final2;
let final3;
let final4;
let final5;

board = new Array(50)
for (i = 0; i < 50; i++) {
  board[i] = new Array(50)
}

for (let i = 0; i < 50; i++) {
  for (let j = 0; j < 50; j++) {
    board[i][j] = 0;
  }
}


server.on('connection', (socket) => {


  server.on('error', () => {
    socket.destroy();
});


  socket.logged = false;
  socket.id = id;
  id++;

  socket.write("CONNECT\n");

  socket.on('data', data => {

    if (socket.badMessage === 100) {
      socket.destroy();
    }





    if ((checkBegin(data) === 'S' ||
        checkBegin(data) === 'N' ||
        checkBegin(data) === 'W' ||
        checkBegin(data) === 'E') &&
      check === true &&
      check1 !== 5 &&
      socket.logged === true) {
      socket.head = checkBegin(data);
      socket.write('OK\n');
      check1++;
      socket.begin = true;
    } else {
      if (socket.logged === true && check1 !== 5 && check2 === false) {
        socket.badMessage++;
        socket.write('ERROR\n');
      }
    }

    if (checkLogin(data) !== ' ' && socket.logged === false) {
      players.push(socket);
      socket.login = checkLogin(data);
      socket.write('OK\n');
      socket.logged = true;
      socket.badMessage = 0;
      socket.game = false;
      socket.moveMade = false;
      socket.direction = 'S';
      socket.begin = false;
      socket.isPlaying = true;
      socket.check5 = false;
      socket.x = false;
      socket.points = 0;
      socket.d === true

      socket.y = false;
      socket.lost = false;

      socket.score = 0;
      socket.k = false;
      socket.final = 0;

      // MAX ILOŚĆ GRACZY
      server.maxConnections = 5;
    } else {
      if (socket.logged === false) {
        socket.badMessage++;
        socket.write('ERROR\n');
      }
    }

    if (players.length === 5 && check === false) {
      for (var i = 0; i < players.length; i++) {
        players[i].write(`START ${players[i].login}\n`);

        let x = getRandomInt(50);
        let y = getRandomInt(50);

        while (board[x][y] !== 0) {
          let x = getRandomInt(50);
          let y = getRandomInt(50);
        }
        board[x][y] = players[i].id;
        players[i].xPos = x;
        players[i].yPos = y;
        beginCheck++;
      }
      check = true;

      for (var i = 0; i < players.length; i++) {
        players[i].write(`PLAYERS\n`);
        for (let j = 0; j < 5; j++) {
          players[i].write(`${players[j].login}. ${getCO(board, players[j])}\n`);
        }
      }
    }

    if (beginCheck === 5 && check1 === 5) {
      check2 = true;


      for (let i = 0; i < players.length; i++) {

        if (players[i].game === false) {
          players[i].write('GAME\n');
          players[i].game = true;
        }
        if (players[i].x === false) {
          players[i].setTimeout(100);
          players[i].on('timeout', () => {

            if (players[i].check5 === true) {
              switch (players[i].head) {
                case 'N':
                  switch (players[i].direction) {
                    case 'S':
                      if (players[i].xPos - 1 >= 0 && board[players[i].xPos - 1][players[i].yPos] === 0) {
                        board[players[i].xPos - 1][players[i].yPos] = players[i].id;
                        players[i].xPos--;
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                    case 'L':
                      if (players[i].yPos - 1 >= 0 && board[players[i].xPos][players[i].yPos - 1] === 0) {
                        board[players[i].xPos][players[i].yPos - 1] = players[i].id;
                        players[i].yPos--;
                        players[i].head = 'W';
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                    case 'R':
                      if (players[i].yPos + 1 <= 49 && board[players[i].xPos][players[i].yPos + 1] === 0) {
                        board[players[i].xPos][players[i].yPos + 1] = players[i].id;
                        players[i].yPos++;
                        players[i].head = 'E';
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                  }
                  break;
                case 'S':
                  switch (players[i].direction) {
                    case 'S':
                      if (players[i].xPos + 1 <= 49 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                        board[players[i].xPos + 1][players[i].yPos] = players[i].id;
                        players[i].xPos++;
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                    case 'L':
                      if (players[i].yPos + 1 <= 49 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                        board[players[i].xPos][players[i].yPos + 1] = players[i].id;
                        players[i].yPos++;
                        players[i].head = 'E';
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                    case 'R':
                      if (players[i].yPos - 1 >= 0 && board[players[i].xPos][players[i].yPos - 1] === 0) {
                        board[players[i].xPos][players[i].yPos - 1] = players[i].id;
                        players[i].yPos--;
                        players[i].head = 'W';
                      } else {
                        players[i].isPlaying = false;
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
                      }
                      break;
                    case 'L':
                      if (players[i].xPos + 1 <= 49 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                        board[players[i].xPos + 1][players[i].yPos] = players[i].id;
                        players[i].xPos++;
                        players[i].head = 'S';
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                    case 'R':
                      if (players[i].xPos - 1 >= 0 && board[players[i].xPos - 1][players[i].yPos] === 0) {
                        board[players[i].xPos - 1][players[i].yPos] = players[i].id;
                        players[i].xPos--;
                        players[i].head = 'N';
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                  }
                  break;
                case 'E':
                  switch (players[i].direction) {
                    case 'S':
                      if (players[i].yPos + 1 <= 49 && board[players[i].xPos][players[i].yPos + 1] === 0) {
                        board[players[i].xPos][players[i].yPos + 1] = players[i].id;
                        players[i].yPos++;
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                    case 'L':
                      if (players[i].xPos - 1 >= 0 && board[players[i].xPos - 1][players[i].yPos] === 0) {
                        board[players[i].xPos - 1][players[i].yPos] = players[i].id;
                        players[i].xPos++;
                        players[i].head = 'N';
                      } else {
                        players[i].isPlaying = false;

                      }
                      break;
                    case 'R':
                      if (players[i].xPos + 1 <= 49 && board[players[i].xPos + 1][players[i].yPos] === 0) {
                        board[players[i].xPos + 1][players[i].yPos] = players[i].id;
                        players[i].xPos++;
                        players[i].head = 'S';
                      } else {
                        players[i].isPlaying = false;
                      }
                      break;
                  }
                  break;
              }
            }



            /*
                        if (i === 4) {
                          for (let i = 0; i < players.length; i++) {
                            if (players[i].isPlaying === true) {
                              players[i].write(`${board.join('\n')}\n\n`);
                              players[i].write(`${players[i].score}\n`)
                            } else {
                              if (players[i].lost === false) {
                                if (players[i].score === 1) {
                                  if (k === false) {
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

                          if (players[i].isPlaying === true) {
                            //  players[i].write(`${board.join('\n')}\n\n`);
                          } else {
                            if (players[i].lost === false) {
                              if (players[i].score === 1) {
                                if (k === false) {
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
            */


            if (players[i].isPlaying === false) {
              score--;
              players[i].score = score;
            }

            if (players[i].isPlaying === true) {
              players[i].write(`${board.join('\n')}\n\n`);
              players[i].moveMade = false;
              players[i].x = true;
              players[i].direction = 'S';
              players[i].check5 = true;
            } else {
              if (players[i].k === false) {
                if (players[i].score > 3) {
                  players[i].write(`LOST 5\n`);
                  final5 = players[i].login;
                  p++;
                }
                if (players[i].score === 3 || players[i].score === 2) {
                  players[i].write(`LOST 4\n`);
                  final4 = players[i].login;
                  p++;
                }
                if (players[i].score === 1 || players[i].score === 0) {
                  players[i].write(`LOST 3\n`);
                  final3 = players[i].login;
                  p++;
                }
                if (players[i].score === -1 || players[i].score === -2) {
                  players[i].write(`LOST 2\n`);
                  final2 = players[i].login;
                  p++;
                }
                if (players[i].score < -1) {
                  players[i].write(`WIN\n`);
                  final1 = players[i].login;
                  p++;
                }

                if (p === 5) {
                  for (let i = 0; i < players.length; i++) {
                    players[i].write(`KONIEC ${final1} ${final2} ${final3} ${final4} ${final5}\n`);
                    players[i].destroy();
                  }
                }

                players[i].k = true;
              }

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
        if (socket.begin === true) {
          socket.begin = false;
        } else {
          socket.badMessage++;
          socket.write('ERROR\n');
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
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      if (a[i][j] === s.id) {
        return `${j + 1} ${i + 1}`;
      }
    }
  }
}
