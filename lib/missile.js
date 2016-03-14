/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

    var Missile = missileDefense.Missile = function (options) {
      options.color = Missile.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.radius = Missile.RADIUS;
      options.vel = options.vel || missileDefense.Util.cityVec(options['pos']);
      missileDefense.MovingObject.call(this, options);
    };

    Missile.COLOR = "#ff0000";
    Missile.RADIUS = 2;

    missileDefense.Util.inherits(Missile, missileDefense.MovingObject);

})();
