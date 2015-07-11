var Enemy = function(){
  Piece.call(this);
  this.path = "http://pre10.deviantart.net/2783/th/pre/f/2014/028/0/f/doge_vector_by_falloutgirl9001-d74335n.png"
  this.flyTime = 1600;
  this._x = Math.random() * gameOptions.width;
  this._y = Math.random() * gameOptions.height;
  this.render();
}

Enemy.prototype = Object.create(Piece.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.render = function(){

  this.pieceElement = gameBoard.append('svg:image')
    .attr("xlink:href", this.path)
    .attr("height", "24.5")
    .attr("width", "23")
    .attr('class', 'doge');
    // .attr("x", "0")
    // .attr("y", "0");
  this.transform();
}

Enemy.prototype.fly = function(){

  // Pick a random spot on the gameboard
  // Transition to that spot over 2 seconds.
  var randomX = Math.random() * gameOptions.width;
  var randomY = Math.random() * gameOptions.height;

  this.transform([randomX, randomY], this.flyTime)
}