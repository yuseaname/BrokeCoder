const scenes = {
  wakeUpMotel: {
    id: "wakeUpMotel",
    text: "You wake up in a questionable LA motel. Laptop battery at 5%. Phone buzzing with unpaid client texts.",
    choices: [
      { id: "planetFitness", text: "Sprint to Planet Fitness for outlets + shower", next: "planetFitness", effects: { focus: 5 } },
      { id: "motel", text: "Stay put, answer ghost client", next: "ghostClient", effects: { money: 10, focus: -5 } },
    ],
  },
  planetFitness: {
    id: "planetFitness",
    text: "Planet Fitness smells like rubber and regret. A raccoon mini-boss guards the only outlet.",
    encounter: { enemyId: "raccoon" },
    choices: [
      { id: "fight", text: "Type-battle the raccoon for the outlet", next: "fitnessWin", effects: {} },
      { id: "bribe", text: "Offer half-eaten protein bar", next: "fitnessWin", effects: { money: -5, focus: 3 } },
    ],
  },
  fitnessWin: {
    id: "fitnessWin",
    text: "Outlet secured. You sprint through a quick HTML tag drill on the treadmill.",
    lesson: { id: "s1c1-1" },
    choices: [
      { id: "alley", text: "Head to the alley coworking spot", next: "alley" },
    ],
  },
  ghostClient: {
    id: "ghostClient",
    text: "Ghost client finally replies: 'Can we do it for exposure?'", 
    choices: [
      { id: "sayNo", text: "Say no, demand cash", next: "alley", effects: { money: 15, focus: -2 } },
      { id: "sayYes", text: "Sure, exposure is fine (it isn't)", next: "alley", effects: { focus: -10 } },
    ],
  },
  alley: {
    id: "alley",
    text: "Alley coworking. Crack zombies shuffle around. Meth samurai tunes a katana Bluetooth keyboard.",
    choices: [
      { id: "fightZombie", text: "Practice typing to fend off crack zombie", next: "zombieFight", effects: {} },
      { id: "shop", text: "Visit bootleg laptop sticker vendor", next: "stickerShop" },
    ],
  },
  zombieFight: {
    id: "zombieFight",
    text: "Crack zombie lunges; time to type for your life.",
    encounter: { enemyId: "crackZombie" },
    choices: [
      { id: "afterBattle", text: "Catch your breath", next: "stickerShop", effects: { xp: 20, money: 10 } },
    ],
  },
  stickerShop: {
    id: "stickerShop",
    text: "Sticker vendor: 'Chrome Dino? Vaporwave raccoon? Pick one.'",
    choices: [
      { id: "buy", text: "Open shop", next: "partyTemptation" },
      { id: "skip", text: "Skip shop", next: "partyTemptation" },
    ],
  },
  partyTemptation: {
    id: "partyTemptation",
    text: "A party promoter offers free drinks if you ditch work tonight.",
    choices: [
      { id: "focus", text: "Stay focused, grind typing", next: "finalPush", effects: { focus: 10, xp: 15 } },
      { id: "party", text: "Party. Maybe bad idea.", next: "finalPush", effects: { focus: -20, money: -15 } },
    ],
  },
  finalPush: {
    id: "finalPush",
    text: "Laptop thief stalks you on the metro. Last typing stand of the night.",
    encounter: { enemyId: "laptopThief" },
    choices: [
      { id: "end", text: "Stare into neon horizon", next: null, effects: { xp: 40, money: 25 } },
    ],
  },
};

export default scenes;
