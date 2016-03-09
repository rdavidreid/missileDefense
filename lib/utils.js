/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }
  var Util = missileDefense.Util = {};

  var inherits = Util.inherits = function(ChildClass, BaseClass) {
    function Surrogate () {this.constructor = ChildClass};
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  var randomVec = Util.randomVec = function(origin) {
    var x = (Math.random() - Math.random()) / 2;
    var y = Math.random();
    // Prevent missile from getting vector that will make it land off screen
    y < 0.3? y += 0.5 : y;
    while ( (x * (600 / y) + origin[0] ) > 1000 ||
            (x * (600 / y) + origin[0] ) < 0) {
      var x = (Math.random() - Math.random()) / 2;
    }
    // x > 0? x += 0.5 : x -= 0.5;
    return [x,y];
  };

  var cityVec = Util.cityVec = function(origin) {
    var numCities = window.game.cities.length;
    var target = window.game.cities[Math.floor(Math.random() * numCities)].pos;
    var vecX = target[0] - origin[0];
    var vecY = target[1] - origin[1];

    var vectorX = (vecX / (Math.abs(vecX) + Math.abs(vecY)) );
    var vectorY = (vecY / (Math.abs(vecX) + Math.abs(vecY)) );
    // if (vectorY < 0) {
    //   vectorY = vectorY * -1;
    //   vectorX = vectorX * -1;
    // }
    // debugger;
    return [vectorX, vectorY];
  };

  var bulletVec = Util.bulletVec = function(start, end) {
    var vecX = end[0] - start[0];
    var vecY = end[1] - start[1];
    var vectorX = (vecX / (Math.abs(vecX) + Math.abs(vecY)) * -1);
    var vectorY = (vecY / (Math.abs(vecX) + Math.abs(vecY)) * -1);
    if (vectorY > 0) {
      vectorY = vectorY * -1;
      vectorX = vectorX * -1;
    }

    vectorX *= 5;
    vectorY *= 5;
    return [vectorX,vectorY];
  };


})();
