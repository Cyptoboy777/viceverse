/* VICEVERSE Daily: 5 questions a day, same for everyone, streak saved on this device.
   Every question comes from facts on our Guides pages. First answer is the correct one in the data;
   options are shuffled at runtime. */
(function () {
  "use strict";
  var root = document.getElementById("daily");
  var POOL = [
    ["What is the launch date of GTA VI?", ["19 November 2026", "26 May 2026", "1 January 2027", "31 October 2026"]],
    ["Which region is centred on a sugar refinery?", ["Ambrosia", "Grassrivers", "Port Gellhorn", "Mount Kalaga"]],
    ["Which region is Leonida's wetlands?", ["Grassrivers", "Ambrosia", "Leonida Keys", "Vice City"]],
    ["Which region is a former tourist destination in decline?", ["Port Gellhorn", "Vice City", "Leonida Keys", "Ambrosia"]],
    ["Which region is the home of Jason Duval?", ["Leonida Keys", "Ambrosia", "Mount Kalaga", "Vice City"]],
    ["Where did Lucia Caminos serve time?", ["Leonida Penitentiary", "Port Gellhorn Jail", "Ambrosia Correctional", "Keys Detention Centre"]],
    ["Who likes listening in on Coast Guard communications?", ["Cal Hampton", "Brian Heder", "Raul Bautista", "Boobie Ike"]],
    ["Who lets Jason live rent-free in exchange for help with shakedowns?", ["Brian Heder", "Cal Hampton", "Boobie Ike", "Raul Bautista"]],
    ["Which label are the Real Dimez signed to?", ["Only Raw Records", "Vice Beats", "Leonida Sound", "Ocean Records"]],
    ["Who built businesses in real estate, a strip club and a recording studio?", ["Boobie Ike", "Dre'Quan Priest", "Raul Bautista", "Cal Hampton"]],
    ["Which character is a bank robber who takes big risks for big rewards?", ["Raul Bautista", "Brian Heder", "Dre'Quan Priest", "Jason Duval"]],
    ["What is the wilderness region on the northern border called?", ["Mount Kalaga National Park", "Grassrivers Reserve", "Ambrosia Forest", "Port Gellhorn Wilds"]],
    ["Which neighbourhoods are named in official Vice City material?", ["Ocean Beach and Little Cuba", "Sunset Hills and Old Port", "Downtown Keys and Marina Bay", "Palm Row and Sugar Hill"]],
    ["How many regions does Rockstar name for Leonida?", ["Six", "Four", "Eight", "Ten"]],
    ["When does Xbox Cloud Gaming start streaming on launch day?", ["1am ET on 19 November", "Noon ET on 18 November", "Midnight GMT on 20 November", "6pm ET on 19 November"]],
    ["What is the Microsoft Store price listed for the Standard Edition?", ["$79.99", "$59.99", "$99.99", "$69.99"]],
    ["Who is the fighter trained by her father?", ["Lucia Caminos", "Roxy", "Bae-Luxe", "Cal Hampton"]],
    ["What did Jason Duval do before his current situation?", ["Served in the Army, then worked for drug runners", "Ran a recording studio", "Worked as a park ranger", "Robbed banks full time"]],
    ["What career did Dre'Quan Priest always want?", ["Music", "Politics", "Fishing guide", "Professional boxing"]],
    ["Which region has a local biker gang?", ["Ambrosia", "Vice City", "Leonida Keys", "Grassrivers"]],
    ["Which activities are linked to Mount Kalaga?", ["Hunting, fishing and off-road trails", "Boat parties and scuba", "Nightclubs and shopping", "Sugar refining"]],
    ["Which dangerous wildlife is linked to Grassrivers?", ["Alligators", "Sharks", "Bears", "Rattlesnake swarms only"]],
    ["What comes with pre-orders placed before the end of launch day (Microsoft Store)?", ["Vintage Vice City Pack and one month of GTA+", "A free console", "Early access to the sequel", "A printed map only"]],
    ["On VICEVERSE, what label means a credible outlet reported it but Rockstar has not confirmed it?", ["Reported", "Confirmed", "Rumour", "Official"]],
    ["What was the earlier release date before the move to 19 November 2026?", ["26 May 2026", "1 March 2026", "15 August 2026", "31 December 2025"]],
    ["Which region is known for boat parties, dive bars and scuba diving?", ["Leonida Keys", "Grassrivers", "Ambrosia", "Mount Kalaga"]]
  ];
  var KEY = "vv-daily-v1", PER = 5;

  function store(v) { try { if (v === undefined) return localStorage.getItem(KEY); localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } return null; }
  function load() { try { var d = JSON.parse(store() || "{}"); return { streak: d.streak | 0, best: d.best | 0, last: d.last || "", days: d.days || {} }; } catch (e) { return { streak: 0, best: 0, last: "", days: {} }; } }
  var S = load();
  function two(n) { return n < 10 ? "0" + n : "" + n; }
  function ymd(d) { return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate()); }
  var today = ymd(new Date());
  function yesterday() { var d = new Date(); d.setDate(d.getDate() - 1); return ymd(d); }

  function xmur3(s) { for (var i = 0, h = 1779033703 ^ s.length; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return (h ^= h >>> 16) >>> 0; }; }
  function rng(s) { var a = xmur3(s)(); return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var ids = shuffle(POOL.map(function (_, i) { return i; }), rng("day:" + today)).slice(0, PER);
  var qs = ids.map(function (i) {
    var item = POOL[i], opts = shuffle(item[1], rng("opt:" + today + ":" + i));
    return { q: item[0], opts: opts, ans: item[1][0] };
  });
  var step = 0, grid = "", score = 0, locked = false;

  function head() { return '<p class="eyebrow">DAILY · ' + esc(today) + '</p>'; }
  function play() {
    var q = qs[step];
    root.innerHTML = head() + '<div class="bar" aria-hidden="true"><i style="width:' + (step / PER * 100) + '%"></i></div>' +
      '<p class="eyebrow" style="margin-top:14px">QUESTION ' + (step + 1) + " OF " + PER + "</p>" +
      '<h2 style="margin:6px 0 14px;font-size:22px">' + esc(q.q) + '</h2><div class="stack" id="opts">' +
      q.opts.map(function (o, i) { return '<button class="btn ghost qopt" data-i="' + i + '" style="justify-content:flex-start;text-align:left;min-height:54px;white-space:normal">' + esc(o) + "</button>"; }).join("") +
      '</div><div id="fb" role="status" style="min-height:28px;font-weight:700"></div><button class="btn primary" id="next" hidden>' + (step === PER - 1 ? "See result" : "Next") + "</button>";
    locked = false;
  }
  function pick(i) {
    if (locked) return; locked = true;
    var q = qs[step], ok = q.opts[i] === q.ans;
    if (ok) score++;
    grid += ok ? "🟩" : "🟥";
    Array.prototype.forEach.call(root.querySelectorAll(".qopt"), function (b, k) {
      b.disabled = true;
      if (q.opts[k] === q.ans) { b.style.borderColor = "#4dffb0"; b.style.background = "rgba(77,255,176,.12)"; }
      else if (k === i) { b.style.borderColor = "#ff8fa8"; b.style.background = "rgba(255,143,168,.1)"; }
    });
    document.getElementById("fb").textContent = ok ? "Correct!" : "Answer: " + q.ans;
    var n = document.getElementById("next"); n.hidden = false; n.focus();
  }
  function finish() {
    if (S.last === yesterday()) S.streak += 1; else S.streak = 1;
    S.last = today; S.best = Math.max(S.best, S.streak);
    S.days[today] = { s: score, g: grid };
    var keys = Object.keys(S.days).sort(); while (keys.length > 60) delete S.days[keys.shift()];
    store(JSON.stringify(S)); done();
  }
  function done() {
    var d = S.days[today];
    root.innerHTML = head() + '<div class="card" style="text-align:center;padding:26px 16px"><div style="font-size:46px;line-height:1.2;letter-spacing:4px" aria-label="Your result">' + d.g + '</div>' +
      '<h2 style="margin:10px 0 2px">' + d.s + " / " + PER + '</h2><p style="color:var(--muted);margin:0">🔥 Streak: <b>' + S.streak + '</b> day' + (S.streak === 1 ? "" : "s") + " · Best: " + S.best + '</p></div>' +
      '<div class="row" style="margin:16px 0"><button class="btn primary" id="shareBtn">Share my score</button><a class="btn ghost" href="quiz.html">Try the region quiz</a></div>' +
      '<p class="fine" id="shareMsg" role="status"></p><p class="fine">Next questions in <b id="cd">--:--:--</b>. Learn the answers in our <a class="text-link" href="guides/index.html">guides</a>.</p>';
    document.getElementById("shareBtn").onclick = function () { share(d); };
    tick(); setInterval(tick, 1000);
  }
  function tick() {
    var el = document.getElementById("cd"); if (!el) return;
    var n = new Date(), m = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1), s = Math.max(0, Math.floor((m - n) / 1000));
    el.textContent = two(Math.floor(s / 3600)) + ":" + two(Math.floor(s % 3600 / 60)) + ":" + two(s % 60);
  }
  function share(d) {
    var text = "VICEVERSE Daily " + today + " " + d.s + "/" + PER + "\n" + d.g + "\n🔥 Streak " + S.streak;
    var url = location.origin + location.pathname;
    if (navigator.share) { navigator.share({ title: "VICEVERSE Daily", text: text, url: url }).catch(function () {}); return; }
    var full = text + "\n" + url, msg = document.getElementById("shareMsg");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(full).then(function () { msg.textContent = "Copied. Paste it anywhere."; }, function () { msg.textContent = full; });
    else msg.textContent = full;
  }
  root.addEventListener("click", function (e) {
    var b = e.target.closest(".qopt"); if (b) return pick(+b.dataset.i);
    if (e.target.id === "next") { step++; if (step >= PER) finish(); else play(); }
  });
  if (S.days[today]) { grid = S.days[today].g; done(); } else play();
})();
