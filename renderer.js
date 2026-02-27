
// ─── Constants ────────────────────────────────────────────────────────────────
const EDHREC_BASE = 'https://json.edhrec.com';

// Section headers to exclude (lands + mana rocks)
const EXCLUDED_SECTION_KEYWORDS = ['land', 'mana artifact'];

// Known mana rocks to always exclude by name (catches any not in their own section)
const MANA_ROCKS = new Set([
  'Sol Ring', 'Arcane Signet', 'Commander\'s Sphere', 'Chromatic Lantern',
  'Fellwar Stone', 'Mind Stone', 'Thought Vessel', 'Darksteel Ingot',
  'Coalition Relic', 'Worn Powerstone', 'Mana Vault', 'Mana Crypt',
  'Chrome Mox', 'Mox Diamond', 'Grim Monolith', 'Basalt Monolith',
  'Gilded Lotus', 'Thran Dynamo', 'Hedron Archive', 'Dreamstone Hedron',
  'Everflowing Chalice', 'Coldsteel Heart', 'Prismatic Lens',
  'Wayfarer\'s Bauble', 'Burnished Hart', 'Solemn Simulacrum',
  'Dimir Signet', 'Azorius Signet', 'Orzhov Signet', 'Boros Signet',
  'Gruul Signet', 'Selesnya Signet', 'Simic Signet', 'Izzet Signet',
  'Rakdos Signet', 'Golgari Signet', 'Izzet Signet',
  'Talisman of Dominance', 'Talisman of Progress', 'Talisman of Creativity',
  'Talisman of Curiosity', 'Talisman of Unity', 'Talisman of Conviction',
  'Talisman of Resilience', 'Talisman of Indulgence', 'Talisman of Hierarchy',
  'Talisman of Impulse', 'Jeweled Lotus', 'Mox Opal', 'Mox Amber',
]);

