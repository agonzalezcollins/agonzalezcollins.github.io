(function(){

  'use strict';

  var canvas = document.getElementById('scratch'),
      context = canvas.getContext('2d');

  // default value
  context.globalCompositeOperation = 'source-over';

  //----------------------------------------------------------------------------

  var x, y, radius;

  x = y = radius = 150 / 2;

  // fill circle
  context.beginPath();
  context.fillStyle = '#CCCCCC';
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fill();

  //----------------------------------------------------------------------------

  var isDrag = false;

  function clearArc(x, y) {
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, false);
    context.fill();
  }

  // Canvas Mouse
  canvas.addEventListener('mousedown', function(event) {
    isDrag = true;

    clearArc(event.offsetX, event.offsetY);
    judgeVisible();
  }, false);

  canvas.addEventListener('mousemove', function(event) {
    if (!isDrag) {
      return;
    }

    clearArc(event.offsetX, event.offsetY);
    judgeVisible();
  }, false);

  canvas.addEventListener('mouseup', function(event) {
    isDrag = false;
  }, false);

  canvas.addEventListener('mouseleave', function(event) {
    isDrag = false;
  }, false);

  //----------------------------------------------------------------------------

  // Prevent scrolling when touching the canvas

  // Body Touch

  document.body.addEventListener("touchstart", function (event) {
    if (event.targetTouches.length !== 1) {
      return;
    }

    if (event.target == canvas) {
      event.preventDefault();
      isDrag = true;
      clearArc(event.touches[0].pageX, event.touches[0].pageY);
      judgeVisible();
    }
  }, false);

  document.body.addEventListener("touchend", function (event) {
    if (event.target == canvas) {
      event.preventDefault();
      isDrag = false;
    }
  }, false);

  document.body.addEventListener("touchmove", function (event) {
    if (!isDrag || event.targetTouches.length !== 1) {
      return;
    }

    if (event.target == canvas) {
      event.preventDefault();
      clearArc(event.touches[0].pageX, event.touches[0].pageY);
      judgeVisible();
    }
  }, false);


  // Canvas Touch

  canvas.addEventListener('touchstart', function(event) {
    if (event.targetTouches.length !== 1) {
      return;
    }

    event.preventDefault();
    isDrag = true;
    clearArc(event.touches[0].offsetX, event.touches[0].offsetY);
    judgeVisible();
  }, false);

  canvas.addEventListener('touchmove', function(event) {
    if (!isDrag || event.targetTouches.length !== 1) {
      return;
    }

    event.preventDefault();

    clearArc(event.touches[0].offsetX, event.touches[0].offsetY);
    judgeVisible();
  }, false);

  canvas.addEventListener('touchend', function(event) {
    isDrag = false;
  }, false);

  //----------------------------------------------------------------------------

  function judgeVisible() {
    var imageData = context.getImageData(0, 0, 150, 150),
        pixels = imageData.data,
        result = {},
        i, len;

    // count alpha values
    for (i = 3, len = pixels.length; i < len; i += 4) {
      result[pixels[i]] || (result[pixels[i]] = 0);
      result[pixels[i]]++;
    }
  }

  document.addEventListener('DOMContentLoaded', judgeVisible, false);

}());
