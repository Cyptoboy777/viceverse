/* "Which region of Leonida are you?" Fan quiz. Entertainment only. */
(function () {
  "use strict";
  var D = window.VV_DATA, root = document.getElementById("quiz");
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var Q = [
    ["Your perfect Friday night?", [["Rooftop party under the neon lights", "vice-city"], ["Sunset boat party", "leonida-keys"], ["Campfire under a huge sky", "mount-kalaga"], ["A late shift, then a loud ride home", "ambrosia"]]],
    ["Pick your ride.", [["A sleek sports car", "vice-city"], ["A jet ski", "leonida-keys"], ["An airboat through the reeds", "grassrivers"], ["A roaring motorbike", "ambrosia"]]],
    ["Your soundtrack is...", [["Glittering neon synths", "vice-city"], ["Classic rock on a cracked radio", "port-gellhorn"], ["Thunder and frogs", "grassrivers"], ["Heavy engines and heavier guitars", "ambrosia"]]],
    ["What annoys you most?", [["Crowds", "mount-kalaga"], ["Boredom", "leonida-keys"], ["Change", "port-gellhorn"], ["Being told what to do", "ambrosia"]]],
    ["Weekend plan?", [["Shopping, then a great dinner", "vice-city"], ["A quiet fishing trip", "mount-kalaga"], ["Restoring something old", "port-gellhorn"], ["Island hopping", "leonida-keys"]]],
    ["Your spirit animal?", [["A flamingo", "vice-city"], ["An alligator", "grassrivers"], ["A black bear", "mount-kalaga"], ["A seagull", "port-gellhorn"]]]
  ];
  var RESULT = {
    "vice-city": ["The Spotlight", "You are Vice City: bold, social and always where the lights are brightest."],
    "leonida-keys": ["The Free Spirit", "You are the Leonida Keys: relaxed, adventurous and happiest near the water."],
    "grassrivers": ["The Wild Card", "You are Grassrivers: unpredictable, resilient and at home where others hesitate."],
    "port-gellhorn": ["The Old Soul", "You are Port Gellhorn: nostalgic, stubborn and loyal to places with a past."],
    "ambrosia": ["The Rebel", "You are Ambrosia: tough, independent and not here to follow anyone's rules."],
    "mount-kalaga": ["The Explorer", "You are Mount Kalaga: calm, self-reliant and drawn to wide open spaces."]
  };
  var order = Object.keys(RESULT), step = 0, score = {};

  function find(id) { return D.locations.filter(function (l) { return l.id === id; })[0]; }
  function render() {
    if (step >= Q.length) return result();
    var q = Q[step];
    root.innerHTML = '<p class="eyebrow">QUESTION ' + (step + 1) + " OF " + Q.length + '</p>' +
      '<div class="bar" aria-hidden="true"><i style="width:' + (step / Q.length * 100) + '%"></i></div>' +
      '<h2 style="margin:18px 0 14px">' + esc(q[0]) + '</h2><div class="stack" role="group" aria-label="Answers">' +
      q[1].map(function (a, i) { return '<button class="btn ghost qopt" data-i="' + i + '" style="justify-content:flex-start;text-align:left;min-height:54px;white-space:normal">' + esc(a[0]) + "</button>"; }).join("") + "</div>";
    var first = root.querySelector(".qopt"); if (first) first.focus({ preventScroll: true });
  }
  function winner() {
    var best = order[0];
    order.forEach(function (k) { if ((score[k] || 0) > (score[best] || 0)) best = k; });
    return best;
  }
  function result() {
    var id = winner(), l = find(id), r = RESULT[id];
    root.innerHTML = '<p class="eyebrow">YOUR RESULT</p><div class="card" style="--glow:' + l.glow + ';text-align:center;padding:28px 18px;border-color:' + l.glow + '88">' +
      '<div style="font-size:54px">' + l.icon + '</div><h2 style="margin:10px 0 4px">' + esc(l.short || l.name) + '</h2>' +
      '<p class="eyebrow" style="margin:0 0 12px">' + esc(r[0].toUpperCase()) + '</p><p style="color:var(--muted);margin:0">' + esc(r[1]) + '</p></div>' +
      '<div class="row" style="margin:18px 0"><button class="btn primary" id="shareBtn">Share my result</button><button class="btn ghost" id="cardBtn">Save image card</button><button class="btn ghost" id="againBtn">Retake</button></div>' +
      '<p class="fine" id="shareMsg" role="status"></p>' +
      '<p><a class="text-link" href="index.html#map">See ' + esc(l.name) + ' on the map</a> · <a class="text-link" href="guides/leonida-regions-guide.html">Read the regions guide</a></p>';
    document.getElementById("shareBtn").onclick = function () { share(l); };
    document.getElementById("cardBtn").onclick = function () { card(l, r); };
    document.getElementById("againBtn").onclick = function () { step = 0; score = {}; render(); };
  }
  function url() { return location.origin + location.pathname; }
  function say(m) { document.getElementById("shareMsg").textContent = m; }
  function share(l) {
    var text = "I got " + (l.short || l.name) + "! Which region of Leonida are you?";
    if (navigator.share) { navigator.share({ title: "VICEVERSE quiz", text: text, url: url() }).catch(function () {}); return; }
    var full = text + " " + url();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(full).then(function () { say("Copied. Paste it anywhere to share."); }, function () { say(full); });
    else say(full);
  }
  function card(l, r) {
    var c = document.createElement("canvas"); c.width = 1080; c.height = 1350;
    var x = c.getContext("2d"), g = x.createLinearGradient(0, 0, 0, 1350);
    g.addColorStop(0, "#1b1147"); g.addColorStop(.55, "#7a2a7e"); g.addColorStop(1, "#ff5d8f");
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1350);
    x.strokeStyle = "rgba(39,230,255,.25)"; x.lineWidth = 2;
    for (var i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, 900 + i * i * 4); x.lineTo(1080, 900 + i * i * 4); x.stroke(); }
    x.textAlign = "center"; x.fillStyle = "#fff";
    x.font = "700 40px system-ui,sans-serif"; x.fillText("WHICH REGION OF LEONIDA ARE YOU?", 540, 150);
    x.font = "200px system-ui,sans-serif"; x.fillText(l.icon, 540, 520);
    x.font = "italic 900 110px system-ui,sans-serif"; x.fillText((l.short || l.name).toUpperCase(), 540, 700);
    x.fillStyle = "#ffd36b"; x.font = "800 46px system-ui,sans-serif"; x.fillText(r[0].toUpperCase(), 540, 780);
    x.fillStyle = "#fff"; x.font = "400 38px system-ui,sans-serif";
    var words = r[1].split(" "), line = "", y = 880;
    words.forEach(function (w) { var t = line + w + " "; if (x.measureText(t).width > 860) { x.fillText(line.trim(), 540, y); y += 54; line = w + " "; } else line = t; });
    x.fillText(line.trim(), 540, y);
    x.font = "700 34px system-ui,sans-serif"; x.fillStyle = "#27e6ff"; x.fillText("VICEVERSE · " + location.host, 540, 1270);
    x.font = "400 22px system-ui,sans-serif"; x.fillStyle = "rgba(255,255,255,.7)"; x.fillText("Independent fan project. Not affiliated with Rockstar Games.", 540, 1312);
    c.toBlob(function (b) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "viceverse-my-region.png";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      say("Image saved. Post it with a link to this page.");
    });
  }
  root.addEventListener("click", function (e) {
    var b = e.target.closest(".qopt"); if (!b) return;
    var key = Q[step][1][+b.dataset.i][1]; score[key] = (score[key] || 0) + 1; step++; render();
  });
  render();
})();