// Popular EDH commanders with verified EDHREC slugs
const COMMANDERS = [
  { name: "Atraxa, Praetors' Voice",        slug: "atraxa-praetors-voice" },
  { name: "Edgar Markov",                    slug: "edgar-markov" },
  { name: "The Ur-Dragon",                   slug: "the-ur-dragon" },
  { name: "Yuriko, the Tiger's Shadow",      slug: "yuriko-the-tigers-shadow" },
  { name: "Najeela, the Blade-Blossom",      slug: "najeela-the-blade-blossom" },
  { name: "Krenko, Mob Boss",                slug: "krenko-mob-boss" },
  { name: "Meren of Clan Nel Toth",          slug: "meren-of-clan-nel-toth" },
  { name: "Breya, Etherium Shaper",          slug: "breya-etherium-shaper" },
  { name: "Kaalia of the Vast",              slug: "kaalia-of-the-vast" },
  { name: "Ghave, Guru of Spores",           slug: "ghave-guru-of-spores" },
  { name: "Prossh, Skyraider of Kher",       slug: "prossh-skyraider-of-kher" },
  { name: "The Gitrog Monster",              slug: "the-gitrog-monster" },
  { name: "Sisay, Weatherlight Captain",     slug: "sisay-weatherlight-captain" },
  { name: "Kenrith, the Returned King",      slug: "kenrith-the-returned-king" },
  { name: "Shorikai, Genesis Engine",        slug: "shorikai-genesis-engine" },
  { name: "Omnath, Locus of Creation",       slug: "omnath-locus-of-creation" },
  { name: "Muldrotha, the Gravetide",        slug: "muldrotha-the-gravetide" },
  { name: "Niv-Mizzet, Parun",              slug: "niv-mizzet-parun" },
  { name: "Niv-Mizzet Reborn",              slug: "niv-mizzet-reborn" },
  { name: "Korvold, Fae-Cursed King",        slug: "korvold-fae-cursed-king" },
  { name: "Yarok, the Desecrated",           slug: "yarok-the-desecrated" },
  { name: "The Scarab God",                  slug: "the-scarab-god" },
  { name: "Yawgmoth, Thran Physician",       slug: "yawgmoth-thran-physician" },
  { name: "Urza, Lord High Artificer",       slug: "urza-lord-high-artificer" },
  { name: "K'rrik, Son of Yawgmoth",        slug: "krrik-son-of-yawgmoth" },
  { name: "Inalla, Archmage Ritualist",      slug: "inalla-archmage-ritualist" },
  { name: "Nekusar, the Mindrazer",          slug: "nekusar-the-mindrazer" },
  { name: "Syr Konrad, the Grim",            slug: "syr-konrad-the-grim" },
  { name: "Oloro, Ageless Ascetic",          slug: "oloro-ageless-ascetic" },
  { name: "Marchesa, the Black Rose",        slug: "marchesa-the-black-rose" },
  { name: "Wilhelt, the Rotcleaver",         slug: "wilhelt-the-rotcleaver" },
  { name: "Tergrid, God of Fright",          slug: "tergrid-god-of-fright" },
  { name: "Isshin, Two Heavens as One",      slug: "isshin-two-heavens-as-one" },
  { name: "Lathril, Blade of the Elves",     slug: "lathril-blade-of-the-elves" },
  { name: "Chulane, Teller of Tales",        slug: "chulane-teller-of-tales" },
  { name: "Kinnan, Bonder Prodigy",          slug: "kinnan-bonder-prodigy" },
  { name: "Jetmir, Nexus of Revels",         slug: "jetmir-nexus-of-revels" },
  { name: "Kykar, Wind's Fury",              slug: "kykar-winds-fury" },
  { name: "Animar, Soul of Elements",        slug: "animar-soul-of-elements" },
  { name: "Zacama, Primal Calamity",         slug: "zacama-primal-calamity" },
  { name: "Gishath, Sun's Avatar",           slug: "gishath-suns-avatar" },
  { name: "Toxrill, the Corrosive",          slug: "toxrill-the-corrosive" },
  { name: "Anhelo, the Painter",             slug: "anhelo-the-painter" },
  { name: "Tymna the Weaver",                slug: "tymna-the-weaver" },
  { name: "Thrasios, Triton Hero",           slug: "thrasios-triton-hero" },
  { name: "Grand Arbiter Augustin IV",       slug: "grand-arbiter-augustin-iv" },
  { name: "Teferi, Temporal Archmage",       slug: "teferi-temporal-archmage" },
  { name: "Elsha of the Infinite",           slug: "elsha-of-the-infinite" },
  { name: "Omnath, Locus of Mana",           slug: "omnath-locus-of-mana" },
  { name: "Daretti, Scrap Savant",           slug: "daretti-scrap-savant" },
  { name: "Miirym, Sentinel Wyrm",           slug: "miirym-sentinel-wyrm" },
  { name: "Sauron, the Dark Lord",           slug: "sauron-the-dark-lord" },
  { name: "Jodah, the Unifier",              slug: "jodah-the-unifier" },
  { name: "Giada, Font of Hope",             slug: "giada-font-of-hope" },
  { name: "Prosper, Tome-Bound",             slug: "prosper-tome-bound" },
  { name: "Kess, Dissident Mage",            slug: "kess-dissident-mage" },
  { name: "Sliver Overlord",                 slug: "sliver-overlord" },
  { name: "The Locust God",                  slug: "the-locust-god" },
  { name: "Arcades, the Strategist",         slug: "arcades-the-strategist" },
  { name: "Purphoros, God of the Forge",     slug: "purphoros-god-of-the-forge" },
  { name: "Aminatou, the Fateshifter",       slug: "aminatou-the-fateshifter" },
  { name: "Brago, King Eternal",             slug: "brago-king-eternal" },
  { name: "Zur the Enchanter",               slug: "zur-the-enchanter" },
  { name: "Mizzix of the Izmagnus",          slug: "mizzix-of-the-izmagnus" },
  { name: "Talrand, Sky Summoner",           slug: "talrand-sky-summoner" },
  { name: "Narset, Enlightened Master",      slug: "narset-enlightened-master" },
  { name: "Sidisi, Brood Tyrant",            slug: "sidisi-brood-tyrant" },
  { name: "Tasigur, the Golden Fang",        slug: "tasigur-the-golden-fang" },
  { name: "Maelstrom Wanderer",              slug: "maelstrom-wanderer" },
  { name: "Xenagos, God of Revels",          slug: "xenagos-god-of-revels" },
  { name: "Riku of Two Reflections",         slug: "riku-of-two-reflections" },
  { name: "Hapatra, Vizier of Poisons",      slug: "hapatra-vizier-of-poisons" },
  { name: "Volo, Guide to Monsters",         slug: "volo-guide-to-monsters" },
  { name: "Wulfgar of Icewind Dale",         slug: "wulfgar-of-icewind-dale" },
  { name: "Rhys the Redeemed",               slug: "rhys-the-redeemed" },
  { name: "Magda, Brazen Outlaw",            slug: "magda-brazen-outlaw" },
  { name: "Olivia, Crimson Bride",           slug: "olivia-crimson-bride" },
  { name: "Feather, the Redeemed",           slug: "feather-the-redeemed" },
  { name: "Aurelia, the Warleader",          slug: "aurelia-the-warleader" },
  { name: "Neheb, the Eternal",              slug: "neheb-the-eternal" },
  { name: "Kynaios and Tiro of Meletis",     slug: "kynaios-and-tiro-of-meletis" },
  { name: "Sythis, Harvest's Hand",          slug: "sythis-harvests-hand" },
  { name: "Aesi, Tyrant of Gyre Strait",     slug: "aesi-tyrant-of-gyre-strait" },
  { name: "Tatyova, Benthic Druid",          slug: "tatyova-benthic-druid" },
  { name: "Jhoira, Weatherlight Captain",    slug: "jhoira-weatherlight-captain" },
  { name: "Varina, Lich Queen",              slug: "varina-lich-queen" },
  { name: "Birgi, God of Storytelling",      slug: "birgi-god-of-storytelling" },
  { name: "Koma, Cosmos Serpent",            slug: "koma-cosmos-serpent" },
  { name: "Pantlaza, Sun-Favored",           slug: "pantlaza-sun-favored" },
  { name: "Ziatora, the Incinerator",        slug: "ziatora-the-incinerator" },
  { name: "Olivia Voldaren",                 slug: "olivia-voldaren" },
  { name: "Sen Triplets",                    slug: "sen-triplets" },
  { name: "Obeka, Brute Chronologist",       slug: "obeka-brute-chronologist" },
  { name: "Thalia and The Gitrog Monster",   slug: "thalia-and-the-gitrog-monster" },
  { name: "Heliod, Sun-Crowned",             slug: "heliod-sun-crowned" },
  { name: "Omnath, Locus of Rage",           slug: "omnath-locus-of-rage" },
  { name: "Azusa, Lost but Seeking",         slug: "azusa-lost-but-seeking" },
  { name: "Ghired, Conclave Exile",          slug: "ghired-conclave-exile" },
  { name: "Syr Gwyn, Hero of Ashvale",       slug: "syr-gwyn-hero-of-ashvale" },
  { name: "Lathiel, the Bounteous Dawn",     slug: "lathiel-the-bounteous-dawn" },
  // Classics
  { name: "Zedruu the Greathearted",         slug: "zedruu-the-greathearted" },
  { name: "Roon of the Hidden Realm",        slug: "roon-of-the-hidden-realm" },
  { name: "Mayael the Anima",               slug: "mayael-the-anima" },
  { name: "Azami, Lady of Scrolls",          slug: "azami-lady-of-scrolls" },
  { name: "Baral, Chief of Compliance",      slug: "baral-chief-of-compliance" },
  { name: "Rashmi, Eternities Crafter",      slug: "rashmi-eternities-crafter" },
  { name: "Ezuri, Claw of Progress",         slug: "ezuri-claw-of-progress" },
  { name: "Kruphix, God of Horizons",        slug: "kruphix-god-of-horizons" },
  { name: "Yidris, Maelstrom Wielder",       slug: "yidris-maelstrom-wielder" },
  { name: "Saskia the Unyielding",           slug: "saskia-the-unyielding" },
  { name: "Arahbo, Roar of the World",       slug: "arahbo-roar-of-the-world" },
  { name: "Licia, Sanguine Tribune",         slug: "licia-sanguine-tribune" },
  { name: "Ramos, Dragon Engine",            slug: "ramos-dragon-engine" },
  { name: "Momir Vig, Simic Visionary",      slug: "momir-vig-simic-visionary" },
  { name: "Niv-Mizzet, the Firemind",        slug: "niv-mizzet-the-firemind" },
  { name: "Selvala, Heart of the Wilds",     slug: "selvala-heart-of-the-wilds" },
  { name: "Selvala, Explorer Returned",      slug: "selvala-explorer-returned" },
  { name: "Titania, Protector of Argoth",    slug: "titania-protector-of-argoth" },
  { name: "Ezuri, Renegade Leader",          slug: "ezuri-renegade-leader" },
  { name: "Sliver Hivelord",                 slug: "sliver-hivelord" },
  { name: "Sliver Queen",                    slug: "sliver-queen" },
  { name: "Vial Smasher the Fierce",         slug: "vial-smasher-the-fierce" },
  { name: "Phenax, God of Deception",        slug: "phenax-god-of-deception" },
  { name: "Kroxa, Titan of Death's Hunger",  slug: "kroxa-titan-of-deaths-hunger" },
  // Commander Legends (2020)
  { name: "Akiri, Fearless Voyager",         slug: "akiri-fearless-voyager" },
  { name: "Malcolm, Keen-Eyed Navigator",    slug: "malcolm-keen-eyed-navigator" },
  { name: "Piru, the Volatile",              slug: "piru-the-volatile" },
  { name: "Akroma, Vision of Ixidor",        slug: "akroma-vision-of-ixidor" },
  { name: "Obuun, Mul Daya Ancestor",        slug: "obuun-mul-daya-ancestor" },
  { name: "Amareth, the Lustrous",           slug: "amareth-the-lustrous" },
  { name: "Hamza, Guardian of Arashin",      slug: "hamza-guardian-of-arashin" },
  { name: "Kodama of the East Tree",         slug: "kodama-of-the-east-tree" },
  { name: "Kraum, Ludevic's Opus",           slug: "kraum-ludevics-opus" },
  // Kaldheim (2021)
  { name: "Esika, God of the Tree",          slug: "esika-god-of-the-tree" },
  { name: "Jorn, God of Winter",             slug: "jorn-god-of-winter" },
  { name: "Aegar, the Freezing Flame",       slug: "aegar-the-freezing-flame" },
  { name: "Svella, Ice Shaper",              slug: "svella-ice-shaper" },
  // Strixhaven / C21 (2021)
  { name: "Zaffai, Thunder Conductor",       slug: "zaffai-thunder-conductor" },
  { name: "Losheel, Clockwork Scholar",      slug: "losheel-clockwork-scholar" },
  { name: "Willowdusk, Essence Seer",        slug: "willowdusk-essence-seer" },
  { name: "Osgir, the Reconstructor",        slug: "osgir-the-reconstructor" },
  { name: "Alibou, Ancient Witness",         slug: "alibou-ancient-witness" },
  { name: "Laelia, the Blade Reforged",      slug: "laelia-the-blade-reforged" },
  { name: "Adrix and Nev, Twincasters",      slug: "adrix-and-nev-twincasters" },
  // Adventures in the Forgotten Realms (2021)
  { name: "Galea, Kindler of Hope",          slug: "galea-kindler-of-hope" },
  { name: "Sefris of the Hidden Ways",       slug: "sefris-of-the-hidden-ways" },
  { name: "Vrondiss, Rage of Ancients",      slug: "vrondiss-rage-of-ancients" },
  { name: "Lolth, Spider Queen",             slug: "lolth-spider-queen" },
  { name: "Tasha, the Witch Queen",          slug: "tasha-the-witch-queen" },
  { name: "Baeloth Barrityl, Entertainer",   slug: "baeloth-barrityl-entertainer" },
  { name: "Firkraag, Cunning Instigator",    slug: "firkraag-cunning-instigator" },
  { name: "Gorion, Wise Mentor",             slug: "gorion-wise-mentor" },
  // Midnight Hunt / Crimson Vow (2021)
  { name: "Lier, Disciple of the Drowned",   slug: "lier-disciple-of-the-drowned" },
  { name: "Millicent, Restless Revenant",    slug: "millicent-restless-revenant" },
  { name: "Strefan, Maurer Progenitor",      slug: "strefan-maurer-progenitor" },
  { name: "Ludevic, Necrogenius",            slug: "ludevic-necrogenius" },
  { name: "Liesa, Forgotten Archangel",      slug: "liesa-forgotten-archangel" },
  // Neon Dynasty / New Capenna / CLB (2022)
  { name: "Hinata, Dawn-Crowned",            slug: "hinata-dawn-crowned" },
  { name: "Kaito Shizuki",                   slug: "kaito-shizuki" },
  { name: "Evelyn, the Covetous",            slug: "evelyn-the-covetous" },
  { name: "Mahadi, Emporium Master",         slug: "mahadi-emporium-master" },
  { name: "Rigo, Streetwise Mentor",         slug: "rigo-streetwise-mentor" },
  { name: "Perrie, the Pulverizer",          slug: "perrie-the-pulverizer" },
  { name: "Elminster",                       slug: "elminster" },
  { name: "Lae'zel, Vlaakith's Champion",    slug: "laezel-vlaakiths-champion" },
  { name: "Raphael, Fiendish Savior",        slug: "raphael-fiendish-savior" },
  { name: "Myrkul, Lord of Bones",           slug: "myrkul-lord-of-bones" },
  { name: "Halana and Alena, Partners",      slug: "halana-and-alena-partners" },
  { name: "Old Gnawbone",                    slug: "old-gnawbone" },
  // Dominaria United / BRO / ONE (2022–23)
  { name: "Dihada, Binder of Wills",         slug: "dihada-binder-of-wills" },
  { name: "Jared Carthalion, True Heir",     slug: "jared-carthalion-true-heir" },
  { name: "Ertai Resurrected",               slug: "ertai-resurrected" },
  { name: "Ashnod the Uncaring",             slug: "ashnod-the-uncaring" },
  { name: "Mishra, Eminent One",             slug: "mishra-eminent-one" },
  { name: "Hazezon, Shaper of Sand",         slug: "hazezon-shaper-of-sand" },
  { name: "Ixhel, Scion of Atraxa",          slug: "ixhel-scion-of-atraxa" },
  { name: "Ezuri, Stalker of Spheres",       slug: "ezuri-stalker-of-spheres" },
  { name: "Neyali, Suns' Vanguard",          slug: "neyali-suns-vanguard" },
  { name: "Atraxa, Grand Unifier",           slug: "atraxa-grand-unifier" },
  // MOM / LCI / MKM (2023–24)
  { name: "Zimone and Dina",                 slug: "zimone-and-dina" },
  { name: "Anikthea, Hand of Erebos",        slug: "anikthea-hand-of-erebos" },
  { name: "Hakbal of the Surging Soul",      slug: "hakbal-of-the-surging-soul" },
  { name: "Ojer Taq, Deepest Foundation",    slug: "ojer-taq-deepest-foundation" },
  { name: "Niv-Mizzet, Supreme",             slug: "niv-mizzet-supreme" },
  { name: "Massacre Girl, Known Killer",     slug: "massacre-girl-known-killer" },
  { name: "Marchesa, Dealer of Death",       slug: "marchesa-dealer-of-death" },
  { name: "Tivit, Seller of Secrets",        slug: "tivit-seller-of-secrets" },
  { name: "Minsc & Boo, Timeless Heroes",    slug: "minsc-and-boo-timeless-heroes" },
];

