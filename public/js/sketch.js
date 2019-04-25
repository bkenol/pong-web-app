
var sketch = function(s) {
  pong.init(s);

  s.setup = function() {
    pong.setup();

    socket.on('full', function(data) {
      pong.join(data);
    });

    socket.on('scored', function(data) {
      pong.opponent.score = data.score;
      pong.reset();
    });

    socket.on('paddleMove', function(data) {
      pong.oPaddle.setSpeed(data.speed);
      pong.oPaddle.setY(data.y);
    });

    socket.on('ballMove', function(data) {
      pong.ball.setPos(data.pos);
      pong.ball.setSpeedX(data.speed.x);
      pong.ball.setSpeedY(data.speed.y);
    });

    socket.on('leave', function() {
      pong.twoPlayers = false;
    });
  };

  s.draw = function() {
    pong.draw();
  };

  s.keyPressed = function() {
    // Pressing the up arrow
    if (s.keyCode === s.UP_ARROW) {
      // Move the paddle up
      pong.mPaddle.move(pong.PADDLE_SPEED * -1);
    } else if (s.keyCode === s.DOWN_ARROW) {
      pong.mPaddle.move(pong.PADDLE_SPEED);
    }
    return false;
  };

  s.keyReleased = function() {
    if (s.keyCode === s.UP_ARROW || s.keyCode === s.DOWN_ARROW) {
      // Stop moving the paddle
      pong.mPaddle.move(0);
    }

    return false;
  };  
};