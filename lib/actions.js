/* global missileDefense */

(function () {
  if (typeof missileDefense === "undefined") {
    window.missileDefense = {};
  }

  var canvasEl = document.getElementById('canvas');

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  document.getElementById('canvas').addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvasEl, evt);
    window.missileDefense.mousePos = mousePos;
  }, false);

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 32 || evt.keyCode === 83) {

      if (window.game.ammoM > 0) {
        var origin = {
          x: 500,
          y: 599
        };
        window.game.ammoM -= 1;
        missileDefense.createBullet(window.missileDefense.mousePos,origin);
        missileDefense.createTarget(window.missileDefense.mousePos);
      }
    }
    if (evt.keyCode === 65) {

      if (window.game.ammoL > 0) {
        var origin = {
          x: 165,
          y: 599
        };
        window.game.ammoL -= 1;
        missileDefense.createBullet(window.missileDefense.mousePos,origin);
        missileDefense.createTarget(window.missileDefense.mousePos);
      }
    }

    if (evt.keyCode === 68) {

      if (window.game.ammoR > 0) {
        var origin = {
          x: 835,
          y: 599
        };
        window.game.ammoR -= 1;
        missileDefense.createBullet(window.missileDefense.mousePos,origin);
        missileDefense.createTarget(window.missileDefense.mousePos);
      }
    }

  }, false);

})();
