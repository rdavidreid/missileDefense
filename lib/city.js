/* global missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var City = missileDefense.City = function(options) {
    this.topLeft = options['topLeft'];
    this.widthHeight = options['widthHeight'];
    this.pos = [
      (this.topLeft[0] + this.widthHeight[0] / 2),
      (this.topLeft[1] + this.widthHeight[1] / 2),
    ];
    this.color = City.COLOR;
    this.health = 2;
  };

  City.COLOR = "#999999";

  City.prototype.draw = function(ctx) {
    ctx.rect( this.topLeft[0], this.topLeft[1],
              this.widthHeight[0],this.widthHeight[1]
    );
    ctx.stroke();
  };

  City.prototype.explode = function() {
    var newExplosions = [];
    newExplosions.push(
      new missileDefense.Explosion({pos: this.pos})
    );
    // new missileDefense.Explosion([ this.pos[0] + 20,this.pos[1] ]),
    // new missileDefense.Explosion([ this.pos[0] + 30,this.pos[1] ])
    return newExplosions;
  };

})();
