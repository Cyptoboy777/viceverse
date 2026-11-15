/* VICEVERSE content. Plain data, easy to edit.
   Status labels:
   confirmed = stated by Rockstar or the platform holder
   reported  = credible outlet, not confirmed by Rockstar
   rumour    = unverified / speculation
   concept   = VICEVERSE editorial or community concept
   Last reviewed: 15 Nov 2026 */
window.VV_DATA = {
  reviewed: "15 Nov 2026",
  launch: { iso: "2026-11-19T00:00:00", label: "19 November 2026" },

  locations: [
    { id: "vice-city", name: "Vice City", type: "urban", tag: "Urban", icon: "🌆", glow: "#ff3d9a", map: { x: 306, y: 404 }, status: "confirmed",
      desc: "Leonida's neon-lit coastal metropolis and the series' return to a classic setting. Nightlife, excess and dense traffic.",
      points: ["Ocean Beach neighbourhood", "Little Cuba neighbourhood", "Major cruise port"] },
    { id: "leonida-keys", name: "Leonida Keys", type: "coastal", tag: "Island chain", icon: "🌴", glow: "#27e6ff", map: { x: 232, y: 512 }, status: "confirmed",
      desc: "A tropical island chain billed as a gateway to paradise: boat parties, dive bars and underwater areas.",
      points: ["Boat parties and dive bars", "Scuba diving areas", "Home region of Jason Duval"] },
    { id: "grassrivers", name: "Grassrivers", type: "wild", tag: "Wetlands", icon: "🐊", glow: "#4dffb0", map: { x: 236, y: 352 }, status: "confirmed",
      desc: "Leonida's wetlands: stilt-house communities, alligators and other dangerous wildlife.",
      points: ["Stilt-house communities", "Alligator hunting", "Dangerous predators"] },
    { id: "port-gellhorn", name: "Port Gellhorn", type: "coastal", tag: "Coastal town", icon: "⚓", glow: "#ffa23c", map: { x: 118, y: 236 }, status: "confirmed",
      desc: "A former tourist destination in decline, with abandoned attractions and a growing drug trade.",
      points: ["Abandoned attractions", "Growing drug trade"] },
    { id: "ambrosia", name: "Ambrosia", type: "urban", tag: "Industrial", icon: "🏭", glow: "#ffc45c", map: { x: 246, y: 168 }, status: "confirmed",
      desc: "An industrial region centred on a sugar refinery, where a local biker gang enforces its own rules.",
      points: ["Sugar refinery", "Local biker gang"] },
    { id: "mount-kalaga", name: "Mount Kalaga National Park", short: "Mount Kalaga", type: "wild", tag: "Wilderness", icon: "⛰️", glow: "#8f5bff", map: { x: 196, y: 82 }, status: "confirmed",
      desc: "A large wilderness along the state's northern border with hunting, fishing and off-road trails, plus isolated backwoods residents.",
      points: ["Hunting and fishing", "Off-road trails", "Backwoods communities"] }
  ],

  vehicles: [
    { id: "sports-cars", name: "Sports cars", type: "road", tag: "Road", icon: "🏎️", glow: "#ff3d9a", status: "seen",
      desc: "High-performance coupes appear throughout the trailers. Exact in-game model names are not confirmed." },
    { id: "lowriders", name: "Lowriders & classics", type: "road", tag: "Road", icon: "🚘", glow: "#ff9a3c", status: "seen",
      desc: "Custom and classic cruisers fit the Vice City look. Specific models are not confirmed." },
    { id: "pickups", name: "Pickup trucks", type: "road", tag: "Road", icon: "🛻", glow: "#4dffb0", status: "seen",
      desc: "Work and utility pickups appear in rural scenes. Model names are not confirmed." },
    { id: "motorbikes", name: "Motorbikes", type: "bikes", tag: "Bikes", icon: "🏍️", glow: "#ff3d9a", status: "seen",
      desc: "Road and trail bikes feature in trailer footage. Model names are not confirmed." },
    { id: "atvs", name: "ATVs & quad bikes", type: "offroad", tag: "Off-road", icon: "🛞", glow: "#8f5bff", status: "seen",
      desc: "Off-road riding is part of the wilderness setting. Model names are not confirmed." },
    { id: "jet-skis", name: "Jet skis", type: "water", tag: "Water", icon: "🌊", glow: "#27e6ff", status: "seen",
      desc: "Personal watercraft appear in coastal trailer footage. Model names are not confirmed." },
    { id: "boats", name: "Powerboats", type: "water", tag: "Water", icon: "🚤", glow: "#27e6ff", status: "seen",
      desc: "Boats suit the Keys and the coast, including boat parties. Model names are not confirmed." },
    { id: "airboats", name: "Airboats", type: "water", tag: "Water", icon: "🪂", glow: "#4dffb0", status: "concept",
      desc: "A natural fit for Grassrivers wetlands. Treat as an editorial guess until confirmed on screen." },
    { id: "helicopters", name: "Helicopters", type: "air", tag: "Air", icon: "🚁", glow: "#8f5bff", status: "concept",
      desc: "Aircraft are a long-running series staple. Availability in this game is not confirmed here." }
  ],

  characters: [
    { id: "lucia-caminos", name: "Lucia Caminos", group: "protagonist", tag: "Protagonist", icon: "🌹", glow: "#ff3d9a", status: "confirmed",
      desc: "A fighter trained by her father. She served time in Leonida Penitentiary and is aiming to build the life her mother always dreamed of for her." },
    { id: "jason-duval", name: "Jason Duval", group: "protagonist", tag: "Protagonist", icon: "⚓", glow: "#27e6ff", status: "confirmed",
      desc: "Raised in the Keys among criminals, he served in the Army, then worked for local drug runners. He may be ready for a change." },
    { id: "cal-hampton", name: "Cal Hampton", group: "keys", tag: "Keys", icon: "📻", glow: "#4dffb0", status: "confirmed",
      desc: "Jason's friend, happy to stay home and listen in on Coast Guard comms." },
    { id: "brian-heder", name: "Brian Heder", group: "keys", tag: "Keys", icon: "🛥️", glow: "#ffa23c", status: "confirmed",
      desc: "An older drug runner from the Keys' smuggling era who lets Jason live rent-free in exchange for help with local shakedowns." },
    { id: "boobie-ike", name: "Boobie Ike", group: "vice", tag: "Vice City", icon: "💼", glow: "#ffc45c", status: "confirmed",
      desc: "A Vice City figure who built businesses in real estate, a strip club and a recording studio, and is invested in his label partnership with Dre'Quan." },
    { id: "dre-quan-priest", name: "Dre'Quan Priest", group: "vice", tag: "Vice City", icon: "🎤", glow: "#8f5bff", status: "confirmed",
      desc: "A hustler who always wanted a music career and has signed the Real Dimez to his label." },
    { id: "real-dimez", name: "Bae-Luxe & Roxy (Real Dimez)", group: "vice", tag: "Vice City", icon: "💿", glow: "#ff3d9a", status: "confirmed",
      desc: "High-school friends who turned shaking down dealers into a rap career with a strong social presence, signed to Only Raw Records." },
    { id: "raul-bautista", name: "Raul Bautista", group: "crew", tag: "Crew", icon: "🏦", glow: "#27e6ff", status: "confirmed",
      desc: "A bank robber who takes big risks for big rewards. His crew will have to escalate or back out." }
  ],

  /* Each item: kind = confirmed | reported | rumour */
  news: [
    { id: "n-launch", kind: "confirmed", date: "2025-11", dateLabel: "Nov 2025", title: "Launch date set: 19 November 2026",
      body: "Rockstar announced Grand Theft Auto VI would launch on Thursday, 19 November 2026, following an earlier move from May 2026.",
      source: "Rockstar Games Newswire", url: "https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026" },
    { id: "n-xbox", kind: "confirmed", date: "2026-11-10", dateLabel: "10 Nov 2026", title: "Xbox Cloud Gaming day-one streaming",
      body: "Xbox says the game can be streamed on Xbox One and Series X|S via Xbox Cloud Gaming from 1am ET on 19 November, using Series S graphics settings. Series X|S owners can pre-install now.",
      source: "Xbox Wire", url: "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" },
    { id: "n-editions", kind: "confirmed", date: "2026-11-10", dateLabel: "10 Nov 2026", title: "Editions and pre-order bonus (Microsoft Store listing)",
      body: "Per Xbox Wire, the Standard Edition lists at $79.99 and the Ultimate Edition at $99.99. Pre-orders placed before 23:59:59 on 19 November include the Vintage Vice City Pack and one month of GTA+. Prices and bonuses can vary by store and region.",
      source: "Xbox Wire", url: "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" },
    { id: "n-characters", kind: "confirmed", date: "2025-05", dateLabel: "May 2025", title: "Official character and region profiles",
      body: "Rockstar's official GTA VI site profiles the cast and the six regions of Leonida. VICEVERSE's Cast and Map pages are based on those descriptions, summarised in our own words.",
      source: "rockstargames.com/VI", url: "https://www.rockstargames.com/VI" },
    { id: "n-gold", kind: "reported", date: "2026-11-15", dateLabel: "15 Nov 2026", title: "Game reportedly has gone gold",
      body: "One outlet reports development is complete and the 19 November launch is on track. We have not seen a Rockstar statement. Games can still slip after reaching gold.",
      source: "eGamers.io", url: "https://egamers.io/gta-6-goes-gold-putting-the-november-19-launch-on-track/" },
    { id: "n-unlock", kind: "reported", date: "2026-11-12", dateLabel: "12 Nov 2026", title: "Midnight local-time unlock expected",
      body: "Reports say the game unlocks at midnight in each region, so earlier time zones play first. Outlets differ on details, and it could change. Check your own store page.",
      source: "Forbes, eGamers.io", url: "https://www.forbes.com/sites/brianmazique/2026/11/12/gta-6-unlocks-at-midnight-on-november-19-but-millions-of-americans-can-start-playing-the-night-before/" },
    { id: "n-preorders", kind: "reported", date: "2026-11", dateLabel: "Nov 2026", title: "Pre-orders said to exceed expectations",
      body: "A financial-news summary says Take-Two reported pre-orders well above its initial expectations. This is a secondary summary, not a primary filing.",
      source: "StockTitan", url: "https://www.stocktitan.net/articles/gta-6-release-date-take-two-holiday-sales-2026" },
    { id: "n-pc", kind: "rumour", date: "", dateLabel: "Ongoing", title: "A PC version is coming later",
      body: "Fans widely expect a PC release after console launch. In the sources we reviewed, Rockstar has not announced one. Treat any date you see as a guess.",
      source: "Community speculation", url: "" },
    { id: "n-dlc", kind: "rumour", date: "", dateLabel: "Ongoing", title: "Story expansions after launch",
      body: "Players speculate about post-launch story content. Nothing has been announced. Do not rely on any claimed details.",
      source: "Community speculation", url: "" },
    { id: "n-mapsize", kind: "rumour", date: "", dateLabel: "Ongoing", title: "Exact map layout and size",
      body: "Region names are official, but their exact positions and the full map are not. The VICEVERSE map is schematic and unofficial.",
      source: "VICEVERSE editorial", url: "" }
  ]
};
