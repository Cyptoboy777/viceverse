/* Shows the confirmed Xbox Cloud Gaming start (1am ET, 19 Nov 2026 = 06:00 UTC) in the visitor's own time zone. */
(function () {
  "use strict";
  var START = Date.UTC(2026, 10, 19, 6, 0, 0);
  var sel = document.getElementById("zone"), out = document.getElementById("localTime"), cd = document.getElementById("localCd");
  var mine; try { mine = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { mine = "UTC"; }
  var zones = [];
  try { zones = Intl.supportedValuesOf("timeZone"); } catch (e) { zones = ["UTC", "America/New_York", "Europe/London", "Asia/Kolkata", "Australia/Sydney"]; }
  if (zones.indexOf(mine) < 0) zones.unshift(mine);
  sel.innerHTML = zones.map(function (z) { return '<option value="' + z + '"' + (z === mine ? " selected" : "") + ">" + z.replace(/_/g, " ") + "</option>"; }).join("");

  function fmt(z) {
    try { return new Intl.DateTimeFormat("en-GB", { timeZone: z, weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short" }).format(new Date(START)); }
    catch (e) { return new Date(START).toUTCString(); }
  }
  function show() { out.textContent = fmt(sel.value); }
  function tick() {
    var s = Math.floor((START - Date.now()) / 1000);
    if (s <= 0) { cd.textContent = "Cloud streaming should be live now. Check Xbox for the latest."; return; }
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    cd.textContent = d + " days, " + h + " hours, " + m + " minutes from now";
  }
  sel.addEventListener("change", show);
  show(); tick(); setInterval(tick, 30000);
})();
