export const QUESTS = [
  // ---- City mission chains: multi-mission per location ----
  {
    id: "city_motel_outlets",
    title: "Claim the Outlet Row",
    description: "Secure reliable power at the roadside motel without burning bridges.",
    type: "city",
    locationId: "motel",
    difficulty: "low",
    repeatable: true,
    prerequisites: { minResources: { focusEnergy: 2, nerveEnergy: 1, physicalEnergy: 1 } },
    steps: [
      {
        id: "outlets",
        text: "Only three outlets work and travelers guard them like treasure.",
        choices: [
          {
            id: "pay_off_clerk",
            label: "Slide the clerk a $5 to look the other way",
            cost: { money: 5, focusEnergy: 1, nerveEnergy: 1, time: 1 },
            risk: "Clerk might pocket it and still call security",
            success: {
              outcomes: { streetCred: 1, setFlags: { powerHog: false }, unlockQuests: ["city_motel_generator"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -1,
                resources: { focusEnergy: -2, nerveEnergy: -2, physicalEnergy: -1 },
                setFlags: { powerHog: true },
              },
              failQuest: true,
            },
          },
          {
            id: "organize_queue",
            label: "Organize an outlet schedule with the hallway crowd",
            cost: { focusEnergy: 2, nerveEnergy: 1, time: 2 },
            risk: "People might ignore your rules",
            success: {
              outcomes: {
                streetCred: 2,
                money: 8,
                unlockQuests: ["city_motel_generator"],
                setFlags: { powerOrganizer: true },
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -1,
                resources: { focusEnergy: -1, nerveEnergy: -1, physicalEnergy: -1 },
                time: 1,
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_motel_generator",
    title: "Patch the Generator",
    description: "The motel's backup generator coughs. Fix it or find another power source.",
    type: "city",
    locationId: "motel",
    difficulty: "medium",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_motel_outlets"],
      minResources: { focusEnergy: 2, nerveEnergy: 2, physicalEnergy: 2 },
    },
    steps: [
      {
        id: "generator",
        text: "The generator rattles beside a chain-link fence. Raccoons watch.",
        choices: [
          {
            id: "tape_patch",
            label: "Patch it with duct tape",
            cost: { physicalEnergy: 2, nerveEnergy: 1, time: 1, items: [{ id: "duct_tape", qty: 1 }] },
            success: {
              outcomes: { streetCred: 2, setFlags: { powerAlly: true, powerHog: false }, unlockQuests: ["city_motel_midnight"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -1,
                resources: { focusEnergy: -2, nerveEnergy: -2, physicalEnergy: -2 },
                money: -5,
                time: 1,
                setFlags: { powerHog: true, powerAlly: false },
              },
              failQuest: true,
            },
          },
          {
            id: "truck_borrow",
            label: "Borrow a truck-stop battery",
            cost: { money: 6, focusEnergy: 2, time: 2 },
            success: {
              outcomes: { streetCred: 1, money: 4, setFlags: { powerAlly: true }, unlockQuests: ["city_motel_midnight"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -1,
                resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -1 },
                setFlags: { powerHog: true },
                time: 2,
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_motel_midnight",
    title: "Midnight Power Play",
    description: "Steal bandwidth or cut a deal before the night clerk tightens security.",
    type: "city",
    locationId: "motel",
    difficulty: "medium",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_motel_generator"],
      minResources: { focusEnergy: 3, nerveEnergy: 3, physicalEnergy: 2 },
    },
    steps: [
      {
        id: "midnight",
        text: "A fiber spool sits behind the desk. The clerk scrolls their phone.",
        choices: [
          {
            id: "steal_spool",
            label: "Lift the fiber spool and run",
            cost: { physicalEnergy: 3, nerveEnergy: 2, time: 2 },
            failChance: 0.35,
            success: {
              outcomes: {
                money: 20,
                streetCred: 2,
                setFlags: { powerHog: false },
                unlockQuests: ["city_motel_rooftop"],
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -2, nerveEnergy: -3, physicalEnergy: -2 },
                setFlags: { powerHog: true, cartVendorAnnoyed: true },
                time: 2,
              },
              failQuest: true,
            },
          },
          {
            id: "cut_deal",
            label: "Cut a deal with the manager",
            cost: { money: 12, focusEnergy: 2, nerveEnergy: 2, time: 1 },
            success: {
              outcomes: {
                streetCred: 3,
                unlockQuests: ["city_motel_rooftop"],
                setFlags: { motelManagerFriend: true, powerAlly: true },
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -1 },
                money: -6,
                setFlags: { powerHog: true, powerAlly: false },
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_motel_rooftop",
    title: "Rooftop Relay",
    description: "Climb to the roof, lock in power, and decide who gets access.",
    type: "city",
    locationId: "motel",
    difficulty: "hard",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_motel_midnight"],
      minResources: { focusEnergy: 3, nerveEnergy: 3, physicalEnergy: 3 },
    },
    steps: [
      {
        id: "relay",
        text: "Wind whips across the rooftop. You can share bandwidth or hoard it.",
        choices: [
          {
            id: "install_repeater",
            label: "Install a shared repeater (uses battery pack)",
            cost: { focusEnergy: 3, nerveEnergy: 2, physicalEnergy: 2, time: 2, items: [{ id: "battery_pack", qty: 1 }] },
            success: {
              outcomes: {
                streetCred: 4,
                money: 30,
                setFlags: { powerAlly: true, coffeeLoyalty: true },
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -3, nerveEnergy: -3, physicalEnergy: -3 },
                setFlags: { powerHog: true, powerAlly: false },
                time: 2,
              },
              failQuest: true,
            },
          },
          {
            id: "sell_slots",
            label: "Sell power slots to desperate tenants",
            cost: { focusEnergy: 2, nerveEnergy: 3, time: 2 },
            success: {
              outcomes: { money: 45, streetCred: 1, setFlags: { powerHog: true, cartVendorBuddy: false } },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -3,
                resources: { focusEnergy: -2, nerveEnergy: -3, physicalEnergy: -2 },
                setFlags: { cartVendorAnnoyed: true },
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_alley_cleanup",
    title: "Alley Reset",
    description: "Decide if you clean the walls or exploit the drama for clout.",
    type: "city",
    locationId: "alley",
    difficulty: "low",
    repeatable: true,
    prerequisites: { minResources: { nerveEnergy: 2, physicalEnergy: 2 } },
    steps: [
      {
        id: "cleanup",
        text: "A toxic tag ruins the alley vibe. Kids watch what you do.",
        choices: [
          {
            id: "paint_over",
            label: "Paint over the slur",
            cost: { nerveEnergy: 1, physicalEnergy: 2, time: 1, money: 4 },
            success: {
              outcomes: { streetCred: 2, setFlags: { sidedWithAlleyCrew: true }, unlockQuests: ["city_alley_runner"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -1,
                resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -1 },
                time: 1,
              },
              failQuest: true,
            },
          },
          {
            id: "film_it",
            label: "Film and post for clout",
            cost: { focusEnergy: 2, nerveEnergy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, money: 10, setFlags: { cartVendorAnnoyed: true }, unlockQuests: ["city_alley_runner"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { nerveEnergy: -2, physicalEnergy: -1 },
                setFlags: { cartVendorAnnoyed: true },
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_alley_runner",
    title: "Runner's Favor",
    description: "Deliver a package through Venice Alley while dodging trouble.",
    type: "city",
    locationId: "alley",
    difficulty: "medium",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_alley_cleanup"],
      minResources: { physicalEnergy: 3, nerveEnergy: 2 },
    },
    steps: [
      {
        id: "runner",
        text: "A fixer needs a package across the alley. The clock starts now.",
        choices: [
          {
            id: "sprint_it",
            label: "Sprint it yourself",
            cost: { physicalEnergy: 3, nerveEnergy: 2, time: 1 },
            success: {
              outcomes: {
                streetCred: 2,
                money: 14,
                setFlags: { sidedWithAlleyCrew: true },
                unlockQuests: ["city_alley_smuggler"],
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -2 },
                time: 1,
              },
              failQuest: true,
            },
          },
          {
            id: "hire_kid",
            label: "Hire a scooter kid",
            cost: { money: 10, focusEnergy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, setFlags: { cartVendorBuddy: true }, unlockQuests: ["city_alley_smuggler"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -1,
                money: -10,
                resources: { nerveEnergy: -1, physicalEnergy: -1 },
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_alley_smuggler",
    title: "Shadow the Samurai",
    description: "Follow the alley samurai or bribe your way past the gate.",
    type: "city",
    locationId: "alley",
    difficulty: "medium",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_alley_runner"],
      minResources: { focusEnergy: 3, nerveEnergy: 3, physicalEnergy: 2 },
    },
    steps: [
      {
        id: "smuggler",
        text: "Night rain, neon puddles. Security guards swap shifts.",
        choices: [
          {
            id: "shadow",
            label: "Shadow the samurai to learn the route",
            cost: { nerveEnergy: 3, physicalEnergy: 2, time: 2 },
            failChance: 0.4,
            success: {
              outcomes: {
                streetCred: 3,
                money: 18,
                setFlags: { sidedWithAlleyCrew: true },
                unlockQuests: ["city_alley_signal"],
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -2, nerveEnergy: -3, physicalEnergy: -2 },
                setFlags: { cartVendorAnnoyed: true },
              },
              failQuest: true,
            },
          },
          {
            id: "bribe_guard",
            label: "Bribe the security guard",
            cost: { money: 15, focusEnergy: 2, nerveEnergy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, setFlags: { cartVendorBuddy: true }, unlockQuests: ["city_alley_signal"] },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -1 },
                money: -15,
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_alley_signal",
    title: "Alley Signal Hub",
    description: "Decide who controls the alley signal and who pays.",
    type: "city",
    locationId: "alley",
    difficulty: "hard",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_alley_smuggler"],
      minResources: { focusEnergy: 3, nerveEnergy: 3, physicalEnergy: 3 },
    },
    steps: [
      {
        id: "signal",
        text: "A rooftop relay hums above skaters and street vendors.",
        choices: [
          {
            id: "share_signal",
            label: "Wire it for the alley crew",
            cost: { focusEnergy: 3, physicalEnergy: 3, time: 2 },
            success: {
              outcomes: {
                streetCred: 3,
                money: 25,
                setFlags: { powerAlly: true, sidedWithAlleyCrew: true },
                unlockQuests: ["city_coffee_afterhours"],
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -3, nerveEnergy: -3, physicalEnergy: -3 },
              },
              failQuest: true,
            },
          },
          {
            id: "sell_signal",
            label: "Sell the relay plans to a reseller",
            cost: { nerveEnergy: 3, focusEnergy: 2, time: 1 },
            success: {
              outcomes: { money: 40, streetCred: -1, setFlags: { cartVendorAnnoyed: true } },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -3,
                resources: { focusEnergy: -2, nerveEnergy: -3, physicalEnergy: -2 },
              },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_coffee_loyalty",
    title: "Earn the Drip Loyalty",
    description: "Buy goodwill or fix tech to secure coffee shop privileges.",
    type: "city",
    locationId: "coffee_shop",
    difficulty: "low",
    repeatable: true,
    prerequisites: { minResources: { focusEnergy: 2, nerveEnergy: 1 } },
    steps: [
      {
        id: "loyalty",
        text: "Barista Jade wants loyalty before giving you outlets.",
        choices: [
          {
            id: "buy_card",
            label: "Buy a loyalty card",
            cost: { money: 8, focusEnergy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, setFlags: { coffeeLoyalty: true }, unlockQuests: ["city_coffee_regulars"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, resources: { focusEnergy: -1, nerveEnergy: -1 } },
              failQuest: true,
            },
          },
          {
            id: "fix_for_tabs",
            label: "Fix the POS tablet for free coffee",
            cost: { focusEnergy: 2, nerveEnergy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 2, money: 5, setFlags: { coffeeLoyalty: true }, unlockQuests: ["city_coffee_regulars"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, resources: { focusEnergy: -1, nerveEnergy: -1, physicalEnergy: -1 } },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_coffee_regulars",
    title: "Handle the Regulars",
    description: "Keep the coffee shop regulars happy to secure socket priority.",
    type: "city",
    locationId: "coffee_shop",
    difficulty: "medium",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_coffee_loyalty"],
      minResources: { focusEnergy: 3, nerveEnergy: 2 },
    },
    steps: [
      {
        id: "regulars",
        text: "Printers jam, tablets freeze, and streamers beg for bandwidth.",
        choices: [
          {
            id: "triage",
            label: "Triage everything in one sprint",
            cost: { focusEnergy: 3, nerveEnergy: 2, time: 2 },
            success: {
              outcomes: {
                streetCred: 2,
                money: 15,
                setFlags: { shopWifiPriority: true },
                unlockQuests: ["city_coffee_afterhours"],
              },
              completeQuest: true,
            },
            failure: {
              outcomes: {
                streetCred: -2,
                resources: { focusEnergy: -2, nerveEnergy: -2, physicalEnergy: -1 },
              },
              failQuest: true,
            },
          },
          {
            id: "upsell",
            label: "Sell upsells and tip jars",
            cost: { focusEnergy: 2, nerveEnergy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 1, money: 10, setFlags: { cartVendorBuddy: true }, unlockQuests: ["city_coffee_afterhours"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -1 } },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_coffee_afterhours",
    title: "After-Hours Access",
    description: "Negotiate after-hours access for real focus time.",
    type: "city",
    locationId: "coffee_shop",
    difficulty: "medium",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_coffee_regulars"],
      minResources: { focusEnergy: 2, nerveEnergy: 3, physicalEnergy: 2 },
    },
    steps: [
      {
        id: "afterhours",
        text: "Jade will let you stay late if you help close—or host a mic night.",
        choices: [
          {
            id: "close_with_jade",
            label: "Close the shop with Jade",
            cost: { physicalEnergy: 2, nerveEnergy: 2, time: 2 },
            success: {
              outcomes: { streetCred: 2, setFlags: { coffeeLoyalty: true }, unlockQuests: ["city_coffee_coldbrew"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, resources: { focusEnergy: -1, nerveEnergy: -2, physicalEnergy: -1 } },
              failQuest: true,
            },
          },
          {
            id: "host_open_mic",
            label: "Host an after-hours open mic",
            cost: { focusEnergy: 2, nerveEnergy: 3, time: 2 },
            success: {
              outcomes: { streetCred: 3, money: 18, setFlags: { sidedWithAlleyCrew: true }, unlockQuests: ["city_coffee_coldbrew"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -2, resources: { focusEnergy: -2, nerveEnergy: -3, physicalEnergy: -1 } },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "city_coffee_coldbrew",
    title: "Cold Brew Deal",
    description: "Decide whether to share the recipe or cash out to a rival cart.",
    type: "city",
    locationId: "coffee_shop",
    difficulty: "hard",
    repeatable: true,
    prerequisites: {
      completedQuests: ["city_coffee_afterhours"],
      minResources: { focusEnergy: 4, nerveEnergy: 3, physicalEnergy: 2 },
    },
    steps: [
      {
        id: "coldbrew",
        text: "The new cold brew recipe could fund your grind or burn relationships.",
        choices: [
          {
            id: "share_with_alley",
            label: "Share with the alley crew and deliver a batch",
            cost: { focusEnergy: 3, physicalEnergy: 2, time: 2 },
            success: {
              outcomes: { money: 28, streetCred: 3, setFlags: { cartVendorBuddy: true } },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -2, resources: { focusEnergy: -2, nerveEnergy: -2, physicalEnergy: -2 } },
              failQuest: true,
            },
          },
          {
            id: "sell_recipe",
            label: "Sell the recipe to a rival cart",
            cost: { focusEnergy: 2, nerveEnergy: 3, time: 1 },
            success: {
              outcomes: { money: 40, streetCred: -1, setFlags: { cartVendorAnnoyed: true } },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -3, resources: { focusEnergy: -2, nerveEnergy: -3, physicalEnergy: -1 } },
              failQuest: true,
            },
          },
        ],
      },
    ],
  },
  // ---- Act 1: Phone Era mainline ----
  {
    id: "main_a1_boot",
    title: "Act 1 · Boot with a Cracked Screen",
    description: "Kick off the neon hustle from a roadside motel. Patch the busted phone and prove you can type through static.",
    type: "main",
    act: 1,
    stage: 1,
    locationId: "motel",
    prerequisites: { completedQuests: [], minEnergy: 1 },
    steps: [
      {
        id: "patch_phone",
        text: "LA hums outside your motel window. Your cracked screen flickers. You need a signal and a plan.",
        choices: [
          {
            id: "tape_screen",
            label: "Tape the cracks and reboot",
            cost: { energy: 2, time: 1 },
            risk: "Might lose more battery",
            success: {
              outcomes: { streetCred: 1, money: 5, energy: -2, time: 1, setFlags: { phonePatched: true }, unlockQuests: ["main_a1_signal"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 1, energy: -2, setFlags: { phonePatched: false } },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a1_signal",
    title: "Find a Clean Signal",
    description: "Hunt for a stable signal in Venice Alley without getting your phone swiped.",
    type: "main",
    act: 1,
    stage: 2,
    locationId: "alley",
    prerequisites: { completedQuests: ["main_a1_boot"], minEnergy: 2 },
    steps: [
      {
        id: "scan_alley",
        text: "The alley glows like a busted neon sign. Raccoons circle the only working outlet.",
        choices: [
          {
            id: "bribe_raccoon",
            label: "Bribe raccoon with pizza crust",
            cost: { energy: 2, time: 1, money: 2 },
            risk: "Could waste your last crust",
            success: {
              outcomes: { streetCred: 1, energy: -2, time: 1, unlockQuests: ["main_a1_zoom"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, energy: -2, time: 1 },
              completeStep: true,
            },
          },
          {
            id: "speed_type",
            label: "Speed-type a hotspot hack (Skill: Coding 2+)",
            cost: { energy: 3, time: 1 },
            skillCheck: { stat: "coding", threshold: 2 },
            success: {
              outcomes: { streetCred: 2, energy: -3, time: 1, setFlags: { cleanSignal: true }, unlockQuests: ["main_a1_zoom"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, energy: -3, time: 1, setFlags: { cleanSignal: false } },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a1_zoom",
    title: "Rescue the Zoom Lady",
    description: "Help the coffee shop Zoom legend before her class implodes. Earn goodwill and caffeine.",
    type: "main",
    act: 1,
    stage: 3,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["main_a1_signal"], requiredItems: ["battery_pack"] },
    steps: [
      {
        id: "zoom_setup",
        text: "Zoom Lady waves you over. Her laptop updates, her class is waiting, and the WiFi wheezes.",
        choices: [
          {
            id: "quick_fix",
            label: "Patch Zoom and mirror from your phone",
            cost: { energy: 2, time: 1 },
            risk: "Phone might overheat",
            lessonId: "city_zoom_intro",
            success: {
              outcomes: { money: 20, streetCred: 2, energy: -2, time: 1, unlockQuests: ["main_a1_thrift"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, energy: -2, time: 2 },
              completeStep: true,
            },
          },
          {
            id: "slow_fix",
            label: "Update drivers slowly (costs time, safer)",
            cost: { energy: 1, time: 3 },
            success: {
              outcomes: { money: 10, streetCred: 1, energy: -1, time: 3, unlockQuests: ["main_a1_thrift"] },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a1_thrift",
    title: "Borrowed Keys",
    description: "The electronics thrift owner will lend you a keyboard if you inventory his dusty back room.",
    type: "main",
    act: 1,
    stage: 4,
    locationId: "electronics",
    prerequisites: { completedQuests: ["main_a1_zoom"], minEnergy: 3 },
    steps: [
      {
        id: "inventory_room",
        text: "Stacks of beige towers and unloved monitors. The owner hands you a smudged clipboard.",
        choices: [
          {
            id: "type_inventory",
            label: "Type the SKU pile accurately",
            cost: { energy: 3, time: 2 },
            lessonId: "city_inventory",
            success: {
              outcomes: { money: 25, streetCred: 2, addItems: [{ id: "borrowed_keyboard", qty: 1 }], unlockQuests: ["main_a1_escape"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 2 },
              completeStep: true,
            },
          },
          {
            id: "rush_inventory",
            label: "Rush it (risk errors, faster)",
            cost: { energy: 2, time: 1 },
            risk: "Errors lose reputation",
            success: {
              outcomes: { money: 15, streetCred: 1, time: 1, addItems: [{ id: "borrowed_keyboard", qty: 1 }] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, money: -5, time: 1 },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a1_escape",
    title: "Leave the Motel Loop",
    description: "Pack, patch, and move your grind from motel to coffee shop. Act 1 finale.",
    type: "main",
    act: 1,
    stage: 5,
    locationId: "motel",
    prerequisites: { completedQuests: ["main_a1_thrift"], minEnergy: 3 },
    steps: [
      {
        id: "pack_out",
        text: "Motel manager knocks. You either pay for another night or hustle out to the coffee shop circuit.",
        choices: [
          {
            id: "pay_and_plan",
            label: "Pay last night, plan routes",
            cost: { money: 10, energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 1, time: 1, energy: -2, unlockQuests: ["main_a2_move_base"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, money: -10, time: 2 },
              completeQuest: true,
            },
          },
          {
            id: "dash_out",
            label: "Dash out, risk leaving gear",
            cost: { energy: 3, time: 1 },
            risk: "Could drop your keyboard",
            success: {
              outcomes: { streetCred: 1, time: 1, energy: -3, unlockQuests: ["main_a2_move_base"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 1, removeItems: [{ id: "borrowed_keyboard", qty: 1 }] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },

  // ---- Act 2: Laptop Era mainline ----
  {
    id: "main_a2_move_base",
    title: "Claim a Base",
    description: "Establish a semi-permanent base at the coffee shop. Negotiate with baristas and regulars.",
    type: "main",
    act: 2,
    stage: 1,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["main_a1_escape"], minEnergy: 2 },
    steps: [
      {
        id: "barista_negotiation",
        text: "Barista Jade eyes your single drip order. She wants loyalty or upgrades.",
        choices: [
          {
            id: "buy_loyalty",
            label: "Buy a punch card",
            cost: { money: 8, energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 2, time: 1, setFlags: { coffeeBase: true }, unlockQuests: ["main_a2_first_client"] },
              completeStep: true,
            },
          },
          {
            id: "pitch_value",
            label: "Pitch value (Charm/Streetsmarts 3+)",
            cost: { energy: 2, time: 1 },
            skillCheck: { stat: "streetsmarts", threshold: 3 },
            success: {
              outcomes: { streetCred: 3, energy: -2, time: 1, setFlags: { coffeeBase: true }, unlockQuests: ["main_a2_first_client"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 1, lockQuests: ["coffee_shop_ban"] },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a2_first_client",
    title: "First Laptop Client",
    description: "A client wants a rush landing page. They only pay if it loads.",
    type: "main",
    act: 2,
    stage: 2,
    locationId: "client_house",
    prerequisites: { completedQuests: ["main_a2_move_base"], requiredItems: ["used_laptop"] },
    steps: [
      {
        id: "draft_page",
        text: "Client House hums with AC. The client wants a landing page before dinner.",
        choices: [
          {
            id: "code_clean",
            label: "Code clean and test",
            cost: { energy: 3, time: 2 },
            lessonId: "s2_ch2_lesson1",
            success: {
              outcomes: { money: 45, streetCred: 3, xp: 30, unlockQuests: ["main_a2_data_heist"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, money: -10, time: 2 },
              completeStep: true,
            },
          },
          {
            id: "copy_paste",
            label: "Copy-paste a template (risk reputation)",
            cost: { energy: 1, time: 1 },
            success: {
              outcomes: { money: 20, streetCred: -1, time: 1, unlockQuests: ["main_a2_data_heist"] },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a2_data_heist",
    title: "Borrow WiFi, Steal Data Caps",
    description: "You need more bandwidth. A neighbor's router tempts you.",
    type: "main",
    act: 2,
    stage: 3,
    locationId: "motel",
    prerequisites: { completedQuests: ["main_a2_first_client"], minEnergy: 3 },
    steps: [
      {
        id: "router_job",
        text: "Old motel router blinks. A bored security guard scrolls TikTok.",
        choices: [
          {
            id: "social_engineer",
            label: "Social engineer guard (Charm/Streetsmarts 4+)",
            cost: { energy: 2, time: 1 },
            skillCheck: { stat: "streetsmarts", threshold: 4 },
            success: {
              outcomes: { streetCred: 3, time: 1, unlockQuests: ["main_a2_pitch"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -3, time: 2, energy: -1, setFlags: { motelWatch: true } },
              nextStep: "router_job",
            },
          },
          {
            id: "bruteforce",
            label: "Bruteforce password overnight",
            cost: { energy: 3, time: 3 },
            risk: "Phone battery drains",
            success: {
              outcomes: { streetCred: 1, energy: -3, time: 3, setFlags: { motelRouterOwned: true }, unlockQuests: ["main_a2_pitch"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 3, energy: -3 },
              nextStep: "router_job",
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a2_pitch",
    title: "Pitch the Big Contract",
    description: "You hear about a VR arcade contract. You need to pitch with confidence and uptime.",
    type: "main",
    act: 2,
    stage: 4,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["main_a2_data_heist"], minEnergy: 3 },
    steps: [
      {
        id: "pitch_meeting",
        text: "VR arcade owner sips espresso. He wants reliability, not just code.",
        choices: [
          {
            id: "show_demo",
            label: "Show live demo (requires cleanSignal flag)",
            cost: { energy: 2, time: 1 },
            requiresFlag: "cleanSignal",
            success: {
              outcomes: { streetCred: 3, money: 30, unlockQuests: ["main_a2_contract"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 1 },
              completeStep: true,
            },
          },
          {
            id: "talk_vision",
            label: "Sell vision (Charm/Streetsmarts 4+)",
            cost: { energy: 2, time: 1 },
            skillCheck: { stat: "streetsmarts", threshold: 4 },
            success: {
              outcomes: { streetCred: 2, money: 15, unlockQuests: ["main_a2_contract"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 1 },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a2_contract",
    title: "Ship or Sleep",
    description: "You must ship the contract build while the arcade watches. No room for zero battery.",
    type: "main",
    act: 2,
    stage: 5,
    locationId: "client_house",
    prerequisites: { completedQuests: ["main_a2_pitch"], minEnergy: 4 },
    steps: [
      {
        id: "ship_build",
        text: "Arcade owner refreshing the staging link. Your laptop fan screams.",
        choices: [
          {
            id: "all_nighter",
            label: "All-nighter push",
            cost: { energy: 4, time: 3 },
            risk: "Energy could hit zero",
            success: {
              outcomes: { money: 80, streetCred: 4, xp: 60, energy: -4, time: 3, unlockQuests: ["main_a3_eviction"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -3, time: 3, energy: -4 },
              nextStep: "ship_build",
            },
          },
          {
            id: "scope_cut",
            label: "Cut scope, promise patch",
            cost: { energy: 2, time: 2 },
            success: {
              outcomes: { money: 50, streetCred: 1, xp: 30, energy: -2, time: 2, unlockQuests: ["main_a3_eviction"] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },

  // ---- Act 3: Neon Reckoning mainline ----
  {
    id: "main_a3_eviction",
    title: "Eviction Notice",
    description: "Landlord leaves a neon pink notice. You need cash and allies before dawn.",
    type: "main",
    act: 3,
    stage: 1,
    locationId: "motel",
    prerequisites: { completedQuests: ["main_a2_contract"], minEnergy: 2 },
    steps: [
      {
        id: "decide_eviction",
        text: "Eviction in 72 hours. Choices ripple across the city.",
        choices: [
          {
            id: "call_friend",
            label: "Call Alley Fixer for favors",
            cost: { energy: 1, time: 1, streetCred: 1 },
            success: {
              outcomes: { streetCred: 2, unlockQuests: ["main_a3_burner", "alley_fixer_run"], setFlags: { hasFixer: true }, completeStep: true },
            },
          },
          {
            id: "crowdfund",
            label: "Crowdfund with your story",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { money: 40, streetCred: 1, unlockQuests: ["main_a3_burner"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 1 },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a3_burner",
    title: "Burner Phone Backup",
    description: "Your cracked phone might die mid-finale. Secure a burner and SIM.",
    type: "main",
    act: 3,
    stage: 2,
    locationId: "electronics",
    prerequisites: { completedQuests: ["main_a3_eviction"], minEnergy: 2 },
    steps: [
      {
        id: "buy_burner",
        text: "Electronics thrift clerk slides a shoebox of burner phones toward you.",
        choices: [
          {
            id: "pay_full",
            label: "Pay full price",
            cost: { money: 40, energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 2, addItems: [{ id: "burner_phone", qty: 1 }], unlockQuests: ["main_a3_ride"] },
              completeStep: true,
            },
          },
          {
            id: "haggle",
            label: "Haggle with charm (Streetsmarts 5+)",
            cost: { energy: 1, time: 1 },
            skillCheck: { stat: "streetsmarts", threshold: 5 },
            success: {
              outcomes: { streetCred: 3, money: -20, addItems: [{ id: "burner_phone", qty: 1 }], unlockQuests: ["main_a3_ride"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, lockQuests: ["electronics_price_hike"] },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a3_ride",
    title: "Ride or Run",
    description: "You need transport to reach the VR arcade hardware room.",
    type: "main",
    act: 3,
    stage: 3,
    locationId: "planet_fitness",
    prerequisites: { completedQuests: ["main_a3_burner"], minEnergy: 3 },
    steps: [
      {
        id: "secure_ride",
        text: "Planet Fitness locker room whispers about an abandoned scooter.",
        choices: [
          {
            id: "repair_scooter",
            label: "Repair scooter with duct tape",
            cost: { energy: 3, time: 2, items: [{ id: "duct_tape", qty: 1 }] },
            success: {
              outcomes: { streetCred: 2, setFlags: { mobileRide: true }, unlockQuests: ["main_a3_vr_arcade"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 2 },
              completeStep: true,
            },
          },
          {
            id: "run_it",
            label: "Run on foot (costs physical energy)",
            cost: { energy: 2, time: 2, physical: 2 },
            success: {
              outcomes: { streetCred: 1, unlockQuests: ["main_a3_vr_arcade"] },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a3_vr_arcade",
    title: "Arcade Lockdown",
    description: "VR arcade server room is locked. A guard blocks the door.",
    type: "main",
    act: 3,
    stage: 4,
    locationId: "client_house",
    prerequisites: { completedQuests: ["main_a3_ride"], minEnergy: 2 },
    steps: [
      {
        id: "enter_server",
        text: "Guard yawns. He'll allow entry for a favor or proof of contract.",
        choices: [
          {
            id: "show_contract",
            label: "Show signed PDF",
            cost: { energy: 1, time: 1 },
            requiresFlag: "coffeeBase",
            success: {
              outcomes: { streetCred: 2, unlockQuests: ["main_a3_final"] },
              completeStep: true,
            },
          },
          {
            id: "bribe_guard",
            label: "Bribe with cash",
            cost: { money: 20, energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, unlockQuests: ["main_a3_final"] },
              completeStep: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 1 },
              completeStep: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "main_a3_final",
    title: "Ship Under Neon",
    description: "Final build under failing lights. If energy hits zero, online deploys break.",
    type: "main",
    act: 3,
    stage: 5,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["main_a3_vr_arcade"], minEnergy: 4 },
    steps: [
      {
        id: "deploy",
        text: "Deploy pipeline hums. Phone tether flickers. Choose your final move.",
        choices: [
          {
            id: "steady_push",
            label: "Steady push, test twice",
            cost: { energy: 4, time: 2 },
            success: {
              outcomes: { money: 120, streetCred: 6, xp: 100, energy: -4, time: 2, setFlags: { finaleComplete: true }, completeQuest: true },
            },
            failure: {
              outcomes: { streetCred: -4, energy: -4, time: 2 },
              nextStep: "deploy",
            },
          },
          {
            id: "reckless_ship",
            label: "Reckless ship, hope for uptime (50/50)",
            cost: { energy: 2, time: 1 },
            failChance: 0.5,
            success: {
              outcomes: { money: 80, streetCred: 3, xp: 60, energy: -2, time: 1, setFlags: { finaleComplete: true }, completeQuest: true },
            },
            failure: {
              outcomes: { streetCred: -5, money: -20, energy: -2, time: 2 },
              nextStep: "deploy",
            },
          },
        ],
      },
    ],
  },

  // ---- Side quests (20) ----
  {
    id: "motel_night_watch",
    title: "Motel Night Watch",
    description: "Guard the hallway for an hour; maybe find loose change.",
    type: "side",
    act: 1,
    locationId: "motel",
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "watch",
        text: "Dim hallway. A couple argues, a raccoon watches.",
        choices: [
          {
            id: "stay_alert",
            label: "Stay alert (energy drain)",
            cost: { energy: 1, time: 1 },
            success: {
              outcomes: { money: 8, streetCred: 1, energy: -1, time: 1 },
              completeQuest: true,
            },
          },
          {
            id: "doze_off",
            label: "Doze off",
            cost: { time: 2 },
            success: {
              outcomes: { energy: 2, streetCred: -1, time: 2 },
              completeQuest: true,
            },
            offline: true,
          },
        ],
      },
    ],
  },
  {
    id: "motel_outlet_negotiation",
    title: "Outlet Negotiation",
    description: "Only one outlet works tonight. Convince neighbors to share.",
    type: "side",
    act: 1,
    locationId: "motel",
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "talk",
        text: "Two travelers guard the outlet with portable fans.",
        choices: [
          {
            id: "share_story",
            label: "Share your story (Charm/Streetsmarts 3+)",
            cost: { energy: 1, time: 1 },
            skillCheck: { stat: "streetsmarts", threshold: 3 },
            success: {
              outcomes: { streetCred: 2, setFlags: { outletAlly: true }, energy: -1, time: 1 },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 1 },
              completeQuest: true,
            },
          },
          {
            id: "pay_cash",
            label: "Pay $5 to rent the outlet",
            cost: { money: 5, time: 1 },
            success: {
              outcomes: { streetCred: 1, energy: 3, time: 1 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "alley_tag_cleanup",
    title: "Erase Bad Tag",
    description: "Scrub a toxic tag to earn favor from alley kids.",
    type: "side",
    act: 1,
    locationId: "alley",
    prerequisites: { completedQuests: ["main_a1_signal"] },
    steps: [
      {
        id: "scrub",
        text: "A wall screams profanity at dawn.",
        choices: [
          {
            id: "clean",
            label: "Clean with elbow grease",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, time: 1, unlockQuests: ["alley_sponsor"] },
              completeQuest: true,
            },
          },
          {
            id: "paint_over",
            label: "Paint over with neon art",
            cost: { energy: 1, time: 2, money: 4 },
            success: {
              outcomes: { streetCred: 3, time: 2 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "alley_sponsor",
    title: "Skate Kid Sponsor",
    description: "A skate kid offers to hand out your QR code.",
    type: "side",
    act: 1,
    locationId: "alley",
    prerequisites: { completedQuests: ["alley_tag_cleanup"] },
    steps: [
      {
        id: "qr_pitch",
        text: "He'll do it for a slice or a lesson.",
        choices: [
          {
            id: "give_slice",
            label: "Buy him pizza",
            cost: { money: 6, energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 2, time: 1, unlockQuests: ["venice_speedrun"] },
              completeQuest: true,
            },
          },
          {
            id: "teach_typing",
            label: "Teach him typing drills",
            cost: { energy: 2, time: 2 },
            success: {
              outcomes: { streetCred: 3, xp: 10, unlockQuests: ["venice_speedrun"] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "venice_speedrun",
    title: "Venice Speedrun",
    description: "Test your typing on a curbside challenge with alley spectators.",
    type: "side",
    act: 1,
    locationId: "alley",
    prerequisites: { completedQuests: ["alley_sponsor"], minEnergy: 2 },
    steps: [
      {
        id: "type_show",
        text: "They set a timer and chant. Don't choke.",
        choices: [
          {
            id: "steady",
            label: "Steady sprint",
            cost: { energy: 2, time: 1 },
            lessonId: "ch6_lesson1",
            success: {
              outcomes: { streetCred: 3, money: 12, xp: 12 },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 1 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "coffee_shop_regulars",
    title: "Regulars' Favors",
    description: "Do small fixes for coffee shop regulars to earn sips and sockets.",
    type: "side",
    act: 1,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["main_a1_zoom"] },
    steps: [
      {
        id: "fix",
        text: "Broken printer, frozen tablet, and a streaming setup.",
        choices: [
          {
            id: "triage",
            label: "Triage the issues (Coding 3+ or time)",
            cost: { energy: 2, time: 2 },
            skillCheck: { stat: "coding", threshold: 3 },
            success: {
              outcomes: { streetCred: 3, money: 15, energy: -2, time: 2 },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 2 },
              completeQuest: true,
            },
          },
          {
            id: "slow_fixers",
            label: "Fix one per day",
            cost: { energy: 1, time: 3 },
            success: {
              outcomes: { streetCred: 2, money: 10, time: 3 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "coffee_shop_branding",
    title: "Brand the Drip",
    description: "Design QR code coasters for the coffee shop. Impress Jade or waste cardstock.",
    type: "side",
    act: 2,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["coffee_shop_regulars"] },
    steps: [
      {
        id: "design",
        text: "Jade hands you soggy coasters and a brand guide on a napkin.",
        choices: [
          {
            id: "clean_design",
            label: "Clean design (Coding 3+)",
            cost: { energy: 2, time: 1 },
            skillCheck: { stat: "coding", threshold: 3 },
            success: {
              outcomes: { streetCred: 3, money: 18, unlockQuests: ["coffee_shop_late_shift"] },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 1 },
              completeQuest: true,
            },
          },
          {
            id: "hand_draw",
            label: "Hand-draw and scan",
            cost: { energy: 1, time: 2, money: 3 },
            success: {
              outcomes: { streetCred: 1, money: 10, time: 2 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "coffee_shop_ban",
    title: "Temporary Ban",
    description: "You pushed the barista too far. Work off the ban.",
    type: "side",
    act: 2,
    locationId: "coffee_shop",
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "appeal",
        text: "Jade says you need to clean tables and buy pastries.",
        choices: [
          {
            id: "clean_tables",
            label: "Clean tables",
            cost: { energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, time: 1, unlockQuests: ["main_a2_move_base"] },
              completeQuest: true,
            },
          },
          {
            id: "buy_pastries",
            label: "Buy pastries for the crew",
            cost: { money: 10, time: 1 },
            success: {
              outcomes: { streetCred: 2, unlockQuests: ["main_a2_move_base"] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "planet_fitness_nap",
    title: "Locker Room Nap",
    description: "Sneak a nap to regain energy.",
    type: "side",
    act: 1,
    locationId: "planet_fitness",
    prerequisites: { minEnergy: 0 },
    steps: [
      {
        id: "nap",
        text: "Purple glow, white noise. Risk being noticed.",
        choices: [
          {
            id: "short_nap",
            label: "Short nap (advance time)",
            cost: { time: 2 },
            success: {
              outcomes: { energy: 5, time: 2, streetCred: -1 },
              completeQuest: true,
            },
            offline: true,
          },
          {
            id: "long_nap",
            label: "Long nap (higher risk)",
            cost: { time: 4 },
            failChance: 0.3,
            success: {
              outcomes: { energy: 8, time: 4 },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 4 },
              completeQuest: true,
            },
            offline: true,
          },
        ],
      },
    ],
  },
  {
    id: "planet_fitness_spotter",
    title: "Be a Spotter",
    description: "Spot someone at the gym to earn favor and maybe a protein bar.",
    type: "side",
    act: 1,
    locationId: "planet_fitness",
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "spot",
        text: "A lifter nods at you for a spot.",
        choices: [
          {
            id: "help",
            label: "Help with perfect form",
            cost: { energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 1, energy: -1, time: 1, addItems: [{ id: "protein_bar", qty: 1 }] },
              completeQuest: true,
            },
          },
          {
            id: "ignore",
            label: "Ignore and keep typing",
            cost: { time: 1 },
            success: {
              outcomes: { streetCred: -1, time: 1 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "planet_fitness_charge",
    title: "Charge in the Locker",
    description: "Find an outlet, charge safely, avoid staff.",
    type: "side",
    act: 2,
    locationId: "planet_fitness",
    prerequisites: { minEnergy: 0 },
    steps: [
      {
        id: "charge",
        text: "Outlet behind a vending machine. Staff patrols every 5 minutes.",
        choices: [
          {
            id: "quick_charge",
            label: "Quick charge 30 min",
            cost: { time: 1 },
            success: {
              outcomes: { energy: 4, time: 1 },
              completeQuest: true,
            },
            offline: true,
          },
          {
            id: "full_charge",
            label: "Full charge 90 min (risk)",
            cost: { time: 2 },
            failChance: 0.4,
            success: {
              outcomes: { energy: 8, time: 2 },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -2, time: 2 },
              completeQuest: true,
            },
            offline: true,
          },
        ],
      },
    ],
  },
  {
    id: "electronics_price_hike",
    title: "Electronics Price Hike",
    description: "Clerk raises prices after your failed haggling. Earn back trust or pay more.",
    type: "side",
    act: 3,
    locationId: "electronics",
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "repair",
        text: "He'll lower prices if you fix his POS terminal.",
        choices: [
          {
            id: "fix_pos",
            label: "Fix terminal",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, setFlags: { electronics_price_hike: false } },
              completeQuest: true,
            },
            failure: {
              outcomes: { streetCred: -1, time: 1 },
              completeQuest: true,
            },
          },
          {
            id: "pay_fee",
            label: "Pay the fee",
            cost: { money: 15, time: 1 },
            success: {
              outcomes: { streetCred: 0 },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "electronics_refurb_help",
    title: "Refurb Rush",
    description: "Help refurb a laptop batch for a discount.",
    type: "side",
    act: 2,
    locationId: "electronics",
    prerequisites: { completedQuests: ["main_a2_first_client"] },
    steps: [
      {
        id: "refurb",
        text: "Swap thermal paste, run diagnostics.",
        choices: [
          {
            id: "do_it",
            label: "Do it carefully",
            cost: { energy: 2, time: 2 },
            success: {
              outcomes: { streetCred: 2, money: 20, unlockQuests: ["discount_refurb"] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "discount_refurb",
    title: "Refurb Discount",
    description: "Use the favor to buy gear cheaper.",
    type: "side",
    act: 2,
    locationId: "electronics",
    prerequisites: { completedQuests: ["electronics_refurb_help"] },
    steps: [
      {
        id: "claim",
        text: "Clerk nods, offers discount.",
        choices: [
          {
            id: "buy_used",
            label: "Buy used laptop with discount",
            cost: { money: 100, energy: 1, time: 1 },
            success: {
              outcomes: { addItems: [{ id: "used_laptop", qty: 1 }], streetCred: 2 },
              completeQuest: true,
            },
          },
          {
            id: "skip",
            label: "Skip purchase",
            cost: { time: 1 },
            success: { outcomes: { streetCred: 0 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "client_house_neighbor",
    title: "Client Neighbor Help",
    description: "Neighbor wants tech help before complaining to your client.",
    type: "side",
    act: 2,
    locationId: "client_house",
    prerequisites: { completedQuests: ["main_a2_first_client"] },
    steps: [
      {
        id: "neighbor_help",
        text: "Their smart fridge screams.",
        choices: [
          {
            id: "fix_fridge",
            label: "Fix fridge",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, money: 15 },
              completeQuest: true,
            },
          },
          {
            id: "ignore_fridge",
            label: "Ignore (risk reputation)",
            cost: { time: 1 },
            success: {
              outcomes: { streetCred: -2, lockQuests: ["main_a2_contract"] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "client_house_allies",
    title: "Win Over the Assistant",
    description: "Client's assistant controls the calendar.",
    type: "side",
    act: 2,
    locationId: "client_house",
    prerequisites: { completedQuests: ["main_a2_first_client"] },
    steps: [
      {
        id: "assist",
        text: "Assistant glares at your hoodie.",
        choices: [
          {
            id: "gift_coffee",
            label: "Gift coffee",
            cost: { money: 6, time: 1 },
            success: { outcomes: { streetCred: 2, unlockQuests: ["client_house_calendar"] }, completeQuest: true },
          },
          {
            id: "offer_help",
            label: "Offer to fix her email filters",
            cost: { energy: 1, time: 1 },
            success: { outcomes: { streetCred: 1, unlockQuests: ["client_house_calendar"] }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "client_house_calendar",
    title: "Calendar Control",
    description: "She'll move deadlines if you help her automate calendar invites.",
    type: "side",
    act: 2,
    locationId: "client_house",
    prerequisites: { completedQuests: ["client_house_allies"] },
    steps: [
      {
        id: "calendar",
        text: "Sync scripts or manual edits?",
        choices: [
          {
            id: "script_it",
            label: "Script it",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, unlockQuests: ["main_a2_contract"] },
              completeQuest: true,
            },
          },
          {
            id: "manual",
            label: "Manual drudge",
            cost: { time: 2 },
            success: { outcomes: { streetCred: 0, unlockQuests: ["main_a2_contract"] }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "alley_fixer_run",
    title: "Fixer Errand",
    description: "Fixer wants a package delivered; grants future favors.",
    type: "side",
    act: 3,
    locationId: "alley",
    prerequisites: { completedQuests: ["main_a3_eviction"] },
    steps: [
      {
        id: "errand",
        text: "Deliver a package under neon umbrellas.",
        choices: [
          {
            id: "sneak",
            label: "Sneak through back alleys",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, money: 20, setFlags: { fixerFavor: true } },
              completeQuest: true,
            },
          },
          {
            id: "ride",
            label: "Ride scooter (requires mobileRide flag)",
            cost: { energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: 3, money: 25, setFlags: { fixerFavor: true } },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: "coffee_shop_late_shift",
    title: "Late Shift Cleanup",
    description: "Help close the coffee shop for energy credit.",
    type: "side",
    act: 3,
    locationId: "coffee_shop",
    prerequisites: { completedQuests: ["main_a2_pitch"] },
    steps: [
      {
        id: "cleanup",
        text: "Chairs, mops, playlists.",
        choices: [
          {
            id: "clean_fast",
            label: "Clean fast",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, energy: 3, time: 1 },
              completeQuest: true,
            },
          },
          {
            id: "clean_slow",
            label: "Clean slow, conserve energy",
            cost: { energy: 1, time: 2 },
            success: { outcomes: { streetCred: 1, energy: 2, time: 2 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "motel_fire_drill",
    title: "Fire Drill",
    description: "Motel runs a chaotic fire drill.",
    type: "side",
    act: 3,
    locationId: "motel",
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "drill",
        text: "Grab your gear or help others?",
        choices: [
          {
            id: "grab_gear",
            label: "Grab gear",
            cost: { energy: 1, time: 1 },
            success: {
              outcomes: { streetCred: -1, time: 1, setFlags: { gearSafe: true } },
              completeQuest: true,
            },
          },
          {
            id: "help_neighbors",
            label: "Help neighbors",
            cost: { energy: 2, time: 1 },
            success: {
              outcomes: { streetCred: 2, unlockQuests: ["motel_outlet_negotiation"] },
              completeQuest: true,
            },
          },
        ],
      },
    ],
  },

  // ---- Repeatable gigs (10) ----
  {
    id: "gig_flyer_design",
    title: "Gig: Flyer Design",
    description: "Design a quick flyer for a pawn shop.",
    type: "gig",
    act: 1,
    locationId: "electronics",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "flyer",
        text: "Pawn shop wants neon flyer.",
        choices: [
          {
            id: "simple",
            label: "Simple template",
            cost: { energy: 1, time: 1 },
            success: { outcomes: { money: 12, streetCred: 1, energy: -1, time: 1 }, completeQuest: true },
          },
          {
            id: "custom",
            label: "Custom (Coding 3+)",
            cost: { energy: 2, time: 1 },
            skillCheck: { stat: "coding", threshold: 3 },
            success: { outcomes: { money: 22, streetCred: 2, xp: 8 }, completeQuest: true },
            failure: { outcomes: { streetCred: -1 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_wifi_fix",
    title: "Gig: WiFi Patch",
    description: "Patch motel WiFi captive portal.",
    type: "gig",
    act: 1,
    locationId: "motel",
    repeatable: true,
    prerequisites: { minEnergy: 2 },
    steps: [
      {
        id: "wifi",
        text: "Motel manager hands you a sticky note with router creds.",
        choices: [
          {
            id: "patch",
            label: "Patch calmly",
            cost: { energy: 2, time: 1 },
            lessonId: "ch7_lesson1",
            success: { outcomes: { money: 15, streetCred: 1, energy: -2, time: 1 }, completeQuest: true },
            failure: { outcomes: { streetCred: -1, time: 1 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_zoom_support",
    title: "Gig: Zoom Support",
    description: "Remote support for older students.",
    type: "gig",
    act: 1,
    locationId: "coffee_shop",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "support",
        text: "Troubleshoot audio, screen share, and mute chaos.",
        choices: [
          {
            id: "patient",
            label: "Patient support",
            cost: { energy: 1, time: 2 },
            success: { outcomes: { money: 10, streetCred: 1, time: 2 }, completeQuest: true },
          },
          {
            id: "speed",
            label: "Speed support",
            cost: { energy: 2, time: 1 },
            success: { outcomes: { money: 16, streetCred: 1, time: 1 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_battery_swap",
    title: "Gig: Battery Swap",
    description: "Swap phone batteries for skaters.",
    type: "gig",
    act: 1,
    locationId: "alley",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "swap",
        text: "Skaters line up with dead phones.",
        choices: [
          {
            id: "swap_safe",
            label: "Swap carefully",
            cost: { energy: 1, time: 1 },
            success: { outcomes: { money: 8, streetCred: 1, time: 1 }, completeQuest: true },
          },
          {
            id: "swap_fast",
            label: "Swap fast (risk damage)",
            cost: { energy: 1, time: 1 },
            failChance: 0.4,
            success: { outcomes: { money: 14, streetCred: 2 }, completeQuest: true },
            failure: { outcomes: { streetCred: -2, money: -5 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_planet_cleanup",
    title: "Gig: Planet Cleanup",
    description: "Quick janitor shift for energy access.",
    type: "gig",
    act: 1,
    locationId: "planet_fitness",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "cleanup_shift",
        text: "Mop aisles, earn outlet time.",
        choices: [
          {
            id: "mop",
            label: "Mop carefully",
            cost: { energy: 1, time: 1 },
            success: { outcomes: { money: 10, energy: 3, time: 1 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_coffee_runner",
    title: "Gig: Coffee Runner",
    description: "Deliver coffees to remote workers.",
    type: "gig",
    act: 2,
    locationId: "coffee_shop",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "runner",
        text: "Spill and you pay.",
        choices: [
          {
            id: "careful",
            label: "Careful delivery",
            cost: { energy: 1, time: 1 },
            success: { outcomes: { money: 14, streetCred: 1, time: 1 }, completeQuest: true },
          },
          {
            id: "sprint",
            label: "Sprint delivery",
            cost: { energy: 2, time: 1 },
            success: { outcomes: { money: 22, streetCred: 2, time: 1 }, completeQuest: true },
            failure: { outcomes: { streetCred: -2, money: -5 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_ride_share_debug",
    title: "Gig: RideShare Debug",
    description: "Fix a rideshare driver's dashboard tablet.",
    type: "gig",
    act: 2,
    locationId: "alley",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "debug",
        text: "Tablet stuck on update screen.",
        choices: [
          {
            id: "manual_patch",
            label: "Manual patch",
            cost: { energy: 1, time: 1 },
            success: { outcomes: { money: 18, streetCred: 2, time: 1 }, completeQuest: true },
          },
          {
            id: "factory_reset",
            label: "Factory reset (risk anger)",
            cost: { energy: 1, time: 1 },
            failChance: 0.3,
            success: { outcomes: { money: 26, streetCred: 2 }, completeQuest: true },
            failure: { outcomes: { streetCred: -3, money: -10 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_night_shift",
    title: "Gig: Night Data Entry",
    description: "Late-night spreadsheet gig.",
    type: "gig",
    act: 2,
    locationId: "electronics",
    repeatable: true,
    prerequisites: { minEnergy: 2 },
    steps: [
      {
        id: "data_entry",
        text: "Eyes blur, numbers crawl.",
        choices: [
          {
            id: "steady_entry",
            label: "Steady entry",
            cost: { energy: 2, time: 2 },
            success: { outcomes: { money: 30, streetCred: 1, xp: 10 }, completeQuest: true },
          },
          {
            id: "rush_entry",
            label: "Rush entry",
            cost: { energy: 2, time: 1 },
            failChance: 0.5,
            success: { outcomes: { money: 36, streetCred: 2, xp: 10 }, completeQuest: true },
            failure: { outcomes: { streetCred: -2, money: -10 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_client_review",
    title: "Gig: Client Code Review",
    description: "Review a junior dev's code for quick cash.",
    type: "gig",
    act: 3,
    locationId: "client_house",
    repeatable: true,
    prerequisites: { minEnergy: 2 },
    steps: [
      {
        id: "review",
        text: "Choose between nitpicky or kind review.",
        choices: [
          {
            id: "kind",
            label: "Kind review",
            cost: { energy: 2, time: 1 },
            success: { outcomes: { money: 24, streetCred: 2 }, completeQuest: true },
          },
          {
            id: "nitpick",
            label: "Nitpick (risk reputation)",
            cost: { energy: 1, time: 1 },
            failChance: 0.4,
            success: { outcomes: { money: 30, streetCred: 1 }, completeQuest: true },
            failure: { outcomes: { streetCred: -3 }, completeQuest: true },
          },
        ],
      },
    ],
  },
  {
    id: "gig_lecture_notes",
    title: "Gig: Lecture Notes",
    description: "Transcribe a recorded lecture for a sleepy student.",
    type: "gig",
    act: 2,
    locationId: "motel",
    repeatable: true,
    prerequisites: { minEnergy: 1 },
    steps: [
      {
        id: "transcribe",
        text: "Audio quality is trash, professor mumbles.",
        choices: [
          {
            id: "listen_carefully",
            label: "Listen carefully and type",
            cost: { energy: 1, time: 2 },
            success: { outcomes: { money: 20, streetCred: 1, xp: 10, time: 2 }, completeQuest: true },
          },
          {
            id: "use_app",
            label: "Use a sketchy transcription app (risk)",
            cost: { energy: 1, time: 1, money: 2 },
            failChance: 0.4,
            success: { outcomes: { money: 28, streetCred: 1, time: 1 }, completeQuest: true },
            failure: { outcomes: { streetCred: -2, money: -5, time: 1 }, completeQuest: true },
          },
        ],
      },
    ],
  },
];

export function getQuestById(id) {
  return QUESTS.find((q) => q.id === id);
}

export function buildQuestIndex() {
  const map = new Map();
  QUESTS.forEach((q) => map.set(q.id, q));
  return map;
}