// ─── Difficulty ───────────────────────────────────────────────────────────────
// Each level defines the minimum ratio (max/min num_decks) required for a pair.
// Higher ratio = easier (more obvious winner). As streak grows, ratio shrinks → harder.
// minRatio/maxRatio: inclusion-rate ratio band — close pairs reserved for harder levels.
// minInclusion: at least one card in the pair must exceed this inclusion rate,
//   ensuring early rounds always feature a well-known, recognizable card.
const DIFFICULTY_LEVELS = [
  { minStreak: 0,  minRatio: 2.0,  maxRatio: Infinity, minInclusion: 0.30, label: 'Easy',      color: '#22c55e' },
  { minStreak: 3,  minRatio: 1.5,  maxRatio: 2.0,      minInclusion: 0.15, label: 'Medium',    color: '#f59e0b' },
  { minStreak: 6,  minRatio: 1.25, maxRatio: 1.5,      minInclusion: 0.08, label: 'Hard',      color: '#f97316' },
  { minStreak: 10, minRatio: 1.12, maxRatio: 1.25,     minInclusion: 0.03, label: 'Expert',    color: '#ef4444' },
  { minStreak: 15, minRatio: 1.0,  maxRatio: 1.12,     minInclusion: 0,    label: 'Nightmare', color: '#a855f7' },
];

