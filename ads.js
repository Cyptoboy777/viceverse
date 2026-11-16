/* Loads Google AdSense only when configured, and only fills slots that are visible. */
(function () {
  "use strict";
  var c = window.VV_CONFIG || {};
  if (!/^ca-pub-\d+$/.test(c.adsenseClient || "")) return;
  // Before approval there are no slot IDs: show no banner and no ad boxes. (The head script is only for AdSense site verification.)
  var hasSlots = Object.keys(c.adSlots || {}).some(function (k) { return c.adSlots[k]; });
  if (!hasSlots) return;

  var KEY = "vv-consent", loaded = false, personalised = false;
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  $all("[data-adchoices]").forEach(function (b) {
    b.hidden = false;
    b.addEventListener("click", function () { banner(true); });
  });
  function $all(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  function loadScript() {
    if (loaded) return; loaded = true;
    window.adsbygoogle = window.adsbygoogle || [];
    if (!personalised) window.adsbygoogle.requestNonPersonalizedAds = 1;
    var s = document.createElement("script");
    s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + c.adsenseClient;
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) document.head.appendChild(s);
  }

  // Only fill slots that are actually visible (a hidden SPA page has width 0, which AdSense rejects).
  function fill() {
    if (!loaded) return;
    $all(".ad-slot:not([data-filled])").forEach(function (slot) {
      var id = c.adSlots && c.adSlots[slot.dataset.ad];
      var pg = slot.closest(".page");
      if (!id || (pg && !pg.classList.contains("active"))) return;
      slot.dataset.filled = "1"; slot.hidden = false; slot.classList.add("on");
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle"; ins.style.display = "block";
      ins.setAttribute("data-ad-client", c.adsenseClient);
      ins.setAttribute("data-ad-slot", id);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      slot.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  function banner(force) {
    if (!force && get()) return;
    var old = document.getElementById("consent"); if (old) old.remove();
    var d = document.createElement("div");
    d.id = "consent"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Ad preferences");
    d.innerHTML = "<p><b>Ads keep VICEVERSE free.</b> Choose how ads are shown. Your tracker data never leaves your device. " +
      '<a href="' + (document.body.dataset.root || "") + 'privacy.html">Privacy policy</a></p>' +
      '<div><button class="btn small primary" data-c="all">Personalised ads</button><button class="btn small ghost" data-c="limited">Non-personalised only</button></div>';
    d.addEventListener("click", function (e) {
      var v = e.target.dataset && e.target.dataset.c; if (!v) return;
      set(v); personalised = v === "all"; d.remove();
      if (loaded) { window.adsbygoogle.requestNonPersonalizedAds = personalised ? 0 : 1; } else { loadScript(); }
      setTimeout(fill, 50);
    });
    document.body.appendChild(d);
  }

  var saved = get();
  if (saved) { personalised = saved === "all"; loadScript(); }
  else banner(false);
  window.addEventListener("load", function () { setTimeout(fill, 300); });
  window.addEventListener("hashchange", function () { setTimeout(fill, 400); });
})();
