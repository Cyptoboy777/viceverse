/* Generates the static, crawlable pages (guides + legal), sitemap.xml and robots.txt.
   Usage:  SITE_URL=https://your-site.pages.dev CONTACT_EMAIL=you@example.com node tools/build.js
   Run it again after editing any content below, then commit the generated files. */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const SITE = (process.env.SITE_URL || "https://YOUR-SITE.pages.dev").replace(/\/$/, "");
const EMAIL = process.env.CONTACT_EMAIL || "";
const UPDATED = "2026-11-15", UPDATED_LABEL = "15 Nov 2026";

const guides = [
  {
    slug: "release-date-and-editions",
    title: "GTA VI release date, editions and pre-order bonuses",
    desc: "What is confirmed about the GTA VI launch on 19 November 2026: platforms, cloud streaming, editions, prices and pre-order bonuses, plus what is only reported.",
    blurb: "What is confirmed, what is only reported, and where to check.",
    body: `
<p>Grand Theft Auto VI launches on <b>Thursday, 19 November 2026</b>. This page collects what Rockstar and the platform holders have confirmed, and separates it from what outlets only report. We review it regularly and mark the date at the top.</p>
<ul class="facts">
<li><b>Release date:</b> 19 November 2026, announced by Rockstar after an earlier move from 26 May 2026.</li>
<li><b>Xbox cloud play:</b> streaming on Xbox One and Xbox Series X|S through Xbox Cloud Gaming from 1am ET on 19 November (Xbox Wire, 10 Nov 2026).</li>
<li><b>Pre-install:</b> Xbox Series X|S owners can pre-install the game now. Xbox One can only stream it.</li>
<li><b>Listed prices (Microsoft Store):</b> Standard Edition $79.99, Ultimate Edition $99.99.</li>
<li><b>Pre-order bonus:</b> orders placed before 23:59:59 on 19 November include the Vintage Vice City Pack and one month of GTA+.</li>
</ul>
<div class="callout">Prices, bonuses and availability can differ by store and region. Always confirm on your own store page before you buy.</div>

<h2>How you can play</h2>
<p>The game was announced for the current console generation. On Xbox, Series X|S owners can install it natively, while Xbox One players can stream it through the cloud. According to Xbox, cloud streaming uses Xbox Series S graphics settings, and players in supported markets can buy cloud playtime without a Game Pass subscription starting 11 November.</p>
<p>A PC version has not been announced in the sources we reviewed. Fans often expect one eventually, but that is speculation, so treat any PC date you see online as a guess.</p>

<h2>Editions and the pre-order pack</h2>
<p>The Microsoft Store lists two editions: Standard at $79.99 and Ultimate at $99.99. The Vintage Vice City Pack and a month of GTA+ come with pre-orders made before the end of launch day. We do not list what is inside Ultimate beyond the price, because we have not confirmed a full contents list from a first-party source.</p>

<h2>When does it unlock?</h2>
<p>Several outlets report that the game unlocks at midnight local time in each region, which would let earlier time zones start first. Outlets differ on details and it could change, so this is labelled <i>reported</i>, not confirmed. The Xbox cloud start time of 1am ET on 19 November is confirmed by Xbox.</p>

<h2>Has the game gone gold?</h2>
<p>One outlet reported on 15 November that development is complete and the launch is on track. We have not seen a Rockstar statement, and games can still slip after reaching gold, so treat it as a report.</p>

<h2>Frequently asked questions</h2>
<div class="faq">
<details><summary>What is the GTA VI release date?</summary><p>19 November 2026, per Rockstar's announcement.</p></details>
<details><summary>Can I play on Xbox One?</summary><p>Only by streaming through Xbox Cloud Gaming, according to Xbox Wire. Native installs are for Series X|S.</p></details>
<details><summary>How much does it cost?</summary><p>The Microsoft Store lists $79.99 for Standard and $99.99 for Ultimate. Other stores and regions can differ.</p></details>
<details><summary>Is there a PC version?</summary><p>None has been announced in the sources we reviewed.</p></details>
<details><summary>Where do I check the latest news?</summary><p>See our <a href="../index.html#news">News page</a>, which separates confirmed, reported and rumoured items.</p></details>
</div>
<p><b>Sources:</b> <a href="https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026" rel="noopener" target="_blank">Rockstar Newswire</a>, <a href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" rel="noopener" target="_blank">Xbox Wire</a>, <a href="https://egamers.io/gta-6-goes-gold-putting-the-november-19-launch-on-track/" rel="noopener" target="_blank">eGamers.io</a>.</p>`
  },
  {
    slug: "leonida-regions-guide",
    title: "Leonida regions explained: all six areas of GTA VI",
    desc: "A plain-English guide to the six official regions of Leonida: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.",
    blurb: "All six regions and what we actually know about each.",
    body: `
<p>The world of GTA VI is the fictional US state of Leonida. Rockstar's official site names six regions. This guide summarises what is known about each one, in our own words, and says clearly where details are not confirmed. You can also explore them on the <a href="../index.html#map">interactive map</a>.</p>

<h2>Vice City</h2>
<p>The series' return to a classic setting: a neon-lit coastal metropolis built around nightlife, excess and heavy traffic. Neighbourhoods mentioned in official material include Ocean Beach and Little Cuba, and the city has a major cruise port.</p>

<h2>Leonida Keys</h2>
<p>A tropical island chain with boat parties, dive bars and underwater areas for scuba diving. It is the home region of Jason Duval, one of the two protagonists.</p>

<h2>Grassrivers</h2>
<p>Leonida's wetlands. Expect stilt-house communities, alligators and other dangerous wildlife, with alligator hunting among the activities shown.</p>

<h2>Port Gellhorn</h2>
<p>A once-popular tourist destination that has fallen into decline. It has abandoned attractions and a growing drug trade.</p>

<h2>Ambrosia</h2>
<p>An industrial region centred on a sugar refinery, where a local biker gang enforces its own rules.</p>

<h2>Mount Kalaga National Park</h2>
<p>A large wilderness along the northern border of the state, with hunting, fishing and off-road trails, plus isolated residents in the backwoods.</p>

<h2>What is not confirmed</h2>
<div class="callout">Region names and descriptions are official. The <b>exact positions, sizes and borders</b> are not. The VICEVERSE map is a schematic that places the regions by rough relative position, so use it for orientation, not navigation. More small areas are expected beyond these six.</div>

<h2>Frequently asked questions</h2>
<div class="faq">
<details><summary>How many regions are there?</summary><p>Rockstar names six: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga National Park.</p></details>
<details><summary>Is the VICEVERSE map official?</summary><p>No. It is an unofficial schematic made by fans. Positions are approximate.</p></details>
<details><summary>Is Vice City the only city?</summary><p>It is the main metropolis named, but other towns and areas exist, such as Port Gellhorn.</p></details>
</div>
<p><b>Sources:</b> <a href="https://www.rockstargames.com/VI" rel="noopener" target="_blank">Rockstar Games (official site)</a>, <a href="https://www.gamesradar.com/games/grand-theft-auto/gta-6-locations" rel="noopener" target="_blank">GamesRadar</a>.</p>`
  },
  {
    slug: "characters-guide",
    title: "GTA VI characters: who is who in Leonida",
    desc: "Meet the confirmed GTA VI cast: Lucia Caminos, Jason Duval, Cal Hampton, Brian Heder, Boobie Ike, Dre'Quan Priest, the Real Dimez and Raul Bautista.",
    blurb: "Protagonists and the people around them, spoiler-free.",
    body: `
<p>This is a spoiler-free guide to the characters Rockstar has introduced on its official site, written in our own words. Browse them any time in the <a href="../index.html#characters">Characters</a> section, where you can also save your favourites.</p>

<h2>The protagonists</h2>
<h3>Lucia Caminos</h3>
<p>A fighter trained by her father. She has spent time in Leonida Penitentiary and wants to build the life her mother always dreamed of for her.</p>
<h3>Jason Duval</h3>
<p>Raised in the Keys among criminals, Jason served in the Army and then worked for local drug runners. He may be ready for a change.</p>

<h2>In the Keys</h2>
<h3>Cal Hampton</h3>
<p>Jason's friend, happiest at home listening in on Coast Guard communications.</p>
<h3>Brian Heder</h3>
<p>An older drug runner from the Keys' smuggling era. He lets Jason live rent-free in exchange for help with local shakedowns.</p>

<h2>In Vice City</h2>
<h3>Boobie Ike</h3>
<p>A businessman with interests in real estate, a strip club and a recording studio, and a stake in a label partnership with Dre'Quan.</p>
<h3>Dre'Quan Priest</h3>
<p>A hustler who always wanted a music career and has signed the Real Dimez to his label.</p>
<h3>Bae-Luxe and Roxy (Real Dimez)</h3>
<p>High-school friends who turned shaking down dealers into a rap career. They have a strong social media presence and are signed to Only Raw Records.</p>

<h2>The crew</h2>
<h3>Raul Bautista</h3>
<p>A bank robber who takes big risks for big rewards. His crew will have to escalate or back out.</p>

<h2>Frequently asked questions</h2>
<div class="faq">
<details><summary>Who are the main characters?</summary><p>Lucia Caminos and Jason Duval are the two protagonists.</p></details>
<details><summary>Are these descriptions official?</summary><p>They are based on Rockstar's official character profiles, summarised in our own words.</p></details>
</div>
<p><b>Sources:</b> <a href="https://www.rockstargames.com/VI" rel="noopener" target="_blank">Rockstar Games (official site)</a>, <a href="https://www.videogameschronicle.com/news/gta-6s-cast-of-characters-revealed-including-a-conspiracy-theorist-and-strip-club-gangster" rel="noopener" target="_blank">Video Games Chronicle</a>.</p>`
  },
  {
    slug: "confirmed-vs-rumour",
    title: "Confirmed, reported or rumour? How to check GTA VI news",
    desc: "A simple checklist for telling confirmed GTA VI news from rumours, and how VICEVERSE labels every item.",
    blurb: "Our labels, plus a 5-step checklist before you share anything.",
    body: `
<p>Launch week is full of claims. Some are official, some come from credible reporters, and some are made up for clicks. VICEVERSE labels every news item so you can tell the difference at a glance.</p>

<h2>Our three labels</h2>
<ul class="facts">
<li><b>Confirmed:</b> stated by Rockstar or the platform holder (for example Xbox Wire).</li>
<li><b>Reported:</b> from a credible outlet, but not confirmed by Rockstar. It may change.</li>
<li><b>Rumour:</b> unverified. Treat it as speculation.</li>
</ul>

<h2>A five-step checklist</h2>
<ol>
<li><b>Find the primary source.</b> Is there a Rockstar post, store listing or platform announcement? If not, the claim is at best reported.</li>
<li><b>Check the date.</b> Old stories get recycled. A delay or price from last year may no longer apply.</li>
<li><b>Count independent sources.</b> Ten sites quoting one anonymous post are still one source.</li>
<li><b>Watch the wording.</b> Phrases such as "reportedly", "sources say" or "could" signal that something is not confirmed.</li>
<li><b>Be wary of leaks.</b> Leaked footage and documents are often fake or outdated. We do not publish leaks.</li>
</ol>

<h2>A real example</h2>
<p>This month, one outlet reported the game had gone gold. That is useful, but we labelled it <i>reported</i> because Rockstar had not said so. By contrast, the 19 November release date is <i>confirmed</i> because Rockstar announced it. The question of a PC version stays a <i>rumour</i> because nothing has been announced.</p>
<div class="callout">See the live labels on our <a href="../index.html#news">News and rumours</a> page.</div>

<h2>Frequently asked questions</h2>
<div class="faq">
<details><summary>Does VICEVERSE publish leaks?</summary><p>No. We link to official sources and credible reports, and we mark everything else as a rumour.</p></details>
<details><summary>How do I report an error?</summary><p>Use our <a href="../contact.html">contact page</a>. We correct mistakes and note the update date.</p></details>
</div>`
  }
];

