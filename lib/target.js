/* global missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var Target = missileDefense.Target = function(options) {
    this.pos = options['pos'];
    this.color = '#00e600';
    this.src = "./target.png";
  };

  Target.prototype.hitByExplosion = function(explosion) {
    if (Math.abs(this.pos[0] - explosion.pos.pos[0]) < 10 &&
        Math.abs(this.pos[1] - explosion.pos.pos[1]) < 10) {
          return true;
    }
    return false;
  };

  Target.prototype.draw = function(ctx){
    ctx.fillstyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0],this.pos[1]);
    ctx.lineTo(this.pos[0] + 5,this.pos[1]);
    ctx.lineTo(this.pos[0] - 5,this.pos[1]);
    ctx.moveTo(this.pos[0],this.pos[1]);
    ctx.lineTo(this.pos[0],this.pos[1] + 5);
    ctx.lineTo(this.pos[0],this.pos[1] - 5);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  };

  var createTarget = missileDefense.createTarget = function(target) {
    var options = ({
      pos: ([target['x'],target['y']])
    });
    var newTarget = new Target(options);
    window.game.addTarget(newTarget);
  };

})();
