var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// set up socket.io connection
io.on('connection', function(socket){
  // detect when a user connects
  console.log('a user connected');

  // detect when a user disconnects
  socket.on('disconnect', function(){
    console.log('user disconnected');

    // send disconnect message to GUI
    io.emit('disconnect message', "disconnected");
  });

  // detect control data from GUI
  socket.on('direction message', function(msg){
    // send data to bot
    io.emit('display direction', {direction: msg});
  });

  // detect direction/orientation data from bot
  socket.on('chat message', function(msg){
    //send data to GUI
    io.emit('display message', msg);
  });
});

// listen on localhost:3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
