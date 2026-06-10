const STYLE_SUFFIX = "real Airbnb-style interior photography, Greek island apartment, soft natural daylight, lived-in but uncluttered, white linen, navy and sand tones, rattan and olive wood furniture, handmade ceramics, warm minimal palette, photorealistic, shot on film, no text, no watermark, no logo";

function p(desc) {
  return `${desc}, ${STYLE_SUFFIX}`;
}

const VARIATIONS = [
  "styled on a sunlit terrace overlooking olive trees",
  "arranged in a bright, minimalist bedroom",
  "set in a cozy lived-in Greek island living room",
  "displayed on an olive wood shelf in soft morning light",
  "styled for a relaxed outdoor lunch with fresh produce",
  "close-up detail shot highlighting natural texture and craftsmanship",
  "arranged on a linen-covered table with dried flowers",
  "in everyday use during golden hour, lived-in feel",
  "styled in a sunlit reading nook with a woven throw",
  "flat lay on white linen with soft natural shadows",
  "styled in a small bathroom with natural light",
  "arranged near an open window with sheer curtains",
  "styled on a balcony table with a sea view in soft focus",
  "grouped together on a wooden bench in natural light",
  "styled in an entryway with woven baskets and ceramics"
];

const STYLE_GUIDE = {
  feel_like: [
    "Real Airbnb or Greek apartment photography",
    "Natural sunlight · lived-in but uncluttered",
    "White linen · navy · sand · rattan · olive wood · ceramics",
    "Something a customer could actually receive"
  ],
  never_use: [
    "Magazine mansion or impossible architecture",
    "Grey hotel furniture · black modern · chrome",
    "Fake or perfect AI over-styling",
    "Bright or saturated colours"
  ]
};

