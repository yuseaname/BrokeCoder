export const STORY_SEASONS = {
  season1: {
    season: 1,
    title: "Season 1: The Phone Era",
    chapters: [
      {
        id: "s1c1",
        title: "Life With the Phone",
        summary: "Landfill shift, cracked phone, first spark of a typing hustle.",
        scenes: [
          {
            id: "s1c1_scene1",
            type: "dialogue",
            character: "charlie_portrait",
            text: "LA glows like a busted neon sign. I’m still on shift at the landfill, scrolling the cracked phone that might be my escape hatch.",
            choices: [
              { id: "be_optimistic", label: "I can do this.", effects: { morale: 1 }, nextScene: "s1c1_scene2" },
              { id: "be_anxious", label: "This is hopeless…", effects: { morale: -1 }, nextScene: "s1c1_scene2" },
            ],
          },
          {
            id: "s1c1_scene2",
            type: "dialogue",
            character: "zoom_lady",
            text: "Zoom Lady squints through her webcam: “Typing gigs. $15/hr. No laptop? No problem. Prove you can type on that phone.”",
            choices: [
              { id: "accept_gig", label: "Sign up fast", nextScene: "s1c1_scene3" },
              { id: "ask_question", label: "Is this even real?", nextScene: "s1c1_scene2b" },
            ],
          },
          {
            id: "s1c1_scene2b",
            type: "dialogue",
            character: "zoom_lady",
            text: "She shrugs. “Real enough if you can keep up. Start with tiny words. Show me steady thumbs.”",
            nextScene: "s1c1_scene3",
          },
          {
            id: "s1c1_scene3",
            type: "lesson",
            lessonId: "ch1_lesson1",
            nextScene: "s1c1_scene4",
          },
          {
            id: "s1c1_scene4",
            type: "dialogue",
            character: "charlie",
            text: "Thumbs ache, but the words land. The landfill hum fades under the idea that typing might be my ticket off Venice Boulevard.",
            nextScene: "s1c1_scene5",
          },
          {
            id: "s1c1_scene5",
            type: "dialogue",
            character: "raccoon",
            text: "A raccoon eyes my pizza slice like it’s the final boss. LA chaos never sleeps. Time to pack the backpack and find a safe corner.",
            choices: [
              { id: "guard_pizza", label: "Guard the slice", effects: { hp: -1, morale: 1 }, nextScene: "s1c2_scene1" },
              { id: "share_pizza", label: "Share the slice", effects: { morale: 2 }, nextScene: "s1c2_scene1" },
            ],
          },
        ],
      },
      {
        id: "s1c2",
        title: "Eviction Speedrun",
        summary: "Eviction notice on the door; survival kit turns into a backpack of hope.",
        scenes: [
          {
            id: "s1c2_scene1",
            type: "dialogue",
            character: "charlie",
            text: "Bright red eviction notice slaps the door. “Rent is due.” My backpack is now my apartment.",
            nextScene: "s1c2_scene2",
          },
          {
            id: "s1c2_scene2",
            type: "lesson",
            lessonId: "ch2_lesson1",
            nextScene: "s1c2_scene3",
          },
          {
            id: "s1c2_scene3",
            type: "dialogue",
            character: "woman2",
            text: "The motel manager squints. “Cash up front.” The cracked phone buzzes—more typing gigs if I don’t lose signal.",
            nextScene: "s1c3_scene1",
          },
        ],
      },
      {
        id: "s1c3",
        title: "First Night: Danger Zone",
        summary: "Wildlife raids, joggers on loop, and the first real resolve to keep typing.",
        scenes: [
          {
            id: "s1c3_scene1",
            type: "dialogue",
            character: "charlie",
            text: "Geese honk like alarm clocks. Joggers sprint past like NPCs. The cracked phone glows: keep typing, stay breathing.",
            choices: [
              { id: "rest", label: "Rest behind the bench", effects: { hp: 2, morale: 1 }, nextScene: "s1c4_scene1" },
            ],
          },
        ],
      },
      {
        id: "s1c4",
        title: "Gig Grind",
        summary: "Stacking tiny typing gigs while dodging street chaos.",
        scenes: [
          {
            id: "s1c4_scene1",
            type: "lesson",
            lessonId: "ch4_lesson1",
            nextScene: "s1c4_scene2",
          },
          {
            id: "s1c4_scene2",
            type: "dialogue",
            character: "woman1",
            text: "A rooftop mentor laughs: “You’re still on a phone? Keep stacking reps. Laptop fund or bust.”",
            choices: [
              { id: "agree", label: "Laptop fund only", effects: { money: 5 }, nextScene: "s1c5_scene1" },
              { id: "doubt", label: "What if it breaks?", effects: { morale: -1 }, nextScene: "s1c5_scene1" },
            ],
          },
        ],
      },
      {
        id: "s1c5",
        title: "Planet Fitness Sanctuary",
        summary: "Showers, sockets, and whispered keypresses in a purple glow.",
        scenes: [
          {
            id: "s1c5_scene1",
            type: "lesson",
            lessonId: "ch5_lesson1",
            nextScene: "s1c5_scene2",
          },
          {
            id: "s1c5_scene2",
            type: "dialogue",
            character: "woman3",
            text: "Planet Fitness guardian nods: “Keep it quiet, keep it moving. This place is neutral ground.”",
            nextScene: "s1c6_scene1",
          },
        ],
      },
      {
        id: "s1c6",
        title: "Raccoon Chaos",
        summary: "Pizza thieves test resolve; tiny battles add grit.",
        scenes: [
          {
            id: "s1c6_scene1",
            type: "battle",
            character: "raccoon",
            text: "Raccoon miniboss lunges for dinner. Time to out-type a bandit.",
            choices: [
              { id: "fight", label: "Type it down", lessonId: "ch6_lesson1", effects: { xp: 8, hp: -1 }, nextScene: "s1c6_scene2" },
              { id: "bribe", label: "Bribe with crust", effects: { money: -2, morale: 1 }, nextScene: "s1c6_scene2" },
            ],
          },
          {
            id: "s1c6_scene2",
            type: "dialogue",
            character: "charlie",
            text: "The bandit retreats. Thumb stamina rising. Laptop fund inches upward.",
            nextScene: "s1c7_scene1",
          },
        ],
      },
      {
        id: "s1c7",
        title: "Motel Hell",
        summary: "Sketchy WiFi, sticky floors, priceless charging outlets.",
        scenes: [
          {
            id: "s1c7_scene1",
            type: "lesson",
            lessonId: "ch7_lesson1",
            nextScene: "s1c7_scene2",
          },
          {
            id: "s1c7_scene2",
            type: "dialogue",
            character: "woman2",
            text: "Motel manager shrugs: “WiFi’s flaky. Pay first, complain later.”",
            nextScene: "s1c8_scene1",
          },
        ],
      },
      {
        id: "s1c8",
        title: "Street Party Chaos",
        summary: "Bass drops and neon crowds stress-test thumb precision.",
        scenes: [
          {
            id: "s1c8_scene1",
            type: "lesson",
            lessonId: "ch8_lesson1",
            nextScene: "s1c8_scene2",
          },
          {
            id: "s1c8_scene2",
            type: "battle",
            character: "weirdpartyguy",
            text: "Street partier bumps your shoulder. “Yo, teach me to type or hand over that phone.”",
            choices: [
              { id: "teach", label: "Give a fast tip", effects: { morale: 1, money: 2 }, nextScene: "s1c9_scene1" },
              { id: "sidestep", label: "Slip away", effects: { hp: -1 }, nextScene: "s1c9_scene1" },
            ],
          },
        ],
      },
      {
        id: "s1c9",
        title: "Saving for Laptop",
        summary: "Each gig is a brick; each lesson a dollar toward the machine.",
        scenes: [
          {
            id: "s1c9_scene1",
            type: "lesson",
            lessonId: "ch9_lesson1",
            nextScene: "s1c9_scene2",
          },
          {
            id: "s1c9_scene2",
            type: "dialogue",
            character: "charlie",
            text: "Laptop fund: almost there. Every typo feels expensive. Every perfect word is rent.",
            nextScene: "s1c10_scene1",
          },
        ],
      },
      {
        id: "s1c10",
        title: "Final Phone Challenge",
        summary: "Cracked screen finale before the laptop unlock.",
        scenes: [
          {
            id: "s1c10_scene1",
            type: "lesson",
            lessonId: "ch10_final",
            nextScene: "s1c10_scene2",
          },
          {
            id: "s1c10_scene2",
            type: "dialogue",
            character: "charlie",
            text: "Thumbs numb, lungs full of LA air. Enough cash for the laptop. The Phone Era ends.",
            nextScene: "s2c1_scene1",
          },
        ],
      },
    ],
  },

  season2: {
    season: 2,
    title: "Season 2: Laptop Era",
    chapters: [
      {
        id: "s2c1",
        title: "The $600 Decision",
        summary: "The battered laptop purchase and guarding it like treasure.",
        scenes: [
          {
            id: "s2c1_scene1",
            type: "dialogue",
            character: "charlie",
            text: "Cash hits the counter. The laptop is used, dusty, perfect. If I lose it, the dream dies.",
            nextScene: "s2c1_scene2",
          },
          {
            id: "s2c1_scene2",
            type: "lesson",
            lessonId: "s2_ch1_lesson1",
            nextScene: "s2c1_scene3",
          },
          {
            id: "s2c1_scene3",
            type: "dialogue",
            character: "disgruntled_weird",
            text: "Guy in a hoodie stares. I hug the laptop tighter and move. “Urban stealth mode engaged.”",
            nextScene: "s2c2_scene1",
          },
        ],
      },
      {
        id: "s2c2",
        title: "First Laptop Gigs",
        summary: "From frog blogs to fixing WiFi—awkward first keyboard reps.",
        scenes: [
          {
            id: "s2c2_scene1",
            type: "lesson",
            lessonId: "s2_ch2_lesson1",
            nextScene: "s2c2_scene2",
          },
          {
            id: "s2c2_scene2",
            type: "dialogue",
            character: "zoom_lady",
            text: "Zoom Lady sighs: “Blogs, emails, anything. Just ship.” My laptop fans scream like a banshee.",
            nextScene: "s2c3_scene1",
          },
        ],
      },
      {
        id: "s2c3",
        title: "Raccoon Incident 2.0",
        summary: "Laptop protection mode vs. evolved street wildlife.",
        scenes: [
          {
            id: "s2c3_scene1",
            type: "battle",
            character: "raccoon",
            text: "Masked bandit eyes the laptop bag. Not again.",
            choices: [
              { id: "stand_ground", label: "Stand ground (type warning)", lessonId: "s2_ch3_lesson1", effects: { xp: 10, hp: -1 }, nextScene: "s2c4_scene1" },
              { id: "offer_snack", label: "Offer snack, keep typing", effects: { money: -2, morale: 1 }, nextScene: "s2c4_scene1" },
            ],
          },
        ],
      },
      {
        id: "s2c4",
        title: "Client Fires",
        summary: "Calming angry emails and holding the line.",
        scenes: [
          {
            id: "s2c4_scene1",
            type: "lesson",
            lessonId: "s2_ch4_lesson1",
            nextScene: "s2c4_scene2",
          },
          {
            id: "s2c4_scene2",
            type: "dialogue",
            character: "woman4",
            text: "Gig app recruiter: “Keep it professional. Calm their rage, cash their check.”",
            nextScene: "s2c5_scene1",
          },
        ],
      },
      {
        id: "s2c5",
        title: "Cafe Siege",
        summary: "Coffee-fueled deadlines with shaky WiFi.",
        scenes: [
          {
            id: "s2c5_scene1",
            type: "lesson",
            lessonId: "s2_ch5_lesson1",
            nextScene: "s2c5_scene2",
          },
          {
            id: "s2c5_scene2",
            type: "dialogue",
            character: "charlie",
            text: "Latte spill near the keyboard. I type faster so the universe can’t catch me.",
            nextScene: "s2c6_scene1",
          },
        ],
      },
      {
        id: "s2c6",
        title: "Portfolio Sprint",
        summary: "Shipping tiny sites to earn trust and sleep.",
        scenes: [
          {
            id: "s2c6_scene1",
            type: "lesson",
            lessonId: "s2_ch6_lesson1",
            nextScene: "s2c6_scene2",
          },
          {
            id: "s2c6_scene2",
            type: "dialogue",
            character: "weird_hacker",
            text: "A hacker in the cafe glances over: “Ship small, ship often. Keep your commits honest.”",
            nextScene: "s2c7_scene1",
          },
        ],
      },
      {
        id: "s2c7",
        title: "Alleyway Ambush",
        summary: "Dangerous shortcut, hands on keyboard anyway.",
        scenes: [
          {
            id: "s2c7_scene1",
            type: "battle",
            character: "meth_samurai",
            text: "A wild-eyed stranger blocks the alley: “Pay up or drop the laptop.”",
            choices: [
              { id: "type_prayer", label: "Type a distraction", lessonId: "s2_ch7_lesson1", effects: { xp: 12, hp: -2 }, nextScene: "s2c7_scene2" },
              { id: "dash", label: "Sprint away", effects: { hp: -3, morale: 1 }, nextScene: "s2c7_scene2" },
            ],
          },
          {
            id: "s2c7_scene2",
            type: "dialogue",
            character: "charlie",
            text: "Heart racing. Laptop intact. Courage logged.",
            nextScene: "s2c8_scene1",
          },
        ],
      },
      {
        id: "s2c8",
        title: "First Big Contract",
        summary: "Deliver the project that cements the coder life.",
        scenes: [
          {
            id: "s2c8_scene1",
            type: "lesson",
            lessonId: "s2_ch8_final",
            nextScene: "s2c8_scene2",
          },
          {
            id: "s2c8_scene2",
            type: "dialogue",
            character: "charlie",
            text: "Contract shipped. Laptop paid off. The jungle opens into a skyline of new quests.",
            nextScene: null,
          },
        ],
      },
    ],
  },
};

export const STORY = STORY_SEASONS.season1;
export const STORY_START = { seasonKey: "season1", chapterId: "s1c1", sceneId: "s1c1_scene1" };
