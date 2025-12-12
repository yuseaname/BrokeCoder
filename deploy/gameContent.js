import { LOCATION_IMAGES } from "./assets.js";

export const BASE_STATS = {
  coding: 1,
  hustle: 1,
  focus: 1,
  streetsmarts: 1,
  fitness: 1,
};

export const RESOURCE_CONFIG = {
  focus: { id: "focus", label: "Focus Energy", max: 10, regen: 1 },
  nerve: { id: "nerve", label: "Nerve", max: 8, regen: 1 },
  physical: { id: "physical", label: "Physical Energy", max: 10, regen: 1 },
};

export const START_RESOURCES = { focus: 8, nerve: 6, physical: 8 };

export const GEAR_LIBRARY = {
  cracked_phone: {
    id: "cracked_phone",
    name: "Cracked Phone",
    slot: "device",
    tier: 0,
    bonuses: {},
    flavor: "Day zero device. Screen is mostly duct tape.",
  },
  borrowed_keyboard: {
    id: "borrowed_keyboard",
    name: "Borrowed Bluetooth Keyboard",
    slot: "device",
    tier: 0,
    bonuses: { coding: 1, focus: 1 },
    flavor: "Keys stick sometimes, but faster than pure thumbs.",
  },
  used_laptop: {
    id: "used_laptop",
    name: "Used Laptop",
    slot: "device",
    tier: 1,
    bonuses: { coding: 2, hustle: 1, focus: 1 },
    flavor: "Fan screams, hope sings. Laptop Era unlocked.",
  },
  solid_laptop: {
    id: "solid_laptop",
    name: "Refurbished Laptop",
    slot: "device",
    tier: 2,
    bonuses: { coding: 3, hustle: 1, focus: 1 },
    flavor: "Keys actually work. Clients almost trust you.",
  },
  beat_up_car: {
    id: "beat_up_car",
    name: "Beat-Up Car",
    slot: "vehicle",
    tier: 1,
    bonuses: { hustle: 1, fitness: 1 },
    flavor: "Mobile HQ. Smells like old fries but moves missions faster.",
  },
  burner_phone: {
    id: "burner_phone",
    name: "Burner Phone",
    slot: "device",
    tier: 0,
    bonuses: { streetsmarts: 1 },
    flavor: "Backup device when the cracked one dies.",
  },
};

export const SHOP_ITEMS = [
  {
    id: "instant_noodles",
    name: "Instant Noodles Cup",
    type: "consumable",
    cost: 6,
    description: "Salty fuel that restores focus and physical energy.",
    effects: { resources: { focus: 2, physical: 2 }, morale: 1 },
  },
  {
    id: "street_coffee",
    name: "Street Cart Coffee",
    type: "consumable",
    cost: 8,
    description: "Overcaffeinated brew that sharpens focus.",
    effects: { resources: { focus: 4 }, morale: 1, stats: { focus: 1 } },
  },
  {
    id: "planet_day_pass",
    name: "Planet Fitness Day Pass",
    type: "consumable",
    cost: 12,
    description: "Shower + nap combo. The purple glow restores morale.",
    effects: { resources: { physical: 6 }, morale: 2, stats: { fitness: 1 } },
  },
  {
    id: "battery_pack",
    name: "Battery Pack",
    type: "consumable",
    cost: 18,
    description: "Keep the cracked phone alive during all-nighters.",
    effects: { resources: { focus: 3, nerve: 1 }, energy: 6 },
  },
  {
    id: "duct_tape",
    name: "Duct Tape Roll",
    type: "consumable",
    cost: 7,
    description: "Holds cracked phones, scooters, and hope together.",
    effects: { energy: 2 },
  },
  {
    id: "protein_bar",
    name: "Protein Bar",
    type: "consumable",
    cost: 5,
    description: "Cheap calories for physical stamina.",
    effects: { resources: { physical: 3 } },
  },
  {
    id: "burner_phone",
    name: "Burner Phone",
    type: "gear",
    gearId: "burner_phone",
    cost: 40,
    description: "Backup connection when your cracked screen dies.",
    effects: { energy: 4, stats: { streetsmarts: 1 } },
  },
  {
    id: "keyboard",
    name: "Borrowed Bluetooth Keyboard",
    type: "gear",
    gearId: "borrowed_keyboard",
    cost: 30,
    description: "Clipped keys but faster thumbs. Early Phone Era upgrade.",
    season: "season1",
    effects: { stats: { coding: 1, focus: 1 } },
  },
  {
    id: "used_laptop",
    name: "Used Laptop (Season Goal)",
    type: "gear",
    gearId: "used_laptop",
    cost: 150,
    description: "Unlocks the Laptop Era and better paying gigs.",
    season: "season1",
    effects: { stats: { coding: 2, hustle: 1, focus: 1 }, resources: { focus: 2 } },
  },
  {
    id: "refurb_laptop",
    name: "Refurb Laptop Upgrade",
    type: "gear",
    gearId: "solid_laptop",
    cost: 260,
    description: "Quieter fans, better keys, more client trust.",
    season: "season2",
    effects: { stats: { coding: 2, hustle: 1 }, resources: { focus: 2 } },
  },
  {
    id: "beat_up_car",
    name: "Beat-Up Car (Season 2 Goal)",
    type: "gear",
    gearId: "beat_up_car",
    cost: 520,
    description: "Mobile HQ that unlocks new missions and stamina.",
    season: "season2",
    effects: { resources: { physical: 3, nerve: 2 }, stats: { hustle: 1, fitness: 1 } },
  },
];