const PHASE1 = {
  id: "phase1",
  label: "PHASE 1 LAUNCH",
  shortLabel: "Phase 1",
  categories: [
    {
      id: "hero-lifestyle",
      label: "Hero Lifestyle",
      count: 10,
      size: "wide",
      images: [
        { filename: "kos-hero-001.jpg", prompt: p("A bright Greek island apartment living room with a white linen sofa, a navy throw pillow, a rattan armchair, and an olive wood coffee table, soft morning sunlight through sheer linen curtains") },
        { filename: "kos-hero-002.jpg", prompt: p("A sunlit terrace breakfast scene with a small round table, two ceramic mugs of coffee, a woven placemat, and olive branches in a ceramic vase, soft sea-view background") },
        { filename: "kos-hero-003.jpg", prompt: p("A cozy bedroom corner with crisp white linen bedding, a sand-colored knit throw folded at the foot of the bed, a woven rattan headboard, morning light through sheer curtains") },
        { filename: "kos-hero-004.jpg", prompt: p("A bright bathroom with white tiles, a freestanding tub, neatly folded white and navy linen towels stacked on a wooden stool, a small ceramic dish with soap, natural daylight") },
        { filename: "kos-hero-005.jpg", prompt: p("A dining nook with an olive wood table set for two, handmade ceramic plates, navy linen napkins, a small vase of dried wildflowers, warm afternoon light") },
        { filename: "kos-table-003.jpg", prompt: p("A family gathered around a long olive wood dining table on a sunlit terrace, ceramic serving bowls of fresh fruit, linen napkins, relaxed lived-in Greek island gathering") },
        { filename: "kos-table-004.jpg", prompt: p("A person setting an olive wood dining table for dinner at golden hour, placing ceramic plates and linen napkins, warm evening light through an open doorway") },
        { filename: "kos-table-005.jpg", prompt: p("An olive wood dining table on a sunlit terrace set with ceramic bowls of fresh fruit, a linen tablecloth, and a glass pitcher of water, bright midday light") },
        { filename: "kos-terrace-003.jpg", prompt: p("A person relaxing on a rattan lounge chair on a sunlit terrace, reading a book, a sand linen cushion and a small side table with a ceramic cup, soft natural light") },
        { filename: "kos-terrace-004.jpg", prompt: p("A terrace set up for evening drinks at golden hour, rattan armchairs with navy and sand cushions, a low olive wood table with ceramic glasses and a small lantern") }
      ]
    },
    {
      id: "collection-shots",
      label: "Collection Shots",
      count: 7,
      size: "wide",
      images: [
        { filename: "kos-table-001.jpg", prompt: p("The full Kos Table collection styled on a sunlit terrace: olive wood dining table, handmade ceramic dinnerware, linen napkins in white and navy, natural daylight") },
        { filename: "kos-bed-001.jpg", prompt: p("The full Kos Bed collection styled in a bright bedroom: white linen duvet, sand-colored linen pillowcases, a navy woven throw, rattan headboard, soft morning light") },
        { filename: "kos-bath-001.jpg", prompt: p("The full Kos Bath collection styled in a bright bathroom: stacked white and navy linen towels, a woven bath mat, ceramic soap dishes, natural daylight") },
        { filename: "kos-terrace-001.jpg", prompt: p("The full Kos Terrace collection styled on a sunlit terrace: rattan armchairs with sand and navy cushions, a low olive wood side table, woven outdoor rug") },
        { filename: "kos-light-001.jpg", prompt: p("The full Kos Light collection styled in a living room: a rattan pendant lamp, a ceramic table lamp with a linen shade, a small woven lantern, warm evening glow") },
        { filename: "kos-scent-001.jpg", prompt: p("The full Kos Scent collection styled on an olive wood shelf: hand-poured candles in ceramic vessels, a reed diffuser, dried olive branches, soft natural light") },
        { filename: "kos-objects-001.jpg", prompt: p("The full Kos Objects collection styled on an olive wood console: handmade ceramic vases, a woven storage basket, a carved wooden bowl, natural daylight") }
      ]
    },
    {
      id: "product-detail",
      label: "Product Detail",
      count: 7,
      size: "square",
      images: [
        { filename: "kos-table-002.jpg", prompt: p("Close-up detail of the Kos Table collection: olive wood grain texture next to a handmade ceramic plate with subtle glaze variation, soft natural light") },
        { filename: "kos-bed-002.jpg", prompt: p("Close-up detail of the Kos Bed collection: textured white linen weave with a sand-colored stitched edge, soft natural light, shallow depth of field") },
        { filename: "kos-bath-002.jpg", prompt: p("Close-up detail of the Kos Bath collection: textured navy linen towel folded next to a small ceramic soap dish, natural daylight, shallow depth of field") },
        { filename: "kos-terrace-002.jpg", prompt: p("Close-up detail of the Kos Terrace collection: hand-woven rattan chair texture next to a sand linen cushion corner, warm natural light") },
        { filename: "kos-light-002.jpg", prompt: p("Close-up detail of the Kos Light collection: woven rattan lamp shade with warm light glowing through the weave, soft evening tones") },
        { filename: "kos-scent-002.jpg", prompt: p("Close-up detail of the Kos Scent collection: a hand-poured candle in a textured ceramic vessel with a lit wick, soft warm glow") },
        { filename: "kos-objects-002.jpg", prompt: p("Close-up detail of the Kos Objects collection: a handmade ceramic vase with visible glaze texture beside a small woven tray, natural daylight") }
      ]
    },
    {
      id: "airbnb-transformations",
      label: "Airbnb Transformations",
      count: 3,
      size: "wide",
      images: [
        { filename: "kos-hero-before-001.jpg", prompt: p("A plain, dated Greek apartment room before renovation: bare white walls, an empty bed frame with no linens, harsh overhead light, slightly cluttered and impersonal") },
        { filename: "kos-terrace-005.jpg", prompt: p("After transformation: a plain terrace now styled with the Kos Terrace collection, rattan armchairs with sand and navy cushions, a woven rug, warm natural light, lived-in Greek island feel") },
        { filename: "kos-terrace-006.jpg", prompt: p("After transformation: a wider view of the same terrace in the evening, lanterns lit, ceramic drinkware on the side table, relaxed golden hour atmosphere") }
      ]
    },
    {
      id: "maker-story",
      label: "Maker / Story",
      count: 3,
      size: "wide",
      images: [
        { filename: "kos-bed-003.jpg", prompt: p("An artisan's hands folding freshly washed white linen sheets on a wooden table, soft natural window light, close-up documentary style") },
        { filename: "kos-scent-003.jpg", prompt: p("An artisan pouring melted wax into a handmade ceramic candle vessel in a small workshop, warm natural light, documentary style") },
        { filename: "kos-business-hotel-001.jpg", prompt: p("A small boutique guesthouse room styled entirely with the Kos Home Made collection: linen bedding, rattan chair, ceramic accessories, warm welcoming natural light, ready for guests") }
      ]
    }
  ]
};

