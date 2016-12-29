var app = require('express')();
var http = require('http').Server(app);
//initialize a new instance of socket.io by passing the http 
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

// listen on connection event
io.on('connection', function(socket){
  console.log('a user connected');
  //Each socket also fires a special disconnect event:
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //we’ll send the message to everyone, including the sender.
 socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});