function getDifficultyLevel(s) {
  for (let i = DIFFICULTY_LEVELS.length - 1; i >= 0; i--) {
    if (s >= DIFFICULTY_LEVELS[i].minStreak) return DIFFICULTY_LEVELS[i];
  }
  return DIFFICULTY_LEVELS[0];
}

// ─── Dynamic Commander Pool ────────────────────────────────────────────────────
// Fetched at startup from EDHREC; falls back to the hardcoded COMMANDERS list.
let commanderPool = [...COMMANDERS];

async function fetchCommanderPool() {
  // The main commanders.json returns 403 from browsers; try paginated endpoints instead.
  const pool = [];
  try {
    for (let page = 0; page <= 2; page++) {
      const res = await fetch(`${EDHREC_BASE}/pages/commanders/year-past2years-${page}.json`);
      if (!res.ok) break;
      const data = await res.json();
      const json_dict = data?.container?.json_dict || data;
      const cardlists = json_dict?.cardlists || json_dict?.card_lists || [];
      for (const section of cardlists) {
        for (const card of (section.cardviews || section.cards || [])) {
          if (!card.name) continue;
          const cardUrl = card.url || card.href || '';
          const match = cardUrl.match(/\/commanders\/([^/?#]+)/);
          if (match) pool.push({ name: card.name, slug: match[1] });
        }
      }
    }
  } catch (err) {
    console.warn('Commander list fetch failed, using built-in list:', err.message);
  }

  if (pool.length >= 20) {
    console.log(`Dynamic commander pool: ${pool.length} commanders`);
    commanderPool = pool;
    shuffledQueue = [];
  }
}

// ─── State ────────────────────────────────────────────────────────────────────
let streak = 0;
let bestStreak = 0;
let bestStreakCommander = '';
let currentCommander = null;
let cardPool = [];
let roundData = null;       // { a, b } card objects
let answered = false;
let lastAnswerCorrect = false;
let autoAdvanceTimer = null;
let shuffledQueue = [];
let usedCardPairs = new Set();

// ─── DOM ─────────────────────────────────────────────────────────────────────
const loadingScreen  = document.getElementById('loading-screen');
const loadingText    = document.getElementById('loading-text');
const errorScreen    = document.getElementById('error-screen');
const errorMsg       = document.getElementById('error-msg');
const gameEl         = document.getElementById('game');
const streakEl       = document.getElementById('streak');
const streakFlame    = document.getElementById('streak-flame');
const bestStreakEl   = document.getElementById('best-streak');
const hstatBest      = document.getElementById('hstat-best');
const commanderImg   = document.getElementById('commander-img');
const commanderName  = document.getElementById('commander-name');
const commanderMeta  = document.getElementById('commander-meta');
const optionA        = document.getElementById('option-a');
const optionB        = document.getElementById('option-b');
const imgA           = document.getElementById('img-a');
const imgB           = document.getElementById('img-b');
const nameA          = document.getElementById('name-a');
const nameB          = document.getElementById('name-b');
const overlayA       = document.getElementById('overlay-a');
const overlayB       = document.getElementById('overlay-b');
const iconA          = document.getElementById('icon-a');
const iconB          = document.getElementById('icon-b');
const pctA           = document.getElementById('pct-a');
const pctB           = document.getElementById('pct-b');
const countA         = document.getElementById('count-a');
const countB         = document.getElementById('count-b');
const feedbackBar      = document.getElementById('feedback-bar');
const feedbackText     = document.getElementById('feedback-text');
const feedbackSub      = document.getElementById('feedback-sub');
const difficultyBadge  = document.getElementById('difficulty-badge');

// ─── EDHREC API ───────────────────────────────────────────────────────────────
function shouldExcludeSection(header) {
  const h = (header || '').toLowerCase();
  return EXCLUDED_SECTION_KEYWORDS.some(kw => h.includes(kw));
}

function shouldExcludeCard(card) {
  if (MANA_ROCKS.has(card.name)) return true;
  // EDHREC type field is often null; catch remaining mana rocks by name pattern
  if (/signet$/.test(card.name) || /talisman of /i.test(card.name)) return true;
  // Catch any remaining land names via type when populated
  const type = (card.type || '').toLowerCase();
  if (type && type.includes('land')) return true;
  return false;
}

function getImageUrl(card) {
  // EDHREC comparison cards always have image_uris: null — use Scryfall
  return `https://api.scryfall.com/cards/named?format=image&version=normal&exact=${encodeURIComponent(card.name)}`;
}

function getCommanderImageUrl(cmdCard) {
  if (!cmdCard) return null;
  // EDHREC returns image_uris as an array: [{normal, art_crop}]
  const uris = cmdCard.image_uris;
  if (Array.isArray(uris) && uris.length > 0) {
    return uris[0].normal || uris[0].art_crop;
  }
  if (uris && typeof uris === 'object') {
    return uris.normal || uris.large || uris.art_crop;
  }
  return `https://api.scryfall.com/cards/named?format=image&version=normal&exact=${encodeURIComponent(cmdCard.name)}`;
}

function getInclusion(card) {
  // EDHREC: num_decks = raw count, potential_decks = total eligible
  if (card.num_decks != null && card.potential_decks) {
    return card.num_decks / card.potential_decks;
  }
  return card.inclusion || 0;
}

async function fetchCommanderData(slug) {
  const url = `${EDHREC_BASE}/pages/commanders/${slug}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`EDHREC ${res.status} for ${slug}`);
  return res.json();
}

function parseCardPool(data) {
  // Try both documented response shapes
  const json_dict = data?.container?.json_dict || data;
  const cardlists = json_dict?.cardlists || json_dict?.card_lists || [];

  const cards = [];
  for (const section of cardlists) {
    if (shouldExcludeSection(section.header)) continue;
    for (const card of (section.cardviews || section.cards || [])) {
      if (!card.name) continue;
      if (shouldExcludeCard(card)) continue;
      if (!card.num_decks || card.num_decks < 10) continue;
      cards.push(card);
    }
  }
  return cards;
}

function getCommanderCard(data) {
  return data?.container?.json_dict?.card || data?.card || null;
}

// ─── Game Logic ───────────────────────────────────────────────────────────────
async function loadCommander(commander) {
  showLoading(`Loading decks for ${commander.name}…`);
  hideError();

  try {
    const data = await fetchCommanderData(commander.slug);
    const cards = parseCardPool(data);

    if (cards.length < 10) {
      throw new Error(`Not enough card data for ${commander.name} (got ${cards.length} cards)`);
    }

    currentCommander = commander;
    cardPool = cards;
    usedCardPairs.clear();

    // Set commander display
    const cmdCard = getCommanderCard(data);
    const cmdImageUrl = getCommanderImageUrl(cmdCard)
      || `https://api.scryfall.com/cards/named?format=image&version=normal&exact=${encodeURIComponent(commander.name)}`;

    commanderImg.src = cmdImageUrl;
    commanderName.textContent = commander.name;
    commanderMeta.textContent = `${cards.length} cards in pool`;

    showGame();
    nextRound();
  } catch (err) {
    console.error(err);
    // Remove this commander from the pool so we don't retry it this session
    commanderPool = commanderPool.filter(c => c.slug !== commander.slug);
    showError(`Couldn't load data for "${commander.name}". ${err.message}`);
  }
}

function pickRandomCommander() {
  if (shuffledQueue.length === 0) {
    shuffledQueue = [...commanderPool];
    for (let i = shuffledQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
    }
  }
  return shuffledQueue.pop();
}

function pickPair() {
  // O(n²) search over the card pool.
  // Pairs must satisfy three constraints at the target difficulty:
  //   ratio band  — enforces the gap between the two cards (ratio = max/min inclusion)
  //   minInclusion — at least one card must exceed this threshold (well-known card anchor)
  const { minRatio, maxRatio, minInclusion } = getDifficultyLevel(streak);

  function findCandidates(mn, mx, minInc) {
    const out = [];
    for (let i = 0; i < cardPool.length - 1; i++) {
      for (let j = i + 1; j < cardPool.length; j++) {
        const a = cardPool[i], b = cardPool[j];
        const pairKey = [a.name, b.name].sort().join('|||');
        if (usedCardPairs.has(pairKey)) continue;
        const incA = getInclusion(a), incB = getInclusion(b);
        if (incA === 0 || incB === 0) continue;
        const ratio = Math.max(incA, incB) / Math.min(incA, incB);
        if (ratio < mn || ratio >= mx) continue;
        // At least one card must be well-known (above the popularity floor)
        if (Math.max(incA, incB) < minInc) continue;
        out.push({ a, b, pairKey });
      }
    }
    return out;
  }

  // 1. Exact band + popularity floor
  let candidates = findCandidates(minRatio, maxRatio, minInclusion);

  // 2. Pair pool exhausted — reset and retry with same constraints
  if (candidates.length === 0) {
    usedCardPairs.clear();
    candidates = findCandidates(minRatio, maxRatio, minInclusion);
  }

  // 3. Relax maxRatio (keep lower bound + popularity floor)
  if (candidates.length === 0) {
    candidates = findCandidates(minRatio, Infinity, minInclusion);
  }

  // 4. Relax popularity floor too (keep ratio lower bound)
  if (candidates.length === 0) {
    candidates = findCandidates(minRatio, Infinity, 0);
  }

  // 5. Last resort — any pair
  if (candidates.length === 0) {
    candidates = findCandidates(1.0, Infinity, 0);
  }

  if (candidates.length > 0) {
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    usedCardPairs.add(pick.pairKey);
    return { a: pick.a, b: pick.b };
  }

  return { a: cardPool[0], b: cardPool[1] };
}

function nextRound() {
  if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
  answered = false;

  const diff = getDifficultyLevel(streak);
  difficultyBadge.textContent = diff.label;
  difficultyBadge.style.color = diff.color;

  const pair = pickPair();

  // Randomly assign left/right to avoid positional bias
  const [left, right] = Math.random() < 0.5 ? [pair.a, pair.b] : [pair.b, pair.a];

  // Reset card options
  optionA.className = 'card-option';
  optionB.className = 'card-option';
  optionA.dataset.card = left.name;
  optionB.dataset.card = right.name;

  overlayA.style.opacity = '0';
  overlayB.style.opacity = '0';

  imgA.style.opacity = '0';
  imgB.style.opacity = '0';
  imgA.src = getImageUrl(left);
  imgB.src = getImageUrl(right);
  imgA.onload = () => { imgA.style.opacity = '1'; };
  imgB.onload = () => { imgB.style.opacity = '1'; };

  nameA.textContent = left.name;
  nameB.textContent = right.name;

  feedbackBar.className = 'feedback-bar';
  feedbackText.textContent = '';
  feedbackSub.textContent = '';
}

function handlePick(side) {
  if (answered) return;
  answered = true;

  const leftCard  = cardPool.find(c => c.name === optionA.dataset.card);
  const rightCard = cardPool.find(c => c.name === optionB.dataset.card);
  if (!leftCard || !rightCard) return;

  const winner = getInclusion(leftCard) >= getInclusion(rightCard) ? leftCard : rightCard;
  const pickedCard = side === 'a' ? leftCard : rightCard;
  const isCorrect = pickedCard.name === winner.name;

  if (isCorrect) {
    lastAnswerCorrect = true;
    streak++;
    if (streak > bestStreak) {
      bestStreak = streak;
      bestStreakCommander = currentCommander.name;
    }
    updateStreakDisplay();
    showFeedback(true, leftCard, rightCard, winner);
    saveScores();
    revealResults(leftCard, rightCard, winner, true, side);
    // Correct: stay on same commander, advance to next round
    autoAdvanceTimer = setTimeout(() => nextRound(), 2000);
  } else {
    lastAnswerCorrect = false;
    streak = 0;
    updateStreakDisplay();
    showFeedback(false, leftCard, rightCard, winner);
    saveScores();
    revealResults(leftCard, rightCard, winner, false, side);
    // Wrong: load a new commander after showing the result
    autoAdvanceTimer = setTimeout(() => {
      loadCommander(pickRandomCommander());
    }, 2200);
  }
}

function revealResults(leftCard, rightCard, winner, isCorrect, side) {
  const leftPct  = (getInclusion(leftCard)  * 100).toFixed(1);
  const rightPct = (getInclusion(rightCard) * 100).toFixed(1);

  pctA.textContent  = `${leftPct}%`;
  pctB.textContent  = `${rightPct}%`;
  countA.textContent = `${leftCard.num_decks.toLocaleString()} decks`;
  countB.textContent = `${rightCard.num_decks.toLocaleString()} decks`;

  const aIsWinner = leftCard.name === winner.name;

  if (isCorrect) {
    // Green checkmark on the winning card, dark on the loser
    iconA.textContent = aIsWinner ? '✓' : '';
    iconB.textContent = !aIsWinner ? '✓' : '';
    overlayA.className = `result-overlay ${aIsWinner ? 'winner' : 'loser'}`;
    overlayB.className = `result-overlay ${!aIsWinner ? 'winner' : 'loser'}`;
  } else {
    // Red ✕ on the card the player picked — no green on the correct card
    const aWasPicked = side === 'a';
    iconA.textContent = aWasPicked ? '✕' : '';
    iconB.textContent = !aWasPicked ? '✕' : '';
    overlayA.className = `result-overlay ${aWasPicked ? 'picked-wrong' : 'loser'}`;
    overlayB.className = `result-overlay ${!aWasPicked ? 'picked-wrong' : 'loser'}`;
  }

  // Animate in
  requestAnimationFrame(() => {
    overlayA.style.opacity = '1';
    overlayB.style.opacity = '1';
  });

  // Highlight the chosen option
  optionA.classList.add('revealed');
  optionB.classList.add('revealed');
}

function showFeedback(correct, leftCard, rightCard, winner) {
  feedbackBar.className = `feedback-bar ${correct ? 'correct' : 'wrong'}`;

  if (correct) {
    const streakMsg = streak >= 3 ? ` — ${streak} in a row!` : '';
    feedbackText.textContent = `Correct!${streakMsg}`;
    feedbackSub.textContent = `${winner.name} — in ${winner.num_decks.toLocaleString()} decks`;
  } else {
    feedbackText.textContent = `Wrong — new commander incoming`;
    feedbackSub.textContent = `${winner.name} wins with ${winner.num_decks.toLocaleString()} decks`;
  }
}

// ─── Streak / Persistence ─────────────────────────────────────────────────────
function updateStreakDisplay() {
  streakEl.textContent = streak;
  bestStreakEl.textContent = bestStreak;
  hstatBest.title = bestStreakCommander ? `Set with ${bestStreakCommander}` : '';

  if (streak >= 10) {
    streakFlame.textContent = '🔥🔥🔥';
  } else if (streak >= 5) {
    streakFlame.textContent = '🔥🔥';
  } else if (streak >= 2) {
    streakFlame.textContent = '🔥';
  } else {
    streakFlame.textContent = '';
  }
}

function saveScores() {
  localStorage.setItem('cascade-scores', JSON.stringify({ bestStreak, commanderName: bestStreakCommander }));
}

function loadSavedScores() {
  const raw = localStorage.getItem('cascade-scores');
  const data = raw ? JSON.parse(raw) : {};
  bestStreak = data.bestStreak || 0;
  bestStreakCommander = data.commanderName || '';
  bestStreakEl.textContent = bestStreak;
  hstatBest.title = bestStreakCommander ? `Set with ${bestStreakCommander}` : '';
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────
function showLoading(msg = 'Loading…') {
  loadingText.textContent = msg;
  loadingScreen.style.display = 'flex';
  gameEl.style.display = 'none';
  errorScreen.style.display = 'none';
}

function showGame() {
  loadingScreen.style.display = 'none';
  errorScreen.style.display = 'none';
  gameEl.style.display = 'flex';
}

function hideError() {
  errorScreen.style.display = 'none';
}

function showError(msg) {
  loadingScreen.style.display = 'none';
  gameEl.style.display = 'none';
  errorMsg.textContent = msg;
  errorScreen.style.display = 'flex';
}

// ─── Events ───────────────────────────────────────────────────────────────────
// ─── Lightbox ─────────────────────────────────────────────────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  // Swap to large version if it's a Scryfall normal image
  const largeSrc = src.replace('version=normal', 'version=large');
  lightboxImg.src = largeSrc;
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
}

lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// Commander image click → lightbox
commanderImg.addEventListener('click', (e) => {
  e.stopPropagation();
  if (commanderImg.src) openLightbox(commanderImg.src);
});

optionA.addEventListener('click', () => handlePick('a'));
optionB.addEventListener('click', () => handlePick('b'));

document.getElementById('btn-new-commander').addEventListener('click', () => {
  if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
  loadCommander(pickRandomCommander());
});

document.getElementById('btn-retry').addEventListener('click', () => {
  const cmd = pickRandomCommander();
  loadCommander(cmd);
});

document.addEventListener('keydown', (e) => {
  if (loadingScreen.style.display !== 'none') return;
  switch (e.key) {
    case 'ArrowLeft':
    case 'a':
    case 'A':
      handlePick('a');
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      handlePick('b');
      break;
    case 'Enter':
    case ' ':
      // Only skip ahead on correct answers; wrong answers must wait for commander reload
      if (answered && lastAnswerCorrect && autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
        nextRound();
      }
      break;
  }
});

// ─── Share ────────────────────────────────────────────────────────────────────
document.getElementById('btn-share').addEventListener('click', () => {
  const commanderNote = bestStreakCommander ? ` (${bestStreakCommander})` : '';
  const text = `MTG Cascade 🔥 Best streak: ${bestStreak}${commanderNote}\nhttps://mcgeever1.github.io/mtg-cascade/`;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-share');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '⬆';
      btn.classList.remove('copied');
    }, 2000);
  });
});

// ─── Init ─────────────────────────────────────────────────────────────────────
(async () => {
  loadSavedScores();
  showLoading('Fetching commander list from EDHREC…');
  await fetchCommanderPool();
  await loadCommander(pickRandomCommander());
})();
