/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var Game = missileDefense.Game = function() {
    this.round = 0;
    this.score = 0;
    this.ammo = 0;
    this.ammoL = 0;
    this.ammoM = 0;
    this.ammoR = 0;
    this.missiles = [];
    this.bullets = [];
    this.targets = [];
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
      var YCord = (Math.floor((Math.random() * 400) + 1) * -1);
      var newMissile = new missileDefense.Missile({
        pos: [xCord, YCord],
        origin: [xCord, YCord]
      });
      this.missiles.push(newMissile);
    }
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.addTarget = function(target) {
    this.targets.push(target);
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
      this.score += (this.ammo * 2);
      this.addMissiles(this.round);
      if (this.round > 10) {
        this.ammo = (this.cities.length * 6);
        this.ammo += 30;
      }
      else if (this.round > 5) {
        this.ammo = (this.cities.length * 6);
        this.ammo += 18;
      }
      else{
      this.ammo = (this.cities.length * 3);
      this.ammo += 15;
      }
      this.ammoL = (this.ammo / 3);
      this.ammoM = (this.ammo / 3);
      this.ammoR = (this.ammo / 3);
    }
  };

  Game.prototype.addScore = function() {
    if (this.missiles.length ===0){
      var roundScore = 0;
      roundScore += (this.cities.length * 10);
      roundScore += (this.round * 2);
      this.score += roundScore;
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


  // Check if a bullet has passed its destination on the Y axis
  var _timeToBlowY = function(arg1,arg2) {
    if ((Math.abs(arg1) - Math.abs(arg2)) < 0) {
      return true;
    }
    else {
      return false;
    }
  };

  // Check if a bullet has passed its destination on the X axis
  var _timeToBlowX = function(vel, currentPos,destinationPos) {
    // if destination is on the left
    if (vel < 0) {
      if ((Math.abs(currentPos) - Math.abs(destinationPos)) > 0) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      // if destination is on the right
      if (vel > 0) {
        if((currentPos > destinationPos)){
          return true;
        }
        else {
          return false;
        }
      // if destination is straight above turret
      }
      else {
        return true;
      }
    }
  };

  Game.prototype.checkBullets = function() {
    var that = this;
    var bulletArr = [];

    for (var i = 0; i < that.bullets.length; i ++) {
      if (_timeToBlowX(that.bullets[i].vel[0],that.bullets[i].pos[0],that.bullets[i].destination[0]) &&
          _timeToBlowY(that.bullets[i].pos[1],that.bullets[i].destination[1])) {
            var newExplosion = new missileDefense.Explosion({
              pos: that.bullets[i].pos
            });
            that.explosions.push(newExplosion);
      }
      else {
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
          window.game.score += 5;
        }
      }

      for (var k = 0; k < that.targets.length; k ++) {
        if (that.targets[k].hitByExplosion(that.explosions[i])){
          that.targets.splice(k,1);
        }
      }
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.font = "30px Cutive Mono";
    ctx.fillStyle = "blue";

    ctx.fillText("Round: " + this.round, 20, 50);
    ctx.fillText("Score: " + this.score, 20, 80);
    ctx.fillStyle = "white";

    ctx.font = "15px Cutive Mono";
    ctx.fillText(this.ammoM, 497, 595);
    ctx.fillText(this.ammoL, 162, 595);
    ctx.fillText(this.ammoR, 832, 595);

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
    this.targets.forEach(function(obj) {
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
          obj.pos[1] < 600 && obj.pos[1] >= -400 ) {
            arrMissiles.push(obj);
      }
      else{
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
      if (obj.radius % 2 != 0 && obj.radius < 60) {
        obj.radius += 2;
      }
      else if (obj.radius > 60) {
        obj.radius = 58;
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

  Game.prototype.over = function() {
    if (this.cities.length === 0){
      return true;
    }
    return false;
  };

  Game.prototype.endOfGame = function(ctx) {
    ctx.font = "30px Cutive Mono";
    ctx.fillStyle = "red";
    // ctx.textAlign = "center";
    ctx.fillText("GAME OVER", 400, 300);
  };

})();
