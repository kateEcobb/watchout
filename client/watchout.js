
//game setup
var gameOptions = {
  height: 450,
  width: 700,
  padding: 0,
  nEnemies: 9
};

var gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
}

// var axes ={  
//   x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
//   y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
// }

var gameBoard = d3.select('.board').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height)
                .style('border', ' 5px dotted');

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

var randomRGB = function(){
  return Math.floor(Math.random() * 255);
}

// Setup the game
var player = new Player();

var createEnemies = function(){
  var enemyArray = [];
  for(var i = 0; i < gameOptions.nEnemies; i++){
    enemyArray.push(new Enemy(i));
  }
  return enemyArray
}

var enemies = createEnemies();

var tweenFunc = function(d,i){
  d3.select('#marcus').attr('width','30').attr('height', '50');
  var checkCollisions = function(playerCoords, enemyCoords){
    var aSq = Math.pow(Math.abs(playerCoords[0]+ 15 - enemyCoords[0] + 12),2);
    var bSq = Math.pow(Math.abs(playerCoords[1]+ 25 - enemyCoords[1] + 12),2);
    var c = Math.sqrt(aSq+bSq);
    //console.log(c);
    if(c<30){ 
      d3.select('#marcus').attr('width','60').attr('height', '100');
      player.wasHit = true;
    }
    
  };

  return function(){

    doge = gameBoard.select("[id='doge" + i + "']");
    checkCollisions(player.getCoordinates(), [doge.attr('x'),doge.attr('y')]);


  }
};

  
//Add enemies to the screen, make them fly around
var update = function(){
  
    if(player.wasHit){
      gameStats.collisions++;
      updateCollisions();
      updateHighScore();
      gameStats.currentScore = 0;
      updateCurrentScore();
      player.wasHit = false
    }
  var selection = gameBoard.selectAll('.doge')
    .data(enemies, function(d){return d.id});
  
  selection.transition()
    .duration(1000)
    .tween('custom', tweenFunc)
    .attr("x", function(d){return d._x;})
    .attr("y", function(d){return d._y;})
   // .tween('.doge', function(d){console.log(d)};)

  selection.enter().append('svg:image')
    .attr("xlink:href", function(d){return d.path;})
    .attr("id", function(d){return "doge"+d.id})
    .attr("height", "24.5")
    .attr("width", "23")
    .attr("x", function(d){return d._x;})
    .attr("y", function(d){return d._y;})
    .attr("class", "doge");
}


var fly = function(){
  setTimeout(function(){fly()}, 1000);
  update();
  d3.select('svg').style('border-color', function(){
    return "rgb("+ randomRGB()+","+randomRGB()+","+randomRGB()+")"
  })
}

var updateScore = function(){
  setTimeout(function(){updateScore()}, 100);
  gameStats.currentScore++;
  updateCurrentScore();
}

update();
fly();
updateScore();

















