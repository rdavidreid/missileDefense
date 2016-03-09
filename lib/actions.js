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
    if (evt.keyCode === 32) {
      if (window.game.ammo > 0) {
        missileDefense.createBullet(window.missileDefense.mousePos);
      }
    }
  }, false);

})();