const COLLECTIONS = {
  id: "collections",
  label: "COLLECTIONS",
  shortLabel: "Collections",
  categories: [
    { id: "kos-table", label: "01 The Kos Table", count: 20, slug: "table", phase1Count: 5, size: "wide", base: "Kos Table collection: olive wood dining table, handmade ceramic dinnerware, linen napkins" },
    { id: "kos-bed", label: "02 The Kos Bed", count: 20, slug: "bed", phase1Count: 3, size: "wide", base: "Kos Bed collection: white and sand linen bedding, woven throws, rattan headboard" },
    { id: "kos-bath", label: "03 The Kos Bath", count: 15, slug: "bath", phase1Count: 2, size: "square", base: "Kos Bath collection: white and navy linen towels, woven bath mat, ceramic soap dishes" },
    { id: "kos-terrace", label: "04 The Kos Terrace", count: 20, slug: "terrace", phase1Count: 6, size: "wide", base: "Kos Terrace collection: rattan outdoor furniture with sand and navy cushions, woven rug" },
    { id: "kos-light", label: "05 The Kos Light", count: 10, slug: "light", phase1Count: 2, size: "square", base: "Kos Light collection: rattan pendant lamps, ceramic table lamps, woven lanterns" },
    { id: "kos-scent", label: "06 The Kos Scent", count: 10, slug: "scent", phase1Count: 3, size: "square", base: "Kos Scent collection: hand-poured candles in ceramic vessels, reed diffusers, dried botanicals" },
    { id: "kos-objects", label: "07 The Kos Objects", count: 20, slug: "objects", phase1Count: 2, size: "square", base: "Kos Objects collection: handmade ceramic vases, woven baskets, carved wooden bowls" }
  ]
};

const BUSINESS = {
  id: "business",
  label: "BUSINESS",
  shortLabel: "Business",
  categories: [
    { id: "business-shots", label: "Business Shots", count: 10, slug: "business", phase1Count: 1, size: "wide", base: "Kos Home Made products styled in a small boutique hotel or guesthouse setting: linen, rattan, ceramics, warm welcoming natural light" },
    { id: "residence-001", label: "Residence 001", count: 5, slug: "residence", phase1Count: 0, size: "wide", base: "A real Greek island residence styled entirely with the Kos Home Made collection: linen bedding, rattan furniture, ceramics, olive wood accents, lived-in and welcoming, natural light throughout" }
  ]
};

const SECTIONS = [PHASE1, COLLECTIONS, BUSINESS];

const PHASE1_MANIFEST_ORDER = [
  "kos-hero-001.jpg", "kos-hero-002.jpg", "kos-hero-003.jpg", "kos-hero-004.jpg", "kos-hero-005.jpg",
  "kos-table-001.jpg", "kos-table-002.jpg", "kos-table-003.jpg", "kos-table-004.jpg", "kos-table-005.jpg",
  "kos-bed-001.jpg", "kos-bed-002.jpg", "kos-bed-003.jpg",
  "kos-bath-001.jpg", "kos-bath-002.jpg",
  "kos-terrace-001.jpg", "kos-terrace-002.jpg", "kos-terrace-003.jpg", "kos-terrace-004.jpg", "kos-terrace-005.jpg", "kos-terrace-006.jpg",
  "kos-light-001.jpg", "kos-light-002.jpg",
  "kos-scent-001.jpg", "kos-scent-002.jpg", "kos-scent-003.jpg",
  "kos-objects-001.jpg", "kos-objects-002.jpg",
  "kos-business-hotel-001.jpg", "kos-hero-before-001.jpg"
];
