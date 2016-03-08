/* global missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var City = missileDefense.City = function(options) {
    this.pos = options['pos'];
    this.color = City.COLOR;
    this.health = 2;
  };

  City.COLOR = "#999999";


})();
