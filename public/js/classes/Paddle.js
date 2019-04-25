
function Paddle(sketch, width, height, color, H, PAD) {

  this.height = height;
  this.width = width;
  this.color = color;

  this.pos = {
    x: 0,
    y: 0
  };

  this.speed = 0;


  this.setX = function(x) {
    this.pos.x = x;
  };

  this.setY = function(y) {
    this.pos.y = y;
  };

  this.setSpeed = function(speed) {
    this.speed = speed;
  };

  this.move = function(speed) {
    this.speed = speed;

    this.pos.y = this.pos.y + this.speed;

    socket.emit('paddleMove', {
      speed: this.speed,
      y: this.pos.y
    });
  };

  this.draw = function() {
    sketch.push();
    sketch.noStroke();
    sketch.fill(this.color);
    sketch.rect(this.pos.x, this.pos.y, this.width, this.height);
    sketch.pop();
  };
}