var Piece = function(path){
  this._x = 0;
  this._y =0;
  this._r = 5; 
  
  this.path = path;
  this.pieceElement = null;
  this.startingPos = [0,0];
}

Piece.prototype.setCoordinates = function(coordinateArr){

  var minX = 0;
  var maxX = gameOptions.width - 30;

  var minY = 0;
  var maxY = gameOptions.height - 50;
  //debugger;
  if(coordinateArr[0] <= minX){
    this._x = minX;
  } else if(coordinateArr[0] >= maxX){
    this._x = maxX;
  } else {
    this._x = coordinateArr[0];
  }

  if(coordinateArr[1] <= minY){
    this._y = minY;
  } else if(coordinateArr[1] >= maxY){
    this._y = maxY;
  } else {
    this._y = coordinateArr[1];
  }
  
};

Piece.prototype.getCoordinates = function(){
  return [this._x, this._y];
}

Piece.prototype.render = function(){ 
  this.pieceElement = gameBoard.append('svg:image')
            .attr("xlink:href", this.path)
            .attr("height", "50")
            .attr("width", "30")

  this.transform(this.startingPos);
};

Piece.prototype.transform = function(optionalCoordArray, duration){
  if(optionalCoordArray){ 
    this.setCoordinates(optionalCoordArray)
  }
  if(!duration){
    duration = 0;
  }
  this.pieceElement
  .transition().duration(duration)
  .attr("transform", "translate("+ this._x + ","+ this._y+")");
};

Piece.prototype.moveRelative = function(dArray){ 
  var currentCoords = this.getCoordinates();
  var newCoords = [dArray[0] + currentCoords[0], dArray[1] + currentCoords[1]];
  this.transform(newCoords);
};