const NAV = (depth, on) => {
  const r = depth ? "../" : "";
  const l = [["Home", r + "index.html"], ["Map", r + "index.html#map"], ["Vehicles", r + "index.html#vehicles"], ["Characters", r + "index.html#characters"], ["News", r + "index.html#news"], ["Guides", r + "guides/index.html"], ["Quiz", r + "quiz.html"], ["Daily", r + "daily.html"], ["Release time", r + "release-time.html"]];
  return `<nav class="subnav" aria-label="Site">${l.map(([t, h]) => `<a href="${h}"${t === on ? ' class="on"' : ""}>${t}</a>`).join("")}</nav>`;
};
const AD = (n) => `<aside class="ad-slot" data-ad="${n}" hidden aria-label="Advertisement"></aside>`;

function shell({ title, desc, file, depth = 0, body, on = "", article = null, scripts = "" }) {
  const r = depth ? "../" : "";
  const ld = article ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: desc, dateModified: UPDATED, author: { "@type": "Organization", name: "VICEVERSE" }, publisher: { "@type": "Organization", name: "VICEVERSE" }, mainEntityOfPage: `${SITE}/${file}` })}</script>` : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#07060f">
  <title>${title} | VICEVERSE</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${SITE}/${file}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="article">
  <link rel="manifest" href="${r}manifest.webmanifest">
  <link rel="icon" href="${r}assets/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${r}assets/icon-192.png">
  <link rel="stylesheet" href="${r}styles.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6915700686027349" crossorigin="anonymous"></script>
  ${ld}
</head>
<body class="static" data-root="${r}">
  <header class="topbar">
    <a class="brand" href="${r}index.html" aria-label="VICEVERSE home"><span class="brand-mark">V</span><span class="brand-text">VICE<b>VERSE</b><small>THE WORLD OF LEONIDA</small></span></a>
    <nav class="top-nav" aria-label="Main"><a href="${r}index.html">Home</a><a href="${r}index.html#map">Map</a><a href="${r}index.html#vehicles">Vehicles</a><a href="${r}index.html#characters">Characters</a><a href="${r}index.html#news">News</a><a href="${r}guides/index.html"${on === "Guides" ? ' class="active"' : ""}>Guides</a></nav>
    <span></span>
  </header>
  ${NAV(depth, on)}
  <main class="article" id="main">
${body}
  </main>
  <footer class="footer" style="max-width:760px;margin:30px auto 0">
    <nav class="footer-links" aria-label="Footer"><a href="${r}guides/index.html">Guides</a><a href="${r}about.html">About</a><a href="${r}contact.html">Contact</a><a href="${r}privacy.html">Privacy</a><a href="${r}disclaimer.html">Disclaimer</a><button data-adchoices hidden>Ad choices</button></nav>
    <p><b>VICEVERSE</b> is an independent fan project. Not affiliated with Rockstar Games or Take-Two Interactive.</p>
  </footer>
  <script src="${r}config.js"></script>
  ${scripts.replace(/__R__/g, r)}
  <script src="${r}ads.js"></script>
  <script>if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){navigator.serviceWorker.register("${r}sw.js").catch(function(){})}</script>
</body>
</html>
`;
}

