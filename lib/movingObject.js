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
    ctx.fillstyle = this.color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.beginPath();
    ctx.moveTo(this.origin[0],this.origin[1]);
    ctx.lineTo(this.pos[0],this.pos[1]);
    ctx.stroke();
    ctx.fill();
  };

  MovingObject.prototype.errase = function(ctx) {
    // ctx.fillstyle = "#ff0000";
    // ctx.beginPath();

  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    console.log("need to write isCollidedWith currenty blank");
    // this.pos - otherObject.pos
    // pos[0] * pos[0] Math.sqrt();
  };

})();
