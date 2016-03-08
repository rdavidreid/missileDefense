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

  var randomVec = Util.randomVec = function() {
    var x = (Math.random() - Math.random()) / 2;
    var y = Math.random();
    return [x,y];
  };


})();
