/* global missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var City = missileDefense.City = function(options) {
    this.topLeft = options['topLeft'];
    this.widthHeight = options['widthHeight'];
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

})();
