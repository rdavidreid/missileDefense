/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var Game = missileDefense.Game = function() {
    this.round = 0;
    this.missiles = [];
    this.bullets = [];
    this.cities = [];

    this.addMissiles();
    this.addCities();
  };

  Game.BG_COLOR = "#ffffff";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_MISSILES = 10;

  Game.prototype.addMissiles = function(arg) {
    var numMissiles = 10 + (2 * arg);
    for (var i = 0; i < numMissiles; i += 1){
      var xCord = Math.floor((Math.random() * Game.DIM_X) + 1);
      var newMissile = new missileDefense.Missile({
        pos: [xCord, 0],
        origin: [xCord, 0]
      });
      this.missiles.push(newMissile);
    }
  };

  Game.prototype.addCities = function() {
    var numCities = 3;
    var middle;
    for (var i = 0; i < numCities; i += 1) {
      middle = (1000 / numCities + 1);
      middle -= (middle / 2);
      middle += ((1000 / numCities + 1) * this.cities.length);
      var newCity = new missileDefense.City({
        topLeft: [middle - 30, 580],
        widthHeight: [60, 20]
      });
      this.cities.push(newCity);
    }
  };

  Game.prototype.addRound = function() {
    if (this.missiles.length === 0){
      this.round += 1;
      this.addMissiles(this.round);
    }
  };

  Game.prototype.checkBuildings = function() {
    var that = this;
    for (var i = 0; i < that.missiles.length; i ++) {
      for (var j = 0;j < that.cities.length; j ++) {
        if (that.missiles[i].hitCity(that.cities[j])) {
          that.cities.splice(j,1);
          that.missiles.splice(i,1);
        }
      }
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.font = "30px Arial";
    ctx.fillText("Round: " + this.round, 850, 50);

    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);
    this.missiles.forEach(function(obj) {
      obj.draw(ctx);
    });
    this.cities.forEach(function(obj) {
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
        // obj.errase();
        // toErrase.push(obj);
      }
    });
    this.missiles = arr;
    return toErrase;
  };








})();
