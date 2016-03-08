/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

    var Missile = missileDefense.Missile = function (options) {
      options.color = Missile.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.radius = Missile.RADIUS;
      options.vel = options.vel || missileDefense.Util.randomVec(options['pos']);
      missileDefense.MovingObject.call(this, options);
    };

    Missile.COLOR = "#000";
    Missile.RADIUS = 1;
    Missile.SPEED = 4;

    missileDefense.Util.inherits(Missile, missileDefense.MovingObject);

})();
