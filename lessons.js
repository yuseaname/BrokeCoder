import { startChallenge } from "./typing-engine/core/startChallenge.js";

export const LESSONS = {
  // Season 1: Phone Era
  ch1_lesson1: {
    id: "ch1_lesson1",
    title: "Tiny Words Practice",
    description: "Phone-typing warmup: keep your thumbs steady, keep the LA chaos out.",
    textToType: "hi ok yes no yo hey bye run go up down",
    rewards: { xp: 5, money: 2, morale: 1 },
    durationMs: 45000,
  },
  ch1_lesson2: {
    id: "ch1_lesson2",
    title: "Short Street Sentences",
    description: "Tap out scrappy sentences like you're texting a gig boss on 2% battery.",
    textToType: "i can keep going even with a cracked screen and a city full of raccoons",
    rewards: { xp: 8, money: 3, morale: 1 },
    durationMs: 45000,
  },
  ch2_lesson1: {
    id: "ch2_lesson1",
    title: "Eviction Notice DM",
    description: "Type a calm text to the landlord while sprinting for a new couch.",
    textToType: "rent is late but i am not done fighting for this city or my laptop dream",
    rewards: { xp: 10, money: 4, morale: 2 },
  },
  ch3_lesson1: {
    id: "ch3_lesson1",
    title: "Park Bench Composure",
    description: "Focus through honking horns and the distant raccoon boss music.",
    textToType: "breathe type focus even when the geese laugh and joggers loop forever",
    rewards: { xp: 12, money: 5, morale: 2 },
  },
  ch4_lesson1: {
    id: "ch4_lesson1",
    title: "Gig Grind Texts",
    description: "Rapid-fire gig confirmations, no autocorrect safety net.",
    textToType: "on my way to fix your wifi bring cash i accept pizza tips and compliments",
    rewards: { xp: 14, money: 7, morale: 2 },
  },
  ch5_lesson1: {
    id: "ch5_lesson1",
    title: "Planet Fitness Checkout",
    description: "Type quietly in the locker room without waking the protein zombies.",
    textToType: "shower sleep type hustle repeat planet fitness is my secret base",
    rewards: { xp: 16, money: 8, morale: 3, hp: 2 },
  },
  ch6_lesson1: {
    id: "ch6_lesson1",
    title: "Raccoon Boss Taunts",
    description: "Return fire with perfect keystrokes while guarding your pizza slice.",
    textToType: "back off raccoon this pizza is mine and i am becoming unstoppable",
    rewards: { xp: 18, money: 8, morale: 3 },
    durationMs: 40000,
  },
  ch7_lesson1: {
    id: "ch7_lesson1",
    title: "Motel WiFi Captive Portal",
    description: "Type the password and escape the splash page without clicking ads.",
    textToType: "no i will not buy motel coins i just need wifi to finish this gig",
    rewards: { xp: 20, money: 10, morale: 3, hp: 1 },
  },
  ch8_lesson1: {
    id: "ch8_lesson1",
    title: "Street Party Chaos",
    description: "Rhythm typing through bass drops and neon confetti.",
    textToType: "music loud thumbs louder i am still coding my way out of this block party",
    rewards: { xp: 22, money: 11, morale: 4 },
  },
  ch9_lesson1: {
    id: "ch9_lesson1",
    title: "Savings Tracker",
    description: "Enter every dollar without typos; the laptop fund depends on it.",
    textToType: "twenty four dollars saved today laptop is within reach keep typing",
    rewards: { xp: 24, money: 12, morale: 4 },
  },
  ch10_final: {
    id: "ch10_final",
    title: "Final Phone Gauntlet",
    description: "Cracked screen, low battery, nonstop chaos. Deliver perfection.",
    textToType: "the phone was my first sword the laptop is my next i will not drop either",
    rewards: { xp: 30, money: 20, morale: 5, hp: 3 },
    durationMs: 60000,
  },
  city_zoom_intro: {
    id: "city_zoom_intro",
    title: "Zoom Setup DM",
    description: "Talk an anxious elder through unmuting without losing patience.",
    textToType: "tap the tiny mic icon once no twice no wait stop tapping leave it unmuted i promise you are live now breathe",
    rewards: { xp: 9, money: 10, morale: 1, hp: 1 },
    durationMs: 40000,
  },
  city_inventory: {
    id: "city_inventory",
    title: "Thrift Inventory Codes",
    description: "Speed type dusty SKUs for the electronics thrift owner.",
    textToType: "ps2 controller 12a dusty keyboard 7b crt monitor 3c bag of cables 4f phone chargers assorted lot",
    rewards: { xp: 10, money: 14, morale: 1 },
    durationMs: 45000,
  },

  // Season 2: Laptop Era
  s2_ch1_lesson1: {
    id: "s2_ch1_lesson1",
    title: "$600 Decision Drills",
    description: "Protect the laptop bag. Type steady while riding the bus.",
    textToType: "this laptop cost six twenty if i lose it i lose my shot keep it close",
    rewards: { xp: 12, money: 6, morale: 3 },
  },
  s2_ch2_lesson1: {
    id: "s2_ch2_lesson1",
    title: "First Laptop Gig",
    description: "Blog post rush for frog lovers. SEO but make it heartfelt.",
    textToType: "frogs are underrated pets they jump like my dreams and land on opportunity",
    rewards: { xp: 18, money: 14, morale: 3 },
  },
  s2_ch3_lesson1: {
    id: "s2_ch3_lesson1",
    title: "Raccoon 2.0 Defense",
    description: "Guard the laptop with keystrokes of fury.",
    textToType: "masked bandit stay back this keyboard is my shield and my story",
    rewards: { xp: 22, money: 15, morale: 3, hp: 2 },
  },
  s2_ch4_lesson1: {
    id: "s2_ch4_lesson1",
    title: "Client Emails",
    description: "Calmly rewrite angry client emails into polite win-wins.",
    textToType: "thank you for your patience the fix is live and i appreciate the trust",
    rewards: { xp: 24, money: 18, morale: 4 },
  },
  s2_ch5_lesson1: {
    id: "s2_ch5_lesson1",
    title: "Cafe WiFi Siege",
    description: "Latency spikes and latte spills. Keep typing.",
    textToType: "cafe crowded wifi shaky but my words stay smooth like latte art",
    rewards: { xp: 26, money: 18, morale: 4, hp: 1 },
  },
  s2_ch6_lesson1: {
    id: "s2_ch6_lesson1",
    title: "Portfolio Build",
    description: "Ship a tiny site before the cafe closes.",
    textToType: "ship small ship often each commit is a brick toward my freedom tower",
    rewards: { xp: 30, money: 22, morale: 5 },
  },
  s2_ch7_lesson1: {
    id: "s2_ch7_lesson1",
    title: "Alleyway Ambush",
    description: "Type through danger; keep morale and laptop intact.",
    textToType: "keep walking keep typing danger on left hope on right laptop in hand",
    rewards: { xp: 32, money: 24, morale: 5, hp: 2 },
  },
  s2_ch8_final: {
    id: "s2_ch8_final",
    title: "First Big Contract",
    description: "A long-form deliverable that cements the coder life.",
    textToType: "contract landed time to deliver clean code clear words and a steady heart",
    rewards: { xp: 40, money: 40, morale: 6, hp: 3 },
  },
  s2_html_snippet: {
    id: "s2_html_snippet",
    title: "HTML Flyer Snippet",
    description: "Ship a tiny flyer with honest markup and a clean CTA.",
    textToType: "<section class=\"flyer\"><h1>cash 4 laptops</h1><p>dusty macbooks welcome we pay fair we pay fast</p><a href=\"#trade\">tap to trade</a></section>",
    rewards: { xp: 24, money: 22, morale: 2 },
    durationMs: 55000,
  },
};

