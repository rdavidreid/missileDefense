/* global missileDefense */

(function() {
  if (typeof missileDefense === "undefined"){
    window.missileDefense = {};
  }

  var Bullet = missileDefense.Bullet = function(options) {
      window.game.ammo -= 1;

      this.destination = options['destination'];
      this.origin = options['origin'].slice();

      options.pos = options['origin'].slice();
      options.color = "#00ff00";
      options.radius = Bullet.RADIUS;
      options.vel = missileDefense.Util.bulletVec(this.origin,this.destination);

      missileDefense.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 1;

  var createBullet = missileDefense.createBullet = function(target,origin) {
    var options = ({
      destination: ([target['x'],target['y']]),
      origin: ([origin['x'],origin['y']])
    });
    var newBullet = new Bullet(options);
    window.game.addBullet(newBullet);
  };

  missileDefense.Util.inherits(Bullet, missileDefense.MovingObject);


})();