function articlePage(g) {
  const idx = guides.indexOf(g);
  const related = guides.filter((x) => x !== g).slice(0, 3)
    .map((x) => `<a href="${x.slug}.html">${x.title}<small>${x.blurb}</small></a>`).join("");
  // Insert an ad slot after the first section break so it reads as in-article.
  const parts = g.body.split("\n<h2>");
  const withAd = parts.length > 2 ? parts[0] + "\n" + AD("article-mid") + "\n<h2>" + parts.slice(1).join("\n<h2>") : g.body;
  const body = `<p class="eyebrow">GUIDE</p>
<h1>${g.title}</h1>
<p class="meta">Updated ${UPDATED_LABEL} · Independent fan guide, not affiliated with Rockstar Games</p>
${AD("article-top")}
<div class="prose">${withAd}</div>
${AD("article-bottom")}
<h2>More guides</h2>
<div class="related">${related}</div>`;
  return shell({ title: g.title, desc: g.desc, file: `guides/${g.slug}.html`, depth: 1, body, on: "Guides", article: g });
}

const pages = {};
guides.forEach((g) => { pages[`guides/${g.slug}.html`] = articlePage(g); });

pages["guides/index.html"] = shell({
  title: "GTA VI guides", desc: "Independent GTA VI guides: release date and editions, Leonida regions, characters, and how to tell confirmed news from rumours.",
  file: "guides/index.html", depth: 1, on: "Guides",
  body: `<p class="eyebrow">GUIDES</p><h1>Launch <em>guides.</em></h1><p class="lede">Plain-English explainers, updated as news changes. Every guide lists its sources.</p>
<div class="guide-list">${guides.map((g) => `<a href="${g.slug}.html"><small class="eyebrow">GUIDE</small><h2>${g.title}</h2><p>${g.blurb}</p></a>`).join("")}</div>`
});


