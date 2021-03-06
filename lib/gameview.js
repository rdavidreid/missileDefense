/* globals MovingObjects, missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var GameView = missileDefense.GameView = function(game,ctx) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.start = function() {
    var that = this;
    var gameLoop = setInterval(function () {

      if (that.game.over()) {

        that.game.endOfGame(that.ctx);
        clearInterval(gameLoop);
      }
      else {
        that.game.addScore();
        that.game.addRound();
        that.game.moveObjects();
        that.game.removeOffScreen(that.ctx);
        that.game.checkBuildings();
        that.game.checkBullets();
        that.game.checkExplosions();
        that.game.draw(that.ctx);
        that.game.handleExplosions();
      }

    }, 20);

  };

})();
