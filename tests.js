/*
if(typeof socket.login === 'string'){
  players.push(socket);
  console.log('OK');

  if(players.length == 2){
    for(let i = 0; i < players.length; i++){
      players[i].write(`PLAYER ${players[i].login}\n`);

      let x = getRandomInt(50);
      let y = getRandomInt(50);

      players[i].write(x + ', ' + y);
    }
  }
} else{
  socket.destroy();
  console.log('ERROR');
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



server.on('connection', (socket) => {

    socket.setTimeout(1000);
    socket.on('timeout', () => {
    socket.write(`BOARD\n`);
  });






  if(socket.login === ''){
    if(data === '\n'){
      console.log('ERROR');
      socket.destroy();
    } else {
    socket.login = data;
    players.push(socket);
    console.log('OK');
  }
  }
    if(players.length == 2){
      for(let i = 0; i < players.length; i++){
        players[i].write(`START ${players[i].login}\n`);

        let x = getRandomInt(5);
        let y = getRandomInt(5);
        board[x][y] = players[i].id;

        players[i].write(`PLAYERS\n${board}\n`);

      }
    }
