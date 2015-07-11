var Player = function(){
  //this.path = "m2.5,40.5l10.12658,-38l21.87342,34.06897l-32,3.93103z";
  
  Piece.call(this, "m2.5,40.5l10.12658,-38l21.87342,34.06897l-32,3.93103z");
  this.startingPos = [gameOptions.width/2, gameOptions.height/2];


  // Call Render to add the player to the board
  // After the player is rendered, set the position to the center
  // of the board
  this.render();
  this.setupDragging();
};

Player.prototype = Object.create(Piece.prototype);
Player.prototype.constructor = Player;

Player.prototype.setupDragging = function(){
    var drag = d3.behavior.drag()
            .on('drag', this.dragMove.bind(this));
    this.pieceElement.call(drag);

};
Player.prototype.dragMove = function(){ 
  this.moveRelative([d3.event.dx, d3.event.dy]);
};  
  
 