pages["quiz.html"] = shell({
  title: "Which region of Leonida are you? (quiz)", desc: "A quick fan quiz: answer six questions and find out which region of Leonida matches your personality. Share your result.",
  file: "quiz.html", on: "Quiz",
  body: `<p class="eyebrow">FAN QUIZ</p><h1>Which region of <em>Leonida</em> are you?</h1><p class="lede">Six quick questions. Just for fun, and not official game information.</p>
<div id="quiz" class="card" style="margin-top:18px"></div>
${AD("article-bottom")}`,
  scripts: '<script src="__R__data.js"></script><script src="__R__quiz.js"></script>'
});

const legal = (h, inner) => `<p class="eyebrow">VICEVERSE</p><h1>${h}</h1><p class="meta">Last updated ${UPDATED_LABEL}</p><div class="prose">${inner}</div>`;

pages["about.html"] = shell({ title: "About VICEVERSE", desc: "VICEVERSE is an independent fan project that keeps confirmed GTA VI information separate from rumours.", file: "about.html", body: legal("About", `
<p>VICEVERSE is an independent, fan-made hub for the world of Leonida. We built it to make three things easy: exploring the regions, browsing vehicles and characters, and telling confirmed news apart from rumours.</p>
<h2>Our editorial standards</h2>
<ul><li>Every news item carries a label: Confirmed, Reported or Rumour.</li><li>We link to primary or credible sources and name them.</li><li>We write in our own words and do not copy official text or artwork.</li><li>We do not publish leaks or present guesses as facts.</li><li>We correct mistakes and show an update date.</li></ul>
<h2>How we are funded</h2>
<p>VICEVERSE is free to use. We may show advertising, such as Google AdSense, to cover running costs. Ads never change how we label or rank information.</p>
<h2>Not affiliated</h2>
<p>VICEVERSE is not affiliated with, endorsed by or sponsored by Rockstar Games or Take-Two Interactive. All trademarks belong to their owners.</p>`) });

