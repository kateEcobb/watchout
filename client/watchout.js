
//game setup
var gameOptions = {
  height: 450,
  width: 700,
  padding: 20,
  nEnemies: 3
};

var gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
}

var axes ={  
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var gameBoard = d3.select('.board').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height)
                .style('border', '1px solid black');

//helper functions
var updateCurrentScore = function(){
  var curScore = d3.select('.current').select('span');
  curScore.text(gameStats.currentScore);
};

var updateHighScore = function(){ 
  var high = Math.max(gameStats.highScore, gameStats.currentScore);
  gameStats.highScore = high;
  d3.select('.high').select('span').text(high);
};

var updateCollisions = function(){
  d3.select('.collisions').select('span').text(gameStats.collisions)
};

var randomYCoordinate = function(){
  return Math.random() * gameOptions.height;
}

var randomXCoordinate = function(){
  return Math.random() * gameOptions.width;
}

// Setup the game
var player = new Player();

// Doges
var Doge = function(id){
  this.id = id;
  this._x = randomXCoordinate();
  this._y = randomYCoordinate();
}

var createEnemies = function(){
  var enemyArray = [];
  for(var i = 0; i < gameOptions.nEnemies; i++){
    enemyArray.push(new Enemy(i));
  }
  return enemyArray
}

var enemies = createEnemies();

  
//Add enemies to the screen, make them fly around
var update = function(){
  var selection = gameBoard.selectAll('.doge')
    .data(enemies, function(d){return d.id;});
  
  selection.transition()
    .duration(1600)
    .attr("x", function(d){return d._x;})
    .attr("y", function(d){return d._y;})
   // .tween('.doge', function(d){console.log(d)};)

  selection.enter().append('svg:image')
    .attr("xlink:href", function(d){return d.path;})
    .attr("height", "24.5")
    .attr("width", "23")
    .attr("x", function(d){return d._x;})
    .attr("y", function(d){return d._y;})
    .attr("class", "doge");


}

var fly = function(){
  setTimeout(function(){fly()}, 2000);
  update();
}

fly();


















