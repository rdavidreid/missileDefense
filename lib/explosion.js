/* global missileDefense */

(function() {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var Explosion = missileDefense.Explosion = function(pos) {
    this.radius = 5;
    this.pos = pos;
  };

  Explosion.prototype.draw = function(ctx) {
    // debugger;
    ctx.fillstyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.pos[0],this.pos.pos[1],this.radius,0,2*Math.PI);
    ctx.stroke();
  };

})();
