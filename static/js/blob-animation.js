// ABOUTME: Canvas metaball (floating blob) animation, ported from the React portfolio source.
// ABOUTME: Also handles image/video loading states for cards and project pages.

// ── Accent color ─────────────────────────────────────────
// Hue is read from --primary at startup so the blobs always match the CSS accent.
// To change the accent color, edit --primary in portfolio-dark.css.
var currentHue = 301; // default; overwritten on DOMContentLoaded from CSS

function readHueFromCSS() {
  var primary = getComputedStyle(document.documentElement)
                  .getPropertyValue("--primary").trim();
  // Parse hsl(…) or hex — we only need to cover what we put in the CSS.
  var hslMatch = primary.match(/hsl\((\d+)/);
  if (hslMatch) { currentHue = parseInt(hslMatch[1], 10); return; }
  // Hex fallback: compute hue via canvas (covers the default #e854e6)
  var hex = primary.replace("#", "");
  if (hex.length === 6) {
    var r = parseInt(hex.slice(0,2), 16) / 255;
    var g = parseInt(hex.slice(2,4), 16) / 255;
    var b = parseInt(hex.slice(4,6), 16) / 255;
    var max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
    if (d === 0) { currentHue = 0; return; }
    var h = max === r ? ((g - b) / d) % 6
          : max === g ? (b - r) / d + 2
          :             (r - g) / d + 4;
    currentHue = Math.round(h * 60 + 360) % 360;
  }
}

// ── Blob animation ────────────────────────────────────────

class MetaBlobEffect {
  constructor(width, height, rad, opacity) {
    this.width   = width;
    this.height  = height;
    this.rad     = rad;
    this.opacity = opacity;
    this.metaballsArray = [];
  }

  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new BlobParticle(this));
    }
  }

  update() { this.metaballsArray.forEach(b => b.update()); }
  draw(ctx) { this.metaballsArray.forEach(b => b.draw(ctx)); }
}

class BlobParticle {
  constructor(effect) {
    this.effect   = effect;
    this.x        = effect.width  * Math.random();
    this.y        = effect.height * (Math.random() * (0.9 - 0.1) - 0.1);
    this.rad      = Math.random() * effect.rad;
    this.speedX   = 0;
    this.speedY   = Math.random() * 1;
    // Lightness bucket based on speed — matches the original React source.
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
    // currentHue is read every frame so CSS --primary changes take effect immediately.
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

  var bgColor       = opts.bgColor       || "#1C1C1C";
  var rad           = opts.rad           || 50;
  var opacity       = opts.opacity       || 0.5;
  var blobsPerWidth = opts.blobsPerWidth || 200;

  var effect = null;

  function render() {
    // Use the CSS-rendered dimensions (offsetWidth/offsetHeight) so that canvas
    // pixel space matches display space — circles stay perfectly round regardless
    // of which section the canvas is in.
    var w = canvas.offsetWidth  || window.innerWidth;
    var h = canvas.offsetHeight || window.innerHeight;

    // Only reset pixel dims when they actually changed to avoid unnecessary redraws.
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
      effect = null; // particle positions are stale after a resize
    }

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    if (!effect) {
      effect = new MetaBlobEffect(w, h, rad, opacity);
      var numGroups = Math.max(1, Math.floor(w / blobsPerWidth));
      for (var i = 0; i < numGroups; i++) effect.init(25);
    }

    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(render);
  }

  render();
}

// ── Image / video loading states ─────────────────────────
// Project cards: a shimmer overlay hides until the image loads.
// Project body images: fade in once loaded.

function initLoadingStates() {
  // Card shimmer — remove once img is ready
  document.querySelectorAll(".project-card").forEach(function (card) {
    var img = card.querySelector(".project-card-img");
    if (!img) { card.classList.add("loaded"); return; }
    if (img.complete && img.naturalWidth > 0) {
      card.classList.add("loaded");
    } else {
      img.addEventListener("load",  function () { card.classList.add("loaded"); });
      img.addEventListener("error", function () { card.classList.add("loaded"); });
    }
  });

  // Project body images — fade in on load
  document.querySelectorAll(".project-body img").forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("img-loaded");
    } else {
      img.addEventListener("load",  function () { img.classList.add("img-loaded"); });
      img.addEventListener("error", function () { img.classList.add("img-loaded"); });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  readHueFromCSS();

  startBlobAnimation("hero-canvas",           { blobsPerWidth: 200 });
  startBlobAnimation("footer-canvas",         { blobsPerWidth: 500 });
  startBlobAnimation("project-banner-canvas", { blobsPerWidth: 500 });

  initLoadingStates();
});