export const CITY_CONTENT = {
  locations: [
    {
      id: "motel",
      name: "Roadside Motel",
      description: "Thin walls, sticky floors, power outlets if you ask nicely.",
      season: "season1",
      image: LOCATION_IMAGES.motel,
    },
    {
      id: "alley",
      name: "Venice Alley",
      description: "Raccoons, crack zombies, and skateboarders that never sleep.",
      season: "season1",
      image: LOCATION_IMAGES.alley,
    },
    {
      id: "coffee_shop",
      name: "Coffee Shop",
      description: "WiFi if you buy drip; Zoom Lady lurks here.",
      season: "season1",
      image: LOCATION_IMAGES.coffee,
    },
    {
      id: "planet_fitness",
      name: "Planet Fitness",
      description: "Purple glow, safe showers, daytime typing hideout.",
      season: "season1",
      image: LOCATION_IMAGES.planet_fitness,
    },
    {
      id: "electronics",
      name: "Electronics Thrift",
      description: "Used keyboards, dusty laptops, questionable warranties.",
      season: "season1",
      image: LOCATION_IMAGES.electronics,
    },
    {
      id: "client_house",
      name: "Client House",
      description: "Upscale anxiety. First laptop gigs and demanding clients.",
      season: "season2",
      image: LOCATION_IMAGES.client_house,
    },
  ],
  missions: [
    {
      id: "motel_wifi",
      locationId: "motel",
      season: "season1",
      title: "Fix the Motel WiFi",
      summary: "Patch the captive portal and dodge ads.",
      lessonId: "ch7_lesson1",
      cost: { focus: 2, physical: 2 },
      rewards: { money: 12, xp: 12, stats: { coding: 1 } },
    },
    {
      id: "zoom_setup",
      locationId: "coffee_shop",
      season: "season1",
      title: "Help Zoom Lady",
      summary: "Onboard Zoom Lady to her next virtual class.",
      lessonId: "city_zoom_intro",
      cost: { focus: 2, nerve: 1 },
      rewards: { money: 10, xp: 10, stats: { hustle: 1 }, morale: 1 },
    },
    {
      id: "alley_rush",
      locationId: "alley",
      season: "season1",
      title: "Raccoon Chase",
      summary: "Out-type a raccoon miniboss mid-pizza.",
      lessonId: "ch6_lesson1",
      cost: { nerve: 2, physical: 2 },
      rewards: { money: 8, xp: 14, stats: { streetsmarts: 1 }, morale: 1 },
    },
    {
      id: "planet_cleanup",
      locationId: "planet_fitness",
      season: "season1",
      title: "Planet Fitness Checkout",
      summary: "Quiet typing drills between showers.",
      lessonId: "ch5_lesson1",
      cost: { physical: 3, focus: 1 },
      rewards: { money: 11, xp: 12, stats: { fitness: 1, focus: 1 } },
    },
    {
      id: "electronics_inventory",
      locationId: "electronics",
      season: "season1",
      title: "Inventory Spreadsheet",
      summary: "Type SKU codes for the thrift shop owner.",
      lessonId: "city_inventory",
      cost: { focus: 2, nerve: 1 },
      rewards: { money: 15, xp: 10, stats: { coding: 1, hustle: 1 } },
    },
    {
      id: "frog_blog",
      locationId: "coffee_shop",
      season: "season2",
      title: "Frog Blog Rush",
      summary: "Crank out the frog-lover blog post.",
      lessonId: "s2_ch2_lesson1",
      cost: { focus: 3, nerve: 1 },
      rewards: { money: 20, xp: 18, stats: { coding: 1, hustle: 1 } },
    },
    {
      id: "client_email_fire",
      locationId: "client_house",
      season: "season2",
      title: "Calm the Client",
      summary: "Rewrite an angry email before it spreads.",
      lessonId: "s2_ch4_lesson1",
      cost: { focus: 3, nerve: 2 },
      rewards: { money: 24, xp: 22, stats: { hustle: 1, streetsmarts: 1 } },
    },
    {
      id: "html_flyer",
      locationId: "electronics",
      season: "season2",
      title: "HTML Flyer",
      summary: "Build a tiny HTML flyer for a pawn shop.",
      lessonId: "s2_html_snippet",
      cost: { focus: 4, physical: 2 },
      rewards: { money: 28, xp: 24, stats: { coding: 2 } },
    },
    {
      id: "alley_samurai",
      locationId: "alley",
      season: "season2",
      title: "Meth Samurai Standoff",
      summary: "Type a distraction before he swings.",
      lessonId: "s2_ch7_lesson1",
      cost: { nerve: 3, physical: 3 },
      rewards: { money: 26, xp: 28, stats: { streetsmarts: 1, fitness: 1 }, morale: 1 },
    },
    {
      id: "big_contract",
      locationId: "client_house",
      season: "season2",
      title: "First Big Contract",
      summary: "Ship the final deliverable.",
      lessonId: "s2_ch8_final",
      cost: { focus: 5, physical: 3 },
      rewards: { money: 60, xp: 40, stats: { coding: 2, hustle: 1 }, morale: 2 },
    },
  ],
};

export function getMissionById(id) {
  return CITY_CONTENT.missions.find((m) => m.id === id) || null;
}

export function getShopItem(id) {
  return SHOP_ITEMS.find((i) => i.id === id) || null;
}

export function getGearById(id) {
  return GEAR_LIBRARY[id] || null;
}