pages["contact.html"] = shell({ title: "Contact", desc: "Contact VICEVERSE to report a correction or ask a question.", file: "contact.html", body: legal("Contact", `
<p>Spotted a mistake or have a question? We welcome corrections and will update the page and its date.</p>
${EMAIL ? `<p>Email: <a href="mailto:${EMAIL}">${EMAIL}</a></p>` : `<form name="contact" method="POST" action="contact.html?sent=1" data-netlify="true" netlify-honeypot="bot-field" style="display:grid;gap:12px;margin:16px 0">
<input type="hidden" name="form-name" value="contact">
<p hidden><label>Do not fill this in: <input name="bot-field"></label></p>
<label>Your name<br><input name="name" required autocomplete="name" style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--text);font-size:16px"></label>
<label>Your email (so we can reply)<br><input name="email" type="email" required autocomplete="email" style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--text);font-size:16px"></label>
<label>Message<br><textarea name="message" rows="5" required style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--text);font-size:16px"></textarea></label>
<button class="btn primary" type="submit">Send message</button>
<p id="sent" class="callout" hidden role="status">Thanks! Your message was sent.</p>
</form>
<script>if(/[?&]sent=1/.test(location.search)){document.getElementById("sent").hidden=false}</script>`}
<p>Please include the page address and, if possible, a link to a reliable source.</p>`) });

