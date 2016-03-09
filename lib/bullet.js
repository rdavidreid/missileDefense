/* global missileDefense */

(function() {
  if (typeof missileDefense === "undefined"){
    window.missileDefense = {};
  }

  var Bullet = missileDefense.Bullet = function(options) {
      window.game.ammo -= 1;
      this.destination = options['destination'];
      this.origin = [500,600];
      this.pos = [500,599];
      this.color = "#00ff00";
      this.radius = Bullet.RADIUS;
      this.vel = missileDefense.Util.bulletVec(this.origin,this.destination);

      options.vel = this.vel;
      options.origin = this.origin;
      options.radius = this.radius;
      options.color = this.color;
      options.pos = this.pos;
      missileDefense.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 1;

  var createBullet = missileDefense.createBullet = function(target) {
    var options = ({
      destination: ([target['x'],target['y']])
    });
    var newBullet = new Bullet(options);
    window.game.addBullet(newBullet);
  };

  missileDefense.Util.inherits(Bullet, missileDefense.MovingObject);


})();
