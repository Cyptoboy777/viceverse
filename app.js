(function () {
  "use strict";
  var D = window.VV_DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var clamp = function (n, a, b) { return Math.min(b, Math.max(a, n)); };

  /* ---------- storage (falls back to memory if blocked) ---------- */
  var KEY = "viceverse-tracker-v1";
  var mem = {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] === undefined ? null : mem[k]; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  };

  /* ---------- catalogue ---------- */
  var CAT = { location: D.locations, vehicle: D.vehicles, character: D.characters };
  var KIND_LABEL = { location: "Location", vehicle: "Vehicle", character: "Character" };
  var STATUS = {
    confirmed: "Confirmed", reported: "Reported", rumour: "Rumour",
    seen: "Seen in trailers", concept: "Community concept"
  };
  function find(kind, id) {
    var list = CAT[kind] || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  var saved = load();
  function load() {
    var out = [];
    try {
      var raw = JSON.parse(store.get(KEY) || "[]");
      if (Array.isArray(raw)) raw.forEach(function (e) { var ok = validEntry(e); if (ok) out.push(ok); });
    } catch (e) { /* ignore corrupt data */ }
    return out;
  }
  function validEntry(e) {
    if (!e || typeof e.k !== "string") return null;
    var p = e.k.split(":");
    if (p.length !== 2 || !find(p[0], p[1])) return null;
    var t = typeof e.t === "string" && !isNaN(Date.parse(e.t)) ? e.t : new Date().toISOString();
    return { k: e.k, t: t };
  }
  function persist() { store.set(KEY, JSON.stringify(saved)); }
  function isSaved(kind, id) { var k = kind + ":" + id; return saved.some(function (e) { return e.k === k; }); }
  function toggle(key) {
    var p = key.split(":");
    if (!find(p[0], p[1])) return;
    if (saved.some(function (e) { return e.k === key; })) {
      saved = saved.filter(function (e) { return e.k !== key; });
      toast("Removed from your tracker");
    } else {
      saved.push({ k: key, t: new Date().toISOString() });
      toast("Saved to your tracker");
    }
    persist();
    refreshSaved();
  }

  /* ---------- toast ---------- */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg, action) {
    toastEl.textContent = msg;
    toastEl.classList.toggle("act", !!action);
    if (action) {
      var b = document.createElement("button");
      b.textContent = action.label;
      b.addEventListener("click", action.fn);
      toastEl.appendChild(b);
    }
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, action ? 12000 : 2200);
  }

  /* ---------- shared markup ---------- */
  function saveBtn(kind, id) {
    var on = isSaved(kind, id);
    return '<button class="save" data-save="' + kind + ":" + id + '" aria-pressed="' + on + '">' +
      (on ? "✓ Saved" : kind === "location" ? "+ Mark discovered" : "+ Save") + "</button>";
  }
  function badge(status) {
    return '<span class="badge ' + status + '"><i class="dot ' + status + '"></i>' + esc(STATUS[status] || status) + "</span>";
  }
  function dcard(kind, it) {
    var pts = it.points ? "<ul>" + it.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "";
    var more = kind === "location" ? '<button class="save" data-map="' + it.id + '">View on map</button>' : "";
    return '<article class="dcard" style="--glow:' + it.glow + '">' +
      '<div class="dtop"><span class="dicon" aria-hidden="true">' + it.icon + '</span><span class="tag">' + esc(it.tag) + "</span></div>" +
      "<h3>" + esc(it.name) + "</h3>" + badge(it.status) +
      "<p>" + esc(it.desc) + "</p>" + pts +
      '<div class="dbot">' + saveBtn(kind, it.id) + more + "</div></article>";
  }
  function nitem(n) {
    var src = n.url
      ? '<a href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">' + esc(n.source) + " ↗</a>"
      : esc(n.source);
    return '<article class="nitem ' + n.kind + '"><div class="nmeta">' + badge(n.kind) +
      "<time>" + esc(n.dateLabel) + "</time></div><h3>" + esc(n.title) + "</h3><p>" + esc(n.body) +
      '</p><div class="nsrc">Source: ' + src + "</div></article>";
  }

  /* ---------- router ---------- */
  var PAGES = ["home", "map", "vehicles", "characters", "news", "tracker"];
  var TITLES = { home: "VICEVERSE | The World of Leonida", map: "Discovery map", vehicles: "Vehicle index", characters: "Characters", news: "News & rumours", tracker: "My tracker" };
  function route() {
    var id = (location.hash || "#home").slice(1);
    if (PAGES.indexOf(id) < 0) id = "home";
    $$(".page").forEach(function (p) { p.classList.toggle("active", p.id === id); });
    $$("[data-page]").forEach(function (a) {
      var on = a.dataset.page === id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.title = id === "home" ? TITLES.home : TITLES[id] + " | VICEVERSE";
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* ---------- home ---------- */
  var statsShown = false;
  function renderStats() {
    var rows = [[D.locations.length, "REGIONS"], [D.vehicles.length, "VEHICLE ENTRIES"], [D.characters.length, "CHARACTERS"], [saved.length, "YOUR SAVED FINDS"]];
    $("#stats").innerHTML = rows.map(function (s) { return '<div class="stat"><b data-n="' + s[0] + '">' + (statsShown ? s[0] : 0) + "</b><small>" + s[1] + "</small></div>"; }).join("");
    if (!statsShown) {
      statsShown = true;
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      $$("#stats b").forEach(function (el) {
        var n = +el.dataset.n, t0 = performance.now();
        if (reduce || !n) { el.textContent = n; return; }
        (function step(t) { var k = Math.min(1, (t - t0) / 900); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
      });
    }
  }
  function renderTicker() {
    var items = D.news.filter(function (n) { return n.kind !== "rumour" && n.date; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; })
      .map(function (n) { return '<span><i class="' + (n.kind === "reported" ? "r" : "") + '">' + n.kind.toUpperCase() + "</i>" + esc(n.title) + "</span>"; }).join("");
    $("#tickerTrack").innerHTML = items + items;
  }
  function renderLatest() {
    var items = D.news.filter(function (n) { return n.date && n.kind !== "rumour"; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 3);
    $("#latest").innerHTML = items.map(nitem).join("");
  }
  var target = new Date(D.launch.iso).getTime();
  function tick() {
    var ms = target - Date.now();
    var card = $("#countdownCard");
    if (ms <= 0) {
      card.classList.add("live-now");
      $("#cdLabel").textContent = "LAUNCH DAY";
      $("#cdSub").textContent = "GTA VI is scheduled to be out now (" + D.launch.label + "). Check your platform store.";
      return;
    }
    var s = Math.floor(ms / 1000);
    var two = function (n) { return String(n).padStart(2, "0"); };
    $("#cdD").textContent = Math.floor(s / 86400);
    $("#cdH").textContent = two(Math.floor(s % 86400 / 3600));
    $("#cdM").textContent = two(Math.floor(s % 3600 / 60));
    $("#cdS").textContent = two(s % 60);
  }

  /* ---------- locations + map ---------- */
  var locFilter = "all", locQuery = "", selected = null;
  var FILTERS = [["all", "All"], ["urban", "Urban"], ["coastal", "Coastal"], ["wild", "Wilderness"]];
  function renderFilters() {
    $("#mapFilters").innerHTML = FILTERS.map(function (f) {
      return '<button class="chip" data-filter="' + f[0] + '" aria-pressed="' + (locFilter === f[0]) + '">' + f[1] + "</button>";
    }).join("");
  }
  function visibleLocations() {
    var q = locQuery.toLowerCase();
    return D.locations.filter(function (l) {
      return (locFilter === "all" || l.type === locFilter) &&
        (l.name + " " + l.desc + " " + l.tag + " " + l.points.join(" ")).toLowerCase().indexOf(q) >= 0;
    });
  }
  function renderLocGrid() {
    var list = visibleLocations();
    $("#locGrid").innerHTML = list.length ? list.map(function (l) { return dcard("location", l); }).join("") :
      '<div class="empty">No locations match your search.</div>';
  }

  var MW = 400, MH = 560, svg = $("#mapSvg"), view = { x: 0, y: 0, w: MW, h: MH };
  function buildMap() {
    var glows = D.locations.map(function (l, i) {
      return '<radialGradient id="g' + i + '"><stop offset="0" stop-color="' + l.glow + '" stop-opacity=".45"/><stop offset="1" stop-color="' + l.glow + '" stop-opacity="0"/></radialGradient>';
    }).join("");
    var zones = D.locations.map(function (l, i) {
      return '<circle cx="' + l.map.x + '" cy="' + l.map.y + '" r="52" fill="url(#g' + i + ')"/>';
    }).join("");
    var grid = "";
    for (var x = 0; x <= MW; x += 40) grid += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + MH + '"/>';
    for (var y = 0; y <= MH; y += 40) grid += '<line x1="0" y1="' + y + '" x2="' + MW + '" y2="' + y + '"/>';
    var keys = [[170, 498, -12], [200, 507, -6], [232, 514, 0], [266, 516, 4], [300, 511, 10]].map(function (k) {
      return '<ellipse cx="' + k[0] + '" cy="' + k[1] + '" rx="15" ry="5.5" transform="rotate(' + k[2] + " " + k[0] + " " + k[1] + ')"/>';
    }).join("");
    svg.innerHTML =
      "<defs>" + glows +
      '<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#080c26"/><stop offset="1" stop-color="#0b1442"/></linearGradient>' +
      '<linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b1f58"/><stop offset="1" stop-color="#4a2370"/></linearGradient></defs>' +
      '<rect width="400" height="560" fill="url(#sea)"/>' +
      '<g stroke="#27e6ff" stroke-opacity=".07" stroke-width="1">' + grid + "</g>" +
      '<path d="M105 60C150 40 260 38 302 52C312 100 322 150 332 205C342 255 352 300 356 350C360 400 352 440 332 462C312 480 286 470 262 450C236 428 224 406 212 378C198 346 176 318 150 296C122 272 108 240 102 200C96 150 98 100 105 60Z" fill="url(#land)" stroke="#ff3d9a" stroke-opacity=".7" stroke-width="1.6"/>' +
      '<path d="M300 62C314 150 336 300 342 400" fill="none" stroke="#27e6ff" stroke-opacity=".25" stroke-dasharray="4 5"/>' +
      '<g fill="url(#land)" stroke="#ff3d9a" stroke-opacity=".6" stroke-width="1.2">' + keys + "</g>" +
      zones + '<g id="pins"></g>' +
      '<text x="12" y="22" text-anchor="start" font-size="9" fill="#aaa4c8" letter-spacing="2" font-weight="800">N ↑</text>';
    renderPins();
  }
  function renderPins() {
    $("#pins", svg).innerHTML = D.locations.map(function (l) {
      var on = isSaved("location", l.id), name = l.short || l.name;
      var dim = locFilter !== "all" && l.type !== locFilter;
      return '<g class="pin' + (selected === l.id ? " sel" : "") + (dim ? " dim" : "") + '" data-id="' + l.id + '" tabindex="0" role="button" aria-label="' + esc(l.name + ", " + l.tag + (on ? ", discovered" : "")) + '" transform="translate(' + l.map.x + " " + l.map.y + ')">' +
        '<circle class="pulse" r="12" fill="' + l.glow + '" opacity=".5"/><circle r="24" fill="transparent"/>' +
        '<circle class="ring" r="13" fill="#0a0620" stroke="' + l.glow + '" stroke-width="2"/>' +
        '<text y="5" text-anchor="middle" font-size="13">' + l.icon + "</text>" +
        '<text y="31" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" stroke="#06091a" stroke-width="3" paint-order="stroke">' + esc(name) + "</text>" +
        (on ? '<g transform="translate(10 -10)"><circle r="6.5" fill="#4dffb0"/><path d="M-3 0l2 2.2L3.2-2" stroke="#04140c" stroke-width="1.8" fill="none"/></g>' : "") +
        "</g>";
    }).join("");
  }
  function renderPanel() {
    var p = $("#mapPanel"), l = selected && find("location", selected);
    if (!l) {
      p.innerHTML = '<p class="eyebrow">NO REGION SELECTED</p><p class="hint">Tap a pin on the map to see what is known about that region. The six regions shown are named by Rockstar. Their exact positions are approximate.</p>';
      return;
    }
    p.innerHTML = '<p class="eyebrow">' + esc(l.tag.toUpperCase()) + "</p><h3>" + esc(l.name) + "</h3>" + badge(l.status) +
      "<p class=\"hint\">" + esc(l.desc) + "</p><ul>" + l.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
      '</ul><div class="dbot">' + saveBtn("location", l.id) + "</div>";
  }
  function setView() {
    view.w = clamp(view.w, 110, MW); view.h = view.w * MH / MW;
    view.x = clamp(view.x, 0, MW - view.w); view.y = clamp(view.y, 0, MH - view.h);
    svg.setAttribute("viewBox", view.x + " " + view.y + " " + view.w + " " + view.h);
  }
  function zoomAt(f, px, py) {
    var nw = clamp(view.w * f, 110, MW), r = nw / view.w;
    view.x = px - (px - view.x) * r; view.y = py - (py - view.y) * r; view.w = nw; setView();
  }
  function toSvg(cx, cy) {
    var r = svg.getBoundingClientRect();
    return [view.x + (cx - r.left) / r.width * view.w, view.y + (cy - r.top) / r.height * view.h];
  }
  function select(id, focus) {
    selected = id; renderPins(); renderPanel();
    var l = find("location", id);
    if (l && focus) {
      view.w = Math.min(view.w, 260); view.h = view.w * MH / MW;
      view.x = l.map.x - view.w / 2; view.y = l.map.y - view.h / 2; setView();
    }
  }
  function initMapInteractions() {
    var ptrs = {}, moved = false, startPan = null, lastDist = 0;
    svg.addEventListener("pointerdown", function (e) {
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY };
      moved = false; lastDist = 0;
    });
    svg.addEventListener("pointermove", function (e) {
      var p = ptrs[e.pointerId]; if (!p) return;
      var ids = Object.keys(ptrs);
      if (ids.length === 2) {
        var a = ptrs[ids[0]], b = ptrs[ids[1]];
        p.x = e.clientX; p.y = e.clientY;
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        if (lastDist) { var m = toSvg((a.x + b.x) / 2, (a.y + b.y) / 2); zoomAt(lastDist / d, m[0], m[1]); }
        lastDist = d; moved = true; return;
      }
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (!moved && Math.hypot(e.clientX - p.sx, e.clientY - p.sy) < 6) return;
      if (!moved) { moved = true; svg.classList.add("dragging"); try { svg.setPointerCapture(e.pointerId); } catch (x) {} }
      var r = svg.getBoundingClientRect();
      view.x -= dx * view.w / r.width; view.y -= dy * view.h / r.height; setView();
      p.x = e.clientX; p.y = e.clientY;
    });
    function end(e) { delete ptrs[e.pointerId]; lastDist = 0; svg.classList.remove("dragging"); }
    svg.addEventListener("pointerup", end);
    svg.addEventListener("pointercancel", end);
    svg.addEventListener("click", function (e) {
      if (moved) { moved = false; e.stopPropagation(); return; }
      var pin = e.target.closest(".pin"); if (pin) select(pin.dataset.id, true);
    }, true);
    svg.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var pin = e.target.closest(".pin"); if (pin) { e.preventDefault(); select(pin.dataset.id, true); }
    });
    svg.addEventListener("wheel", function (e) {
      e.preventDefault(); var m = toSvg(e.clientX, e.clientY); zoomAt(e.deltaY > 0 ? 1.15 : 0.87, m[0], m[1]);
    }, { passive: false });
    $("#zIn").addEventListener("click", function () { zoomAt(0.75, view.x + view.w / 2, view.y + view.h / 2); });
    $("#zOut").addEventListener("click", function () { zoomAt(1.33, view.x + view.w / 2, view.y + view.h / 2); });
    $("#zReset").addEventListener("click", function () { view = { x: 0, y: 0, w: MW, h: MH }; setView(); });
  }

  /* ---------- vehicles / characters ---------- */
  function renderVehicles() {
    var q = $("#vehSearch").value.toLowerCase(), c = $("#vehClass").value, s = $("#vehStatus").value;
    var list = D.vehicles.filter(function (v) {
      return (c === "all" || v.type === c) && (s === "all" || v.status === s) &&
        (v.name + " " + v.desc + " " + v.tag).toLowerCase().indexOf(q) >= 0;
    });
    $("#vehCount").textContent = "Showing " + list.length + " of " + D.vehicles.length + " entries";
    $("#vehGrid").innerHTML = list.length ? list.map(function (v) { return dcard("vehicle", v); }).join("") :
      '<div class="empty">No vehicles match. Try clearing a filter.</div>';
  }
  function renderChars() {
    var q = $("#charSearch").value.toLowerCase(), g = $("#charGroup").value;
    var list = D.characters.filter(function (v) {
      return (g === "all" || v.group === g) && (v.name + " " + v.desc + " " + v.tag).toLowerCase().indexOf(q) >= 0;
    });
    $("#charCount").textContent = "Showing " + list.length + " of " + D.characters.length + " characters";
    $("#charGrid").innerHTML = list.length ? list.map(function (v) { return dcard("character", v); }).join("") :
      '<div class="empty">No characters match your search.</div>';
  }

  /* ---------- news ---------- */
  var newsTab = "confirmed";
  var TAB_NOTE = {
    confirmed: "",
    reported: '<div class="notice">These items come from credible outlets but are not confirmed by Rockstar. They may change.</div>',
    rumour: '<div class="notice"><b>Unverified.</b> Nothing here is confirmed. Please do not share these as facts.</div>'
  };
  function renderNews() {
    var tabs = ["confirmed", "reported", "rumour"];
    $("#newsTabs").innerHTML = tabs.map(function (t) {
      var n = D.news.filter(function (x) { return x.kind === t; }).length;
      return '<button role="tab" id="tab-' + t + '" aria-selected="' + (newsTab === t) + '" data-tab="' + t + '">' + STATUS[t] + ' <span class="n">' + n + "</span></button>";
    }).join("");
    var items = D.news.filter(function (x) { return x.kind === newsTab; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    $("#newsList").setAttribute("aria-labelledby", "tab-" + newsTab);
    $("#newsList").innerHTML = TAB_NOTE[newsTab] + items.map(nitem).join("");
  }

  /* ---------- tracker ---------- */
  function renderTracker() {
    $("#trkProgress").innerHTML = Object.keys(CAT).map(function (k) {
      var total = CAT[k].length, n = saved.filter(function (e) { return e.k.indexOf(k + ":") === 0; }).length;
      return '<div class="prog"><div class="top"><span>' + KIND_LABEL[k] + "s</span><span>" + n + " / " + total +
        '</span></div><div class="bar"><i style="width:' + Math.round(n / total * 100) + '%"></i></div></div>';
    }).join("");
    var list = saved.slice().sort(function (a, b) { return a.t < b.t ? 1 : -1; });
    $("#trkList").innerHTML = list.length ? list.map(function (e) {
      var p = e.k.split(":"), it = find(p[0], p[1]);
      return '<div class="tentry"><div><b>' + esc(it.name) + "</b><small>" + KIND_LABEL[p[0]] + " · saved " +
        esc(new Date(e.t).toLocaleDateString()) + '</small></div><button data-rm="' + esc(e.k) + '" aria-label="Remove ' + esc(it.name) + '">Remove ✕</button></div>';
    }).join("") : '<div class="empty">Your tracker is empty.<br>Save a location, vehicle or character to start your personal log.</div>';
  }

  function refreshSaved() {
    $$("[data-save]").forEach(function (b) {
      var p = b.dataset.save.split(":"), on = isSaved(p[0], p[1]);
      b.setAttribute("aria-pressed", on);
      b.textContent = on ? "✓ Saved" : p[0] === "location" ? "+ Mark discovered" : "+ Save";
    });
    renderStats(); renderTracker(); renderPins();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.save) toggle(t.dataset.save);
    else if (t.dataset.rm) toggle(t.dataset.rm);
    else if (t.dataset.filter) { locFilter = t.dataset.filter; renderFilters(); renderPins(); renderLocGrid(); }
    else if (t.dataset.tab) { newsTab = t.dataset.tab; renderNews(); }
    else if (t.dataset.map) {
      select(t.dataset.map, true);
      $(".map-wrap").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  $("#locSearch").addEventListener("input", function (e) { locQuery = e.target.value; renderLocGrid(); });
  ["#vehSearch", "#vehClass", "#vehStatus"].forEach(function (s) { $(s).addEventListener("input", renderVehicles); });
  ["#charSearch", "#charGroup"].forEach(function (s) { $(s).addEventListener("input", renderChars); });

  $("#clrBtn").addEventListener("click", function () {
    if (saved.length && confirm("Clear all saved entries from this device?")) { saved = []; persist(); refreshSaved(); toast("Tracker cleared"); }
  });
  $("#expBtn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify({ app: "viceverse", version: 1, saved: saved }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "viceverse-tracker.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast("Tracker exported");
  });
  $("#impBtn").addEventListener("click", function () { $("#impFile").click(); });
  $("#impFile").addEventListener("change", function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var data = JSON.parse(r.result), arr = Array.isArray(data) ? data : data.saved, added = 0;
        if (!Array.isArray(arr)) throw new Error("bad file");
        arr.forEach(function (x) {
          var ok = validEntry(x);
          if (ok && !saved.some(function (s) { return s.k === ok.k; })) { saved.push(ok); added++; }
        });
        persist(); refreshSaved(); toast(added + " entr" + (added === 1 ? "y" : "ies") + " imported");
      } catch (err) { toast("That file is not a valid tracker export"); }
    };
    r.readAsText(f); e.target.value = "";
  });

  /* ---------- PWA: install, offline, updates ---------- */
  var deferred = null, installBtn = $("#installBtn");
  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; if (!standalone) installBtn.hidden = false; });
  installBtn.addEventListener("click", function () {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.then(function () { deferred = null; installBtn.hidden = true; });
  });
  window.addEventListener("appinstalled", function () { installBtn.hidden = true; toast("VICEVERSE installed"); });

  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  if (isIOS && !standalone && store.get("vv-ios-hint") !== "1") {
    setTimeout(function () { $("#iosHint").hidden = false; }, 3500);
  }
  $("#iosClose").addEventListener("click", function () { $("#iosHint").hidden = true; store.set("vv-ios-hint", "1"); });

  function netState() { $("#offlinePill").hidden = navigator.onLine; }
  window.addEventListener("online", function () { netState(); toast("Back online"); });
  window.addEventListener("offline", function () { netState(); toast("You are offline. Saved content still works."); });
  netState();

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").then(function (reg) {
        reg.addEventListener("updatefound", function () {
          var w = reg.installing;
          w.addEventListener("statechange", function () {
            if (w.state === "installed" && navigator.serviceWorker.controller) {
              toast("A new version is ready.", { label: "Reload", fn: function () { w.postMessage("SKIP_WAITING"); } });
            }
          });
        });
      }).catch(function () {});
      var reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", function () { if (!reloaded) { reloaded = true; location.reload(); } });
    });
  }

  /* ---------- automatic news (optional): fetched from the public GitHub repo ---------- */
  function loadAuto() {
    var url = (window.VV_CONFIG || {}).newsFeedUrl;
    if (!url || !/^https:\/\//.test(url)) return;
    var CK = "vv-auto-news-v1", base = D.news.slice();
    function clean(list) {
      var out = [];
      (Array.isArray(list) ? list : []).slice(0, 30).forEach(function (n) {
        if (!n || (n.kind !== "confirmed" && n.kind !== "reported")) return;
        if (typeof n.id !== "string" || typeof n.title !== "string" || typeof n.body !== "string") return;
        if (typeof n.url !== "string" || n.url.indexOf("https://") !== 0) return;
        out.push({ id: n.id.slice(0, 40), kind: n.kind, date: String(n.date || "").slice(0, 30), dateLabel: String(n.dateLabel || "").slice(0, 30),
          title: n.title.slice(0, 140), body: n.body.slice(0, 500), source: String(n.source || "").slice(0, 60), url: n.url });
      });
      return out;
    }
    function apply(list) { D.news = base.concat(list); renderTicker(); renderLatest(); renderNews(); }
    try { apply(clean(JSON.parse(store.get(CK) || "[]"))); } catch (e) { /* no cache yet */ }
    fetch(url, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { var c = clean(j && j.items); store.set(CK, JSON.stringify(c)); apply(c); })
      .catch(function () { /* offline or feed unavailable: keep what we have */ });
  }

  /* ---------- boot ---------- */
  $("#reviewed").textContent = D.reviewed;
  renderStats(); renderTicker(); renderLatest(); renderFilters(); renderLocGrid();
  buildMap(); initMapInteractions(); renderPanel();
  renderVehicles(); renderChars(); renderNews(); renderTracker();
  tick(); setInterval(tick, 1000);
  loadAuto();
  route();
})();