pages["privacy.html"] = shell({ title: "Privacy policy", desc: "How VICEVERSE handles data, cookies, local storage and advertising.", file: "privacy.html", body: legal("Privacy policy", `
<h2>What stays on your device</h2>
<p>Your saved locations, vehicles and characters are stored in your browser's local storage on your own device. We do not have accounts, and we do not receive or upload this data. Clearing your browser data removes it.</p>
<h2>Advertising and cookies</h2>
<p>We may use Google AdSense to show ads. Google and its partners may use cookies or similar technologies to serve and measure ads, and, if you choose personalised ads, to tailor them to you. You can choose "Non-personalised only" in our ad choices prompt, and you can change your choice at any time with the "Ad choices" link in the footer. You can also manage Google ad settings at <a href="https://adssettings.google.com" rel="noopener" target="_blank">adssettings.google.com</a> and learn how Google uses data at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener" target="_blank">policies.google.com/technologies/partner-sites</a>.</p>
<h2>Analytics and logs</h2>
<p>Our hosting provider may keep standard server logs such as IP address and browser type for security and reliability. We do not sell personal information.</p>
<h2>External links</h2>
<p>We link to other websites, including official sources. We are not responsible for their privacy practices.</p>
<h2>Children</h2>
<p>VICEVERSE is about a game rated for mature audiences and is not directed at children.</p>
<h2>Your choices and contact</h2>
<p>For questions about this policy, see our <a href="contact.html">contact page</a>. We may update this policy and will change the date above when we do.</p>`) });

pages["disclaimer.html"] = shell({ title: "Disclaimer", desc: "VICEVERSE is an independent fan project and is not affiliated with Rockstar Games or Take-Two Interactive.", file: "disclaimer.html", body: legal("Disclaimer", `
<p>VICEVERSE is an independent fan project. It is not affiliated with, endorsed by or sponsored by Rockstar Games, Take-Two Interactive or any of their subsidiaries. Grand Theft Auto, GTA, Vice City and related names are trademarks of their respective owners.</p>
<p>Information is provided in good faith and summarised in our own words from official and credible sources. It may be incomplete or change. Prices, dates and availability should always be confirmed with the official store or Rockstar.</p>
<p>Items labelled Reported or Rumour are not confirmed. Do not rely on them for purchases or decisions.</p>
<p>The VICEVERSE map is an unofficial schematic and does not represent the game's actual layout.</p>`) });


