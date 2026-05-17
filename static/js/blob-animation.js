// ABOUTME: Canvas metaball (floating blob) animation, ported from the React portfolio source.
// ABOUTME: Blob colors and CSS accent color are both driven by a shared hue value.

// Current hue (0-360) — read by BlobParticle.draw() every frame so color
// updates are instant without needing to recreate the particle system.
var currentHue = 301;

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
    this.x = effect.width * Math.random();
    this.y = effect.height * (Math.random() * (0.9 - 0.1) - 0.1);
    this.rad = Math.random() * effect.rad;
    this.speedX = 0;
    this.speedY = Math.random() * 1;
    // Lightness bucket based on speed — same logic as the original React source.
    // 0.8+ → bright, 0.6–0.8 → mid, <0.6 → dark
    this.lightness = this.speedY >= 0.8 ? 62 : this.speedY >= 0.6 ? 42 : 22;
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
    // Read currentHue every frame so color changes are instant.
    var color = "hsla(" + currentHue + ",76%," + this.lightness + "%," + this.effect.opacity + ")";
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function startBlobAnimation(canvasId, opts) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;

  var bgColor      = opts.bgColor      || "#1C1C1C";
  var rad          = opts.rad          || 50;
  var opacity      = opts.opacity      || 0.5;
  var blobsPerWidth = opts.blobsPerWidth || 200;
  var heightFn     = opts.heightFn     || function () { return window.innerHeight; };

  var effect = null;

  function render() {
    canvas.width  = window.innerWidth;
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

  window.addEventListener("resize", function () { effect = null; });
  render();
}

// ── Color / hue slider ───────────────────────────────────
// A range input in the nav bar slides through the hue wheel (0-360).
// Changing it updates both --primary on the root element and currentHue
// so the blob animations update on the very next animation frame.

function initColorPicker() {
  var STORAGE_KEY = "portfolio-hue";
  var root = document.documentElement;

  function applyHue(hue) {
    currentHue = hue;
    root.style.setProperty("--primary", "hsl(" + hue + ",76%,62%)");
  }

  var saved = localStorage.getItem(STORAGE_KEY);
  var initialHue = saved !== null ? parseInt(saved, 10) : 301;
  applyHue(initialHue);

  var slider = document.getElementById("hue-slider");
  if (!slider) return;

  slider.value = initialHue;

  slider.addEventListener("input", function () {
    var hue = parseInt(slider.value, 10);
    applyHue(hue);
    localStorage.setItem(STORAGE_KEY, hue);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initColorPicker();

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
