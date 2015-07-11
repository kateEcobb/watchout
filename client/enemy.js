var Enemy = function(id){
  this.id = id;
  this._x = randomXCoordinate();
  this._y = randomYCoordinate();
  this.path = "http://pre10.deviantart.net/2783/th/pre/f/2014/028/0/f/doge_vector_by_falloutgirl9001-d74335n.png"
  this.changeLocation();
}

Enemy.prototype.changeLocation = function(){
  var context = this;
  setTimeout(function(){context.changeLocation()}, 2000);
  context._x = randomXCoordinate();
  context._y = randomYCoordinate();
}