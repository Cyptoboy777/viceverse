/* Motion: hero parallax, card tilt. All of it is off for reduced-motion users. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Hero parallax: layers drift with scroll and with the pointer.
  var layers = Array.prototype.slice.call(document.querySelectorAll(".px"));
  var mx = 0, ticking = false;
  function paint() {
    ticking = false;
    var y = Math.min(window.scrollY, 600);
    layers.forEach(function (l) {
      var d = parseFloat(l.getAttribute("data-d")) || 0;
      l.style.transform = "translate(" + (mx * d * 14).toFixed(1) + "px," + (-y * d * 0.12).toFixed(1) + "px)";
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }
  if (layers.length) {
    window.addEventListener("scroll", req, { passive: true });
    var art = document.querySelector(".hero-art");
    if (art) art.addEventListener("pointermove", function (e) {
      var r = art.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - 0.5; req();
    });
  }

  // Card tilt (mouse only).
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".dcard, .tile, .nitem");
      if (!c) return;
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = "perspective(700px) rotateX(" + (-y * 5).toFixed(2) + "deg) rotateY(" + (x * 6).toFixed(2) + "deg) translateY(-2px)";
    });
    document.addEventListener("pointerout", function (e) {
      var c = e.target.closest && e.target.closest(".dcard, .tile, .nitem");
      if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
    });
  }
})();
