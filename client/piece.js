var Piece = function(path){
  this._x = 0;
  this._y =0;
  this._r = 5; 
  this.fill = 'blue';
  this.stroke = 'red';
  this.strokeWidth="2";
  
  this.path = path;
  this.pieceElement = null;
  this.startingPos = [0,0];
}

Piece.prototype.setCoordinates = function(coordinateArr){

  var minX = gameOptions.padding;
  var maxX = gameOptions.width - gameOptions.padding;

  var minY = gameOptions.padding;
  var maxY = gameOptions.height - gameOptions.padding;
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
  this.pieceElement = gameBoard.append('svg:path')
            .attr('d', this.path)
            .attr('fill', this.fill)
            .attr('stroke', this.stroke)
            .attr('stroke-width', this.strokeWidth);

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