export function getLesson(id) {
  return LESSONS[id] || null;
}

function getLessonEls() {
  return {
    overlay: document.getElementById("lesson-overlay"),
    title: document.getElementById("lesson-title"),
    description: document.getElementById("lesson-description"),
    script: document.getElementById("lesson-script"),
    input: document.getElementById("lesson-input"),
    submit: document.getElementById("lesson-submit"),
    exit: document.getElementById("lesson-exit"),
    progressBar: document.getElementById("lesson-progress-bar"),
    reward: document.getElementById("lesson-reward"),
  };
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function setProgress({ input, progressBar, targetText, reward }) {
  if (!input || !progressBar) return;
  const percent = clamp(Math.round((input.value.length / targetText.length) * 100), 0, 100);
  progressBar.style.width = `${percent}%`;
  if (reward) reward.textContent = `${percent}% typed · stay steady`;
}

export function hideLessonOverlay() {
  const { overlay } = getLessonEls();
  overlay?.classList.add("hidden");
}

export function startLesson(lessonId, { onComplete, onCancel } = {}) {
  const lesson = getLesson(lessonId);
  const els = getLessonEls();
  if (!lesson || !els.overlay) return;

  els.title.textContent = lesson.title;
  els.description.textContent = lesson.description || "";
  els.script.textContent = lesson.textToType;
  els.input.value = "";
  els.overlay.classList.remove("hidden");
  els.input.focus();
  setProgress({ input: els.input, progressBar: els.progressBar, targetText: lesson.textToType, reward: els.reward });
  if (els.reward) {
    const { xp = 0, money = 0, morale = 0, hp = 0 } = lesson.rewards || {};
    const parts = [`+${xp} XP`, `+$${money}`];
    if (morale) parts.push(`+${morale} morale`);
    if (hp) parts.push(`+${hp} hp`);
    els.reward.dataset.rewards = parts.join(" | ");
    els.reward.textContent = els.reward.dataset.rewards;
  }

  const challenge = startChallenge(lesson.textToType, lesson.durationMs, (result) => {
    if (result.timedOut) {
      failFlash();
      return;
    }

    const expected = lesson.textToType.trim();
    const typed = result.typed;
    if (typed === expected || result.accuracy >= 92) {
      finishLesson(result);
    } else {
      failFlash();
    }
  });

  const finishLesson = (result) => {
    hideLessonOverlay();
    if (els.reward?.dataset?.rewards) {
      const stats = result
        ? ` ${result.wpm} wpm · ${result.accuracy}% acc`
        : "";
      els.reward.textContent = `${els.reward.dataset.rewards}${stats}`;
    }
    if (onComplete) onComplete(lesson, result);
  };

  const failFlash = () => {
    els.input.classList.remove("shake");
    // Force reflow to restart animation.
    void els.input.offsetWidth;
    els.input.classList.add("shake");
  };

  els.submit.onclick = (e) => {
    e.preventDefault();
    challenge.submit(els.input.value);
  };

  els.exit.onclick = (e) => {
    e.preventDefault();
    challenge.cancel();
    hideLessonOverlay();
    if (onCancel) onCancel();
  };

  els.input.oninput = () => {
    setProgress({ input: els.input, progressBar: els.progressBar, targetText: lesson.textToType, reward: els.reward });
  };
}