// ---- Daily + release-time pages ----
const START_UTC = Date.UTC(2026, 10, 19, 6, 0, 0); // 1am ET (EST, UTC-5) on 19 Nov 2026
const ZONES = [["US Eastern (ET)", "America/New_York"], ["US Central", "America/Chicago"], ["US Pacific", "America/Los_Angeles"], ["Brazil (Sao Paulo)", "America/Sao_Paulo"], ["Mexico City", "America/Mexico_City"], ["UK (London)", "Europe/London"], ["Central Europe (Berlin)", "Europe/Berlin"], ["UAE (Dubai)", "Asia/Dubai"], ["India (IST)", "Asia/Kolkata"], ["Singapore", "Asia/Singapore"], ["Philippines (Manila)", "Asia/Manila"], ["Japan (Tokyo)", "Asia/Tokyo"], ["Australia East (Sydney)", "Australia/Sydney"], ["New Zealand (Auckland)", "Pacific/Auckland"]];
const fmtZone = (z) => new Intl.DateTimeFormat("en-GB", { timeZone: z, weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(START_UTC));
const india = fmtZone("Asia/Kolkata"), uk = fmtZone("Europe/London"), syd = fmtZone("Australia/Sydney");

pages["release-time.html"] = shell({
  title: "GTA VI release time in your time zone", desc: "What time can you play GTA VI? Xbox Cloud Gaming starts at 1am ET on 19 November 2026. See the time in India, the UK, Australia, the US and more.",
  file: "release-time.html", on: "Release time",
  body: `<p class="eyebrow">TOOL</p><h1>GTA VI release time in <em>your time zone.</em></h1>
<p class="meta">Updated ${UPDATED_LABEL} · Independent fan tool</p>
<div class="card" style="margin:18px 0"><p class="eyebrow">XBOX CLOUD GAMING START (CONFIRMED)</p>
<p style="font-size:22px;font-weight:900;margin:4px 0" id="localTime">${india}</p><p class="fine" id="localCd"></p>
<label class="fine" for="zone">Time zone</label><br><select id="zone" aria-label="Choose your time zone" style="width:100%;margin-top:6px"></select></div>
${AD("article-top")}
<div class="prose">
<p>Xbox says GTA VI can be streamed through Xbox Cloud Gaming from <b>1am ET on 19 November 2026</b>. That moment is the same everywhere, so we convert it to your local time. Pick your time zone above, or see the table below.</p>
<div class="callout">Other platforms: outlets report that the game unlocks at <b>midnight local time</b> in each region. That is <i>reported</i>, not confirmed, and it could change. Always check your own store page.</div>
<h2>Cloud start time around the world</h2>
<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Region</th><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Local time</th></tr></thead><tbody>
${ZONES.map(([n, z]) => `<tr><td style="padding:8px;border-bottom:1px solid var(--line)">${n}</td><td style="padding:8px;border-bottom:1px solid var(--line)">${fmtZone(z)}</td></tr>`).join("")}
</tbody></table></div>
<h2>Frequently asked questions</h2>
<div class="faq">
<details><summary>What time does GTA 6 release in India?</summary><p>Xbox Cloud Gaming starts at ${india} (IST). Other platforms are reported to unlock at midnight local time, which is not confirmed.</p></details>
<details><summary>What time does GTA 6 release in the UK?</summary><p>Xbox Cloud Gaming starts at ${uk}. Midnight local unlock on other platforms is reported but unconfirmed.</p></details>
<details><summary>What time does GTA 6 release in Australia?</summary><p>For Sydney, Xbox Cloud Gaming starts at ${syd}. Other cities differ, so use the selector above.</p></details>
<details><summary>Why does the time look different from other sites?</summary><p>Some sites quote the reported midnight-local unlock, others quote the confirmed Xbox cloud start. We label which is which.</p></details>
</div>
<p><b>Source:</b> <a href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" rel="noopener" target="_blank">Xbox Wire</a>. See also our <a href="guides/release-date-and-editions.html">release date and editions guide</a>.</p>
</div>
${AD("article-bottom")}`,
  scripts: '<script src="__R__release-time.js"></script>'
});

pages["daily.html"] = shell({
  title: "VICEVERSE Daily: GTA VI trivia", desc: "Five new GTA VI trivia questions every day. Build a streak and share your score. Independent fan game.",
  file: "daily.html", on: "Daily",
  body: `<p class="eyebrow">DAILY CHALLENGE</p><h1>VICEVERSE <em>Daily.</em></h1><p class="lede">Five questions, the same for everyone, new every day. Keep your streak going.</p>
<div id="daily" class="card" style="margin-top:18px"></div>
${AD("article-bottom")}`,
  scripts: '<script src="__R__daily.js"></script>'
});

for (const [file, html] of Object.entries(pages)) {
  const out = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const urls = ["index.html", ...Object.keys(pages)];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE}/${u === "index.html" ? "" : u}</loc><lastmod>${UPDATED}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
if (!fs.existsSync(path.join(ROOT, "ads.txt")))
  fs.writeFileSync(path.join(ROOT, "ads.txt"), `# Replace with your AdSense line after approval, for example:\n# google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n`);

// keep the service worker precache list in sync
const swp = path.join(ROOT, "sw.js");
let sw = fs.readFileSync(swp, "utf8");
const list = ["./", "./index.html", "./styles.css", "./app.js", "./data.js", "./config.js", "./ads.js", "./anim.js", "./manifest.webmanifest",
  "./assets/icon.svg", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/icon-maskable-512.png", "./quiz.html", "./quiz.js", "./daily.html", "./daily.js", "./release-time.html", "./release-time.js", "./about.html", "./privacy.html", "./contact.html", "./disclaimer.html",
  ...Object.keys(pages).filter((p) => p.startsWith("guides/")).map((p) => "./" + p)];
sw = sw.replace(/const ASSETS = \[[\s\S]*?\];/, "const ASSETS = " + JSON.stringify(list, null, 2) + ";");
fs.writeFileSync(swp, sw);
console.log("built", urls.length, "pages; site:", SITE);
