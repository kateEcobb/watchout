var Player = function(){
  this.path = "m2.5,40.5l10.12658,-38l21.87342,34.06897l-32,3.93103z";
  this._r = 5; 
  this.fill = 'blue';
  this.stroke = 'red';
  this.strokeWidth="2";
  this._x = 0; 
  this._y = 0;
  this.playerElement = null;

  // Call Render to add the player to the board
  this.render();

};

// Takes a tuple, [x,y] -- sets the Player _.x and _.y to
// the passed values, or the max/min if the passed values are out
// of bounds
Player.prototype.setCoordinates = function(coordinateArr){

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

Player.prototype.getCoordinates = function(){
  return [this._x, this._y];
}

Player.prototype.render = function(){ 
  this.playerElement = gameBoard.append('svg:path')
            .attr('d', this.path)
            .attr('fill', this.fill)
            .attr('stroke', this.stroke)
            .attr('stroke-width', this.strokeWidth);

  // Player is on the board, now call transform to put the player in the center

  var startingPos = [gameOptions.width/2, gameOptions.height/2];
  this.transform(startingPos);
  // Player is in the center, now setup dragging to move him/her around
  this.setupDragging();
};

Player.prototype.transform = function(optionalCoordArray){
  if(optionalCoordArray){ 
    this.setCoordinates(optionalCoordArray)
  }
  this.playerElement.attr("transform", "translate("+ this._x + ","+ this._y+")");
};

Player.prototype.moveRelative = function(dArray){ 
  var currentCoords = this.getCoordinates();
  var newCoords = [dArray[0] + currentCoords[0], dArray[1] + currentCoords[1]];
  this.transform(newCoords);
};

Player.prototype.setupDragging = function(){
    var drag = d3.behavior.drag()
            .on('drag', this.dragMove.bind(this));
    this.playerElement.call(drag);

};
Player.prototype.dragMove = function(){ 
  this.moveRelative([d3.event.dx, d3.event.dy]);
};  
  
 