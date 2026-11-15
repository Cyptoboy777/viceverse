# VICEVERSE: business plan (v1.1)
Prepared 15 Nov 2026. Structured like the founder-skill set (board, competitors, CFO, marketing, launch, risks). I used that structure from its public description; I did not run the actual skills.

## 1. One-line model
A free, fast, installable GTA VI fan hub. Search and social traffic lands on guide pages and the app. Display ads (Google AdSense) pay for it. Trust is the product: every item is labelled Confirmed, Reported or Rumour.

## 2. Honest verdict first (the "board")
- **Fund it, but as a small experiment, not a salary.** Cost is near zero, so downside is only your time.
- **100k to 200k pageviews a month is a stretch goal, not a forecast.** GTA VI traffic will be huge for a few weeks, but IGN, GameRant, Fandom and thousands of fan sites compete for the same searches. A new site has no search authority yet. A realistic first-90-day range is a few thousand to tens of thousands of pageviews. Reaching 100k+ usually takes consistent publishing for several months.
- **Nobody can promise AdSense income.** It depends on where your visitors live and how many see ads.

## 3. Customer and offer
- **Who:** players and fans who want quick, trustworthy answers: release/edition questions, map and region info, character lists, "is this rumour true?".
- **Offer:** (1) fast mobile app with a map and tracker, (2) plain-English guides with sources, (3) clear verification labels. The tracker (saved on-device, installable, offline) is what makes people come back.
- **Edge over big sites:** no clutter, no clickbait, a calm "signal over noise" brand. After launch, **your own first-hand play** (screenshots, real vehicle names, real locations) is the thing big sites cannot copy quickly.

## 4. Competitors
| Type | Examples | Their strength | Your gap |
|---|---|---|---|
| Big media | IGN, GameRant, GamesRadar | Authority, volume | Slow to correct, heavy ads, long pages |
| Wikis | Fandom, community wikis | Depth | Cluttered, inconsistent trust |
| Fan sites/maps | Interactive map sites | Detail | Few verify claims |
| YouTube | Big creators | Reach | Not searchable, not a tool |

Your wedge: a **useful tool + trust labels + speed**, then fill long-tail searches.

## 5. Unit economics (CFO view)
Revenue = pageviews x RPM / 1000. RPM (revenue per 1,000 pageviews) is the number to learn from your own AdSense report. The scenarios below are **assumptions to test**, not promises.

| Scenario | Pageviews/mo | RPM (assumed) | Monthly revenue |
|---|---|---|---|
| Early | 10,000 | $1.50 | about $15 |
| Growing | 50,000 | $2.50 | about $125 |
| Stretch (low-RPM audience, e.g. mostly India) | 150,000 | $0.80 to $1.50 | about $120 to $225 |
| Stretch (mixed audience) | 150,000 | $2 to $4 | about $300 to $600 |
| Stretch (mostly US/UK/CA) | 150,000 | $6 to $10 | about $900 to $1,500 |

Costs: hosting $0 (Cloudflare Pages), domain optional (about $10 to $15/yr), AdSense is free. Your real cost is time: about 10 to 15 hours a week to publish well.
Break-even is immediate if you skip a paid domain. Payout threshold (AdSense) means your first payment can take months.

## 6. Marketing plan (first 30 days)
1. **Search (main engine):** the four launch guides are live. Add 1 guide per day in launch week, then 3 to 4 per week. Target long-tail questions: "GTA 6 map regions", "GTA 6 characters list", "GTA 6 editions difference", "is X rumour true".
2. **Short video:** 2 Shorts/Reels a day in launch week (map tour, character explainer, "confirmed vs rumour"). Always link to the site in bio.
3. **Communities:** answer questions in forums and subreddits where self-promotion is allowed. Be useful first, link second. Read each community's rules.
4. **Return loop:** push "Install app" and the tracker. Returning visitors make ad income steadier.
5. **Universal English audience (no translations):** keep the site English-only, in short plain sentences so non-native readers follow easily. Use icons, emoji grids and image cards that need no language. Post when the US, UK and Europe are awake as well as India. Tools like the release-time converter work worldwide because they use the visitor's own time zone. English traffic from the US, UK, Canada and Australia also tends to pay a higher RPM.

