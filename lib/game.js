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
    this.explosions = [];

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

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
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

  Game.prototype.checkBullets = function() {
    var that = this;
    var bulletArr = [];
    var timeToBlowY = function(arg1,arg2) {
      if ((Math.abs(arg1) - Math.abs(arg2)) < 0) {
        // console.log(arg1);
        // console.log(arg2);
        return true;
      }
      else {
        return false;
      }
    };

    var timeToBlowX = function(arg1,arg2) {
      // if destination is on the left
      if (arg1 > arg2) {
        if ((Math.abs(arg1) - Math.abs(arg2)) > 0) {
          // console.log(arg1);
          // console.log(arg2);
          return true;
        }
        else {
          return false;
        }
      }
      // if destination is on the right
      else{
        if(arg1 < arg2) {
          return true;
        }
        else {
          return false;
        }
      }
    };

    for (var i = 0; i < that.bullets.length; i ++) {
      if (timeToBlowX(that.bullets[i].pos[0],that.bullets[i].destination[0]) &&
          timeToBlowY(that.bullets[i].pos[1],that.bullets[i].destination[1])) {
            // create explosion at bullet destination
            // console.log(that.bullets[i].destination);
            var newExplosion = new missileDefense.Explosion({
              pos: that.bullets[i].pos
            });
            that.explosions.push(newExplosion);
      }
      else {
        // console.log(that.bullets[i].pos);
        // console.log(that.bullets[i].destination);
        bulletArr.push(that.bullets[i]);
      }
    }
    that.bullets = bulletArr;
  };

  Game.prototype.checkExplosions = function() {
    var that = this;
    for (var i = 0; i < that.explosions.length; i ++) {
      for (var j = 0; j < that.missiles.length; j ++)  {
        if (that.missiles[j].hitExplosion(that.explosions[i])) {
          var newExplosion = new missileDefense.Explosion({
            pos: that.missiles[j].pos
          });
          that.explosions.push(newExplosion);
          that.missiles.splice(j,1);
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
    this.bullets.forEach(function(obj) {
      obj.draw(ctx);
    });
    this.explosions.forEach(function(obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.missiles.forEach(function(obj) {
      obj.move();
    });
    this.bullets.forEach(function(obj) {
      obj.move();
    });
  };

  Game.prototype.removeOffScreen = function() {
    var arrMissiles = [];
    var arrBullets = [];
    var that = this;

    this.missiles.forEach(function(obj) {
      if( obj.pos[0] < 1000 && obj.pos[0] >= 0 &&
          obj.pos[1] < 600 && obj.pos[1] >= 0 ) {
            arrMissiles.push(obj);
      }
    });

    this.bullets.forEach(function(obj) {
      if( obj.pos[0] < 1000 && obj.pos[0] >= 0 &&
          obj.pos[1] < 600 && obj.pos[1] >= 0 ) {
            arrBullets.push(obj);
      }
      else {
        console.log(obj.pos);
        console.log(obj.destination);
      }
    });

    this.missiles = arrMissiles;
    this.bullets = arrBullets;
  };

  Game.prototype.handleExplosions = function() {
    var arrExplosions = [];
    this.explosions.forEach(function(obj) {
      if (obj.radius % 2 != 0 && obj.radius < 20) {
        obj.radius += 2;
      }
      else if (obj.radius > 20) {
        obj.radius = 18;
      }
      else {
        obj.radius -= 2;
      }
      if (obj.radius > 0) {
        arrExplosions.push(obj);
      }
    });
    this.explosions = arrExplosions;
  };






})();
