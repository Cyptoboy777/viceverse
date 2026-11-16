/* Automatic news updater (runs in GitHub Actions, free for public repos).
   - OFFICIAL feeds (official: true): GTA VI posts are summarised by Gemini in its own words and
     written to news-auto.json as "confirmed". The label comes from the source list, never from the AI.
   - OTHER feeds: never published automatically. Headlines go to review-queue.md for a human to check.
   Env: GEMINI_API_KEY, GEMINI_MODEL (both required). Sources: tools/sources.json */
"use strict";
const fs = require("fs"), path = require("path");
const { fetchText, gemini, hostOf, isSafeUrl } = require("./digest.js");

const SPECIFIC = /(gta\s*(vi|6)\b|grand theft auto\s*(vi|6)\b|leonida)/i;
const MAX_AUTO_PER_RUN = 3, MAX_ITEMS = 30, MAX_QUEUE = 10, MAX_AGE_H = 72;

function decode(s) {
  return String(s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#8217;/g, "’").replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function tag(block, name) { const m = block.match(new RegExp("<" + name + "[^>]*>([\\s\\S]*?)</" + name + ">", "i")); return m ? decode(m[1]) : ""; }
function parseRss(xml) {
  const items = [];
  (xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || []).forEach((b) => {
    const link = tag(b, "link"), t = Date.parse(tag(b, "pubDate"));
    items.push({ title: tag(b, "title"), link, guid: tag(b, "guid") || link, desc: tag(b, "description"), time: isNaN(t) ? 0 : t, outlet: tag(b, "source") });
  });
  return items;
}
function label(ms) { return new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); }
function id(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return "a-" + h.toString(36); }
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { return d; } };

async function run({ env = process.env, root = path.join(__dirname, ".."), now = Date.now() } = {}) {
  if (!env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set (GitHub: Settings > Secrets and variables > Actions > Secrets).");
  if (!env.GEMINI_MODEL) throw new Error("GEMINI_MODEL is not set (GitHub: Settings > Secrets and variables > Actions > Variables).");
  const sources = readJson(path.join(root, "tools/sources.json"), []);
  const file = path.join(root, "news-auto.json"), seenFile = path.join(root, "state/seen.json");
  const store = readJson(file, { items: [] }), seen = new Set(readJson(seenFile, []));
  const items = Array.isArray(store.items) ? store.items : [];
  const items0 = JSON.parse(JSON.stringify(items)).sort((a, b) => (a.date < b.date ? 1 : -1));
  const queue = [], log = [];
  let made = 0;

  for (const src of sources) {
    let xml;
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
      const r = await fetch(src.url, { signal: ctl.signal, headers: { "user-agent": "VICEVERSE-news-bot/1.0" } }); clearTimeout(t);
      if (!r.ok) throw new Error("HTTP " + r.status);
      xml = (await r.text()).slice(0, 1500000);
    } catch (e) { log.push(`Feed failed: ${src.name} (${e.message})`); continue; }

    const fresh = parseRss(xml).filter((x) => x.time && now - x.time < MAX_AGE_H * 3600e3 && !seen.has(x.guid));
    for (const it of fresh) {
      const match = SPECIFIC.test(it.title + " " + it.desc);
      if (!match) continue;
      if (src.official) {
        if (made >= MAX_AUTO_PER_RUN || !isSafeUrl(it.link)) continue;
        try {
          const d = await gemini(env.GEMINI_MODEL, env.GEMINI_API_KEY, await fetchText(it.link));
          if (!d.relevant || !d.body) { seen.add(it.guid); log.push("Skipped (not mainly about GTA VI): " + it.title); continue; }
          items.unshift({ id: id(it.guid), kind: "confirmed", date: new Date(it.time).toISOString(), dateLabel: label(it.time), title: it.title.slice(0, 110), body: d.body.slice(0, 400), source: src.name, url: it.link });
          seen.add(it.guid); made++; log.push("Published: " + it.title);
        } catch (e) { log.push(`Could not process "${it.title}" (${e.message}); will retry next run`); }
      } else if (queue.length < MAX_QUEUE) {
        queue.push(it); seen.add(it.guid);
      }
    }
  }

  const uniq = []; const ids = new Set();
  items.sort((a, b) => (a.date < b.date ? 1 : -1)).forEach((x) => { if (!ids.has(x.id)) { ids.add(x.id); uniq.push(x); } });
  const next = uniq.slice(0, MAX_ITEMS);
  if (JSON.stringify(next) !== JSON.stringify(items0)) // only touch the file when something changed
    fs.writeFileSync(file, JSON.stringify({ updated: new Date(now).toISOString(), items: next }, null, 2) + "\n");
  fs.mkdirSync(path.dirname(seenFile), { recursive: true });
  fs.writeFileSync(seenFile, JSON.stringify([...seen].slice(-600), null, 1) + "\n");
  const rq = path.join(root, "review-queue.md");
  if (queue.length) {
    fs.writeFileSync(rq, "# Headlines to review (not published)\n\nOpen each link, confirm it is credible, then ask for a draft (Actions > News draft helper) or add it to `data.js` as **reported**.\n\n" +
      queue.map((q) => `- [${q.title}](${q.link}) (${q.outlet || hostOf(q.link)}, ${label(q.time)})`).join("\n") + "\n");
  } else if (fs.existsSync(rq)) fs.unlinkSync(rq);
  return { made, queued: queue.length, log };
}

module.exports = { run, parseRss, label };
if (require.main === module) run().then((r) => { console.log(r.log.join("\n")); console.log(`Published ${r.made}, queued ${r.queued}`); }).catch((e) => { console.error(e.message); process.exit(1); });
