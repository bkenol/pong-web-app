var pong = new Game();

var io = io();

var socket = io.connect('localhost:7777');

// Catch start button click event
document.getElementById('player-name-submit').addEventListener('click', function(e) {

  e.preventDefault();
  
  // Set player name to input box value
  pong.player.name = document.getElementById('player-name-input').value.trim();

  if (pong.player.name.length > 0) {
    this.parentNode.parentNode.className += ' hidden';
    document.getElementById("canvas-container").style.display = "block";

    join();
  } else {
    document.getElementById('name-error').innerText = 'Please enter your name.';
  }
  
});

var join = function() {
  pong.player.setId(socket.io.engine.id);
  pong.player.setPos(0);

  socket.emit('join', pong.player);

  // Start the sketch
  var play = new p5(sketch, 'canvas-container');
};
