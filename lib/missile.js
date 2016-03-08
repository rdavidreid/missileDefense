/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

    var Missile = missileDefense.Missile = function (options) {
      options.color = Missile.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.radius = Missile.RADIUS;
      options.vel = options.vel || missileDefense.Util.randomVec();
      missileDefense.MovingObject.call(this, options);
    };

    Missile.COLOR = "#000";
    Missile.RADIUS = 1;
    Missile.SPEED = 4;
    // TODO REMOVE:
    // Missile.POS = [100,0];
    Missile.VEL = [1,1];

    missileDefense.Util.inherits(Missile, missileDefense.MovingObject);

})();