## 7. Dated launch plan
| When | Do |
|---|---|
| 15 to 16 Nov | Deploy to Cloudflare Pages. Run `node tools/build.js` with your real SITE_URL and CONTACT_EMAIL. Add the site to Google Search Console and submit sitemap.xml. |
| 17 to 18 Nov | Apply for AdSense (needs a live site with About, Contact, Privacy). Approval can take days to weeks. |
| 19 to 25 Nov | Launch week. Publish a guide a day. Replace placeholder vehicle categories in `data.js` with **real model names you verify in-game**. Post Shorts daily. |
| Dec | When approved, paste your ID and slot IDs into `config.js`. 3 to 4 guides/week. Check which pages get impressions in Search Console and write more like them. |
| Jan to Feb | Review RPM and top pages. Double down on what ranks. Decide on v2 (accounts, community submissions). |

## 8. Operations and risks
| Risk | What to do |
|---|---|
| AdSense rejects "low-value content" | Publish original, useful guides (not copied or thin). Add your own screenshots and play notes. Keep About/Privacy/Contact live. |
| Google's rules on mass AI-written pages | Do not mass-generate articles. Use AI to draft, then add your own verified facts and edit by hand. |
| Rockstar / Take-Two IP | Fan content is common, but never use official art, logos or copied text. Keep the disclaimer. Avoid "GTA" in your domain name. |
| Wrong or fake news hurts trust | Keep the labels. Correct fast. Do not publish leaks. |
| Traffic spike then drop after launch | Expected. Build evergreen guides and the tracker so people return. |
| Invalid-click risk | Never click your own ads and never buy or fake traffic. That gets accounts banned. |
| Privacy law (EU/UK) | For visitors in the EEA/UK, AdSense needs a Google-certified consent message. Turn on Google's "Privacy & messaging" tool in your AdSense account. The built-in banner is a basic choice, not a full legal solution. |

## 9. KPIs to check weekly
Search impressions and clicks (Search Console), pageviews, pages per session, installs, returning visitors, RPM, and share of traffic by country.

## 10. Next 3 actions
1. Deploy and submit to Search Console today.
2. Apply for AdSense in 48 hours.
3. After you play, replace placeholder entries with real, verified names and write one guide a day.

## 11. Update: no console, zero budget, Google API key
You do not own a PlayStation, so **do not claim first-hand gameplay**. Build trust a different way:
- Be the fastest, clearest **source-linked** site: every item names its source and carries a Confirmed / Reported / Rumour label.
- Keep adding value with the tools (map, tracker, quiz) and guides built from official sources.
- Replace "your own play" with **community-verified, credited** info once launch week arrives (e.g. viewers' reports that you check against two sources).

**Using your Google (Gemini) API key safely**
1. Never paste the key into the website code or into a chat. Anyone could copy it and use your quota. If it was ever shared, delete it in Google AI Studio and make a new one.
2. Store it only as a GitHub **Secret** named `GEMINI_API_KEY` (repo Settings > Secrets and variables > Actions). Add a **Variable** `GEMINI_MODEL` with a model name from AI Studio.
3. When you find a good article, open the repo's **Actions** tab, run "News draft helper", paste the links. It opens a GitHub Issue with draft items. You check the sources, then paste the good ones into `data.js`. It never publishes by itself.
4. Free-tier limits and model names change, so check AI Studio. Keep usage small.

**Zero-cost viral loop (realistic)**
- The quiz (`quiz.html`) gives a shareable result card. Post your own result first, then ask friends to share theirs.
- Post 1 to 2 short videos a day (screen-record the map, quiz, or "confirmed vs rumour"). Add the link in your bio.
- Answer questions in communities where links are allowed. Be helpful before linking.
- No one can guarantee "viral". Treat each post as an experiment and keep what works.
