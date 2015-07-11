
//game setup
var gameOptions = {
  height: 450,
  width: 700,
  padding: 20,
  nEnemies: 10
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