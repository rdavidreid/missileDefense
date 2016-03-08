/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var Game = missileDefense.Game = function() {
    this.round = 1;
    this.missiles = [];
    this.bullets = [];
    this.cities = [];

    this.addMissiles();
  };

  Game.BG_COLOR = "#ffffff";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_MISSILES = 10;

  Game.prototype.addMissiles = function() {
    var that = this;
    for (var i = 0; i < 10; i += 1){
      var x_cord = Math.floor((Math.random() * Game.DIM_X) + 1);
      var newMissile = new missileDefense.Missile({
        pos: [x_cord, 0],
        origin: [x_cord, 0]
      });
      this.missiles.push(newMissile);
    }
  };

  Game.prototype.addRound = function() {
    if (this.missiles.length === 0){
      alert("round " + this.round + " complete!");
      this.round += 1;
      this.addMissiles();
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);

    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);
    this.missiles.forEach(function(obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.missiles.forEach(function(obj) {
      obj.move();
    });
  };

  Game.prototype.removeOffScreen = function() {
    var arr = [];
    var toErrase = [];
    var that = this;
    this.missiles.forEach(function(obj) {
      if( obj.pos[0] < 1000 && obj.pos[0] >= 0 &&
          obj.pos[1] < 600 && obj.pos[1] >= 0 ) {
            arr.push(obj);
      }
      else {
        obj.errase();
        // toErrase.push(obj);
      }
    });
    this.missiles = arr;
    return toErrase;
  };








})();
