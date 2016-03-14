/* global MovingObject  missileDefense*/
(function() {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var MovingObject = missileDefense.MovingObject = function(options) {
    this.origin = options['origin'];
    this.pos = options['pos'];
    this.vel = options['vel'];
    this.radius = options['radius'];
    this.color = options['color'];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.moveTo(this.origin[0],this.origin[1]);
    ctx.lineTo(this.pos[0],this.pos[1]);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    };

  MovingObject.prototype.hitCity = function(building){
    if (this.pos[1] >= building.topLeft[1]) {
      if (this.pos[0] >= building.topLeft[0] &&
          this.pos[0] <= (building.topLeft[0] + building.widthHeight[0])){
            return true;
      }
    }
    return false;
  };

  MovingObject.prototype.hitExplosion = function(explosion) {
    var distance = Math.sqrt( Math.pow((this.pos[0] - explosion.pos.pos[0]),2) +
                              Math.pow((this.pos[1] - explosion.pos.pos[1]),2));
    if(distance < explosion.radius) {
      return true;
    }
    else {
      return false;
    }
  };

})();
