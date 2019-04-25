

var express = require('express');
var app = express();
var io = require('socket.io')(server);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

var server = app.listen(process.env.PORT || 7777, listen);

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Get static files from public directory
app.use(express.static(__dirname + '/public'));

// Set default route to view index file
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/start', function(req, res) {
  res.render('pages/user');
});

var sio = io.listen(server);

var players = new Array();
var full = false;

io.sockets.on('connection', function(socket) {
  socket.on('join', function(data) {
    // 2 player limit
    if (players.length < 2) {
      var player = new Object();

      player.id = data.id;
      player.name = data.name;
      player.score = data.score;
      player.density = data.density;
      player.pos = 0;

      players.push(player);

      console.log('Player \'' + player.name + '\' has joined with ID: ' + player.id);

      socket.broadcast.emit('join', data);

      // Check if this is the second client
      if (players.length === 2) {
        player.pos = 1;

        // Send to opponent
        socket.broadcast.to(players[0].id).emit('full', player);
        
        // Send to current player
        socket.emit('full', players[0]);
      }
    } else {
      // Disconnect client
      socket.disconnect();
    }  
  });

  socket.on('full', function(data) {
    full = true;

    io.emit('full', data);
  });

  socket.on('paddleMove', function(data) {
    socket.broadcast.emit('paddleMove', data);
  });

  socket.on('ballMove', function(data) {
    socket.broadcast.emit('ballMove', data);
  });

  socket.on('scored', function(data) {
    // Add 1 to player score
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === data.id) {
        players[i].score = data.score;
        
        break;
      }
    }
    
    socket.broadcast.emit('scored', data);
  });

  socket.on('disconnect', function() {
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === socket.id) {
        console.log('\'' + players[i].name + '\' has disconnected');

        // Remove player from object
        players.splice(i, 1);

        break;
      }
    }

    socket.broadcast.emit('leave');
  });
});

console.log('Server started');
