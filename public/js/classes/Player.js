

function Player(W, PAD) {
  this.name = name || '';
  this.score = 0;
  this.id;
  this.pos;
  this.s;

  this.setName = function(name) {
    this.name = name;
  };

  this.setId = function(id) {
    this.id = id;
  };

  this.setPos = function(pos) {
    this.pos = pos;
  };

  this.getScore = function() {
    return this.score.toString();
  };

  this.getName = function() {
    return this.name;
  };

  this.draw = function() {
    if (this.pos === 0) {

      // Draw opponent name
      this.s.textAlign(this.s.LEFT);
      this.s.text(this.name, PAD + 10, 30);
      this.s.textAlign(this.s.RIGHT);
      this.s.text(this.score.toString(), (W / 2), 30);
    } else {

      // Draw opponent name
      this.s.textAlign(this.s.RIGHT);
      this.s.text(this.name, W - PAD , 30);
      this.s.textAlign(this.s.LEFT);
      this.s.text(this.score.toString(), (W / 2) + 10, 30);
    }
  };

  this.scored = function() {
    this.score++;

    socket.emit('scored', {
      id: this.id,
      score: this.score
    });
  };
}