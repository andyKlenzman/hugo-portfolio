// ABOUTME: Canvas metaball (floating blob) animation, ported from the React portfolio source.
// ABOUTME: Creates independent animation instances for the hero and footer canvases.

class MetaBlobEffect {
  constructor(width, height, rad, opacity) {
    this.width = width;
    this.height = height;
    this.rad = rad;
    this.opacity = opacity;
    this.metaballsArray = [];
  }

  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new BlobParticle(this));
    }
  }

  update() {
    this.metaballsArray.forEach(function (b) { b.update(); });
  }

  draw(ctx) {
    this.metaballsArray.forEach(function (b) { b.draw(ctx); });
  }
}

class BlobParticle {
  constructor(effect) {
    this.effect = effect;
    var opacity = effect.opacity;
    this.x = effect.width * Math.random();
    this.y = effect.height * (Math.random() * (0.9 - 0.1) - 0.1);
    this.rad = Math.random() * effect.rad;
    this.speedX = 0;
    this.speedY = Math.random() * 1;

    if (this.speedY >= 0.8) {
      this.color = "hsla(301,76%,62%," + opacity + ")";
    } else if (this.speedY >= 0.6) {
      this.color = "hsla(301,76%,42%," + opacity + ")";
    } else {
      this.color = "hsla(301,76%,22%," + opacity + ")";
    }
  }

  update() {
    if (this.y > this.effect.height + this.rad + 200) {
      this.x = Math.random() * window.innerWidth;
      this.y = 0 - this.rad;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function startBlobAnimation(canvasId, opts) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;

  var bgColor = opts.bgColor || "#1C1C1C";
  var rad = opts.rad || 50;
  var opacity = opts.opacity || 0.5;
  var blobsPerWidth = opts.blobsPerWidth || 200;
  var heightFn = opts.heightFn || function () { return window.innerHeight; };

  var effect = null;

  function render() {
    canvas.width = window.innerWidth;
    canvas.height = heightFn();
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!effect) {
      effect = new MetaBlobEffect(canvas.width, canvas.height, rad, opacity);
      var numGroups = Math.max(1, Math.floor(canvas.width / blobsPerWidth));
      for (var i = 0; i < numGroups; i++) {
        effect.init(25);
      }
    }

    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(render);
  }

  window.addEventListener("resize", function () {
    effect = null;
  });

  render();
}

document.addEventListener("DOMContentLoaded", function () {
  startBlobAnimation("hero-canvas", { blobsPerWidth: 200 });

  startBlobAnimation("footer-canvas", {
    blobsPerWidth: 500,
    heightFn: function () { return window.innerHeight / 1.7; }
  });

  // Project pages have a smaller banner canvas
  startBlobAnimation("project-banner-canvas", {
    blobsPerWidth: 500,
    heightFn: function () { return window.innerHeight / 1.7; }
  });
});
