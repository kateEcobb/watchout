var Enemy = function(id){
  this.id = id;
  this._x = randomXCoordinate();
  this._y = randomYCoordinate();
  this.path = "doge.png"
  this.changeLocation();
}

Enemy.prototype.getCoordinates = function(){
  return [this._x,this._y];
};

Enemy.prototype.changeLocation = function(){
  var context = this;
  setTimeout(function(){context.changeLocation()}, 1000);
  context._x = randomXCoordinate();
  context._y = randomYCoordinate();
}