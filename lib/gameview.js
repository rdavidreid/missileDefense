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
    setInterval(function () {
      that.game.addRound();
      that.game.removeOffScreen(that.ctx);
      that.game.moveObjects();
      that.game.draw(that.ctx);
    }, 5);
  };

})();
