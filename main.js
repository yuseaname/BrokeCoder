console.log("[BrokeCoder] main.js loading...");

import {
  CHARACTER_IMAGES,
  GAME_MAIN_IMAGE,
  LOCATION_IMAGES,
  preloadImages,
  resolveMainImage,
} from "./assets.js";
import { showDialogue, hideDialogue } from "./dialogueUI.js";
import { STORY, STORY_SEASONS, STORY_START } from "./storyData.js";
import { startLesson, hideLessonOverlay } from "./lessons.js";
import {
  BASE_STATS,
  CITY_CONTENT,
  RESOURCE_CONFIG,
  SHOP_ITEMS,
  START_RESOURCES,
  getGearById,
  getMissionById,
  getShopItem,
} from "./gameContent.js";
import { createQuestManager } from "./questManager.js";
import { QUESTS } from "./questData.js";

console.log("[BrokeCoder] imports loaded successfully");

const selectors = {
  titleScreen: document.getElementById("title-screen"),
  gameScreen: document.getElementById("game-screen"),
  menuItems: Array.from(document.querySelectorAll(".menu-item")),
  overlay: document.getElementById("overlay"),
  optionsPanel: document.getElementById("options-panel"),
  creditsPanel: document.getElementById("credits-panel"),
  quitPanel: document.getElementById("quit-panel"),
  rosterPanel: document.getElementById("roster-panel"),
  panelCloseButtons: Array.from(document.querySelectorAll(".panel-close")),
  loadingScreen: document.getElementById("loading-screen"),
  loadingProgress: document.getElementById("loading-progress"),
  characterRoster: document.getElementById("character-roster"),
  subtitle: document.querySelector("#title-screen .subtitle"),
  gamePlaceholder: document.querySelector("#game-screen .game-placeholder"),
  playerHud: document.getElementById("player-hud"),
  resourceHud: document.getElementById("resource-hud"),
  seasonPill: document.querySelector(".season-pill"),
  modeTabs: Array.from(document.querySelectorAll(".mode-tab")),
  statusBanner: document.getElementById("status-banner"),
  storyPanel: document.getElementById("story-panel"),
  cityPanel: document.getElementById("city-panel"),
  shopPanel: document.getElementById("shop-panel"),
  inventoryPanel: document.getElementById("inventory-panel"),
  locationList: document.getElementById("location-list"),
  missionList: document.getElementById("mission-list"),
  questLogList: document.getElementById("quest-log-list"),
  shopList: document.getElementById("shop-list"),
  inventoryList: document.getElementById("inventory-list"),
  chapterProgress: document.getElementById("chapter-progress"),
};

const defaultQuestState = () => ({
  active: {},
  completed: [],
  failed: [],
  unlocked: [],
  locked: [],
  log: [],
});
const FALLBACK_HERO_IMAGE = GAME_MAIN_IMAGE || "./media/game/brokecodermain.png";
const SAVE_KEY = "brokecoder_save_v2";
let heroImagePath = FALLBACK_HERO_IMAGE;
let focusedIndex = 0;
let resourceTicker = null;
let gameState = createDefaultState();
let questManager = createQuestManager(() => gameState);
syncQuestState();

function syncQuestState() {
  questManager.ensureQuestState(gameState);
  questManager.validateGraph();
}

function createDefaultState() {
  return {
    saveVersion: 3,
    seasonKey: STORY_START.seasonKey,
    chapterId: STORY_START.chapterId,
    sceneId: STORY_START.sceneId,
    mode: "story",
    currentLocation: "motel",
    statusMessage: "",
    player: {
      level: 1,
      xp: 0,
      money: 20,
      morale: 5,
      hp: 20,
      phoneEnergy: { current: 10, max: 10 },
      streetCred: 0,
      time: { day: 1, hour: 8 },
      flags: {},
      quests: defaultQuestState(),
      stats: { ...BASE_STATS },
      resources: {
        focus: { current: START_RESOURCES.focus, max: RESOURCE_CONFIG.focus.max },
        nerve: { current: START_RESOURCES.nerve, max: RESOURCE_CONFIG.nerve.max },
        physical: { current: START_RESOURCES.physical, max: RESOURCE_CONFIG.physical.max },
      },
      gear: { device: "cracked_phone", vehicle: null },
      gearOwned: ["cracked_phone"],
      inventory: [],
      completedLessons: [],
      completedMissions: [],
    },
  };
}

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

function xpForNext(level) {
  return 20 + (level - 1) * 15;
}

function unlockedSeasons() {
  return gameState.seasonKey === "season2" ? ["season1", "season2"] : ["season1"];
}

function normalizeResources(res = {}) {
  return {
    focus: {
      current: res.focus?.current ?? res.focus ?? START_RESOURCES.focus,
      max: res.focus?.max ?? RESOURCE_CONFIG.focus.max,
    },
    nerve: {
      current: res.nerve?.current ?? res.nerve ?? START_RESOURCES.nerve,
      max: res.nerve?.max ?? RESOURCE_CONFIG.nerve.max,
    },
    physical: {
      current: res.physical?.current ?? res.physical ?? START_RESOURCES.physical,
      max: res.physical?.max ?? RESOURCE_CONFIG.physical.max,
    },
  };
}

function hydrateState(raw) {
  const defaults = createDefaultState();
  const mergedPlayer = {
    ...defaults.player,
    ...(raw.player || {}),
    stats: { ...defaults.player.stats, ...(raw.player?.stats || {}) },
    resources: normalizeResources(raw.player?.resources || {}),
    phoneEnergy: raw.player?.phoneEnergy || defaults.player.phoneEnergy,
    streetCred: raw.player?.streetCred ?? defaults.player.streetCred,
    time: raw.player?.time || defaults.player.time,
    flags: { ...defaults.player.flags, ...(raw.player?.flags || {}) },
    quests: raw.player?.quests || defaultQuestState(),
    inventory: Array.isArray(raw.player?.inventory) ? raw.player.inventory : [],
    gear: { ...defaults.player.gear, ...(raw.player?.gear || {}) },
    gearOwned: Array.isArray(raw.player?.gearOwned) ? raw.player.gearOwned : defaults.player.gearOwned,
    completedLessons: raw.player?.completedLessons || [],
    completedMissions: raw.player?.completedMissions || [],
  };

  return {
    ...defaults,
    ...raw,
    player: mergedPlayer,
    mode: raw.mode || defaults.mode,
    currentLocation: raw.currentLocation || defaults.currentLocation,
  };
}

function recalcResourceCaps() {
  const { player } = gameState;
  if (!player?.resources) return;
  player.resources.focus.max = RESOURCE_CONFIG.focus.max + (player.stats.focus - 1);
  player.resources.nerve.max = RESOURCE_CONFIG.nerve.max + Math.floor((player.stats.streetsmarts - 1) / 1.5);
  player.resources.physical.max = RESOURCE_CONFIG.physical.max + (player.stats.fitness - 1);
  Object.values(player.resources).forEach((res) => {
    res.current = clamp(res.current, 0, res.max);
  });
}

function adjustResource(key, delta) {
  const res = gameState.player.resources[key];
  if (!res) return;
  res.current = clamp(res.current + delta, 0, res.max);
}

function adjustPhoneEnergy(delta) {
  const energy = gameState.player.phoneEnergy || { current: 0, max: 10 };
  energy.current = clamp(energy.current + delta, 0, energy.max);
  gameState.player.phoneEnergy = energy;
  return energy.current;
}

function advanceTime(hours = 1) {
  const time = gameState.player.time || { day: 1, hour: 8 };
  let { day, hour } = time;
  hour += hours;
  while (hour >= 24) {
    day += 1;
    hour -= 24;
  }
  gameState.player.time = { day, hour };
}

function formatTime() {
  const { day, hour } = gameState.player.time || { day: 1, hour: 0 };
  const suffix = hour >= 12 ? "PM" : "AM";
  const hr12 = ((hour + 11) % 12) + 1;
  return `Day ${day}, ${hr12}:00 ${suffix}`;
}

function spendResources(cost = {}) {
  const res = gameState.player.resources;
  const missing = Object.entries(cost).find(([key, value]) => {
    const bar = res[key];
    return !bar || bar.current < value;
  });
  if (missing) return false;
  Object.entries(cost).forEach(([key, value]) => adjustResource(key, -value));
  return true;
}

function maybeLevelUp() {
  const { player } = gameState;
  let leveled = false;
  while (player.xp >= xpForNext(player.level)) {
    player.xp -= xpForNext(player.level);
    player.level += 1;
    player.stats.coding += 1;
    player.stats.focus += 1;
    player.stats.hustle += 1;
    player.hp = clamp(player.hp + 5, 0, 100);
    player.morale = clamp(player.morale + 1, 0, 100);
    leveled = true;
  }
  if (leveled) recalcResourceCaps();
}

function applyEffects(effects = {}) {
  const player = gameState.player;
  if (!player) return;

  player.xp = clamp(player.xp + (effects.xp || 0), 0, 99999);
  player.money = clamp(player.money + (effects.money || 0), -99, 99999);
  player.morale = clamp(player.morale + (effects.morale || 0), 0, 100);
  player.hp = clamp(player.hp + (effects.hp || 0), 0, 100);
  player.streetCred = clamp((player.streetCred || 0) + (effects.streetCred || 0), -50, 999);
  if (typeof effects.energy === "number") adjustPhoneEnergy(effects.energy);
  if (typeof effects.time === "number") advanceTime(effects.time);
  if (effects.flags) {
    player.flags = player.flags || {};
    Object.entries(effects.flags).forEach(([k, v]) => {
      player.flags[k] = v;
    });
  }

  Object.entries(effects.stats || {}).forEach(([key, delta]) => {
    player.stats[key] = clamp((player.stats[key] || 0) + delta, 1, 99);
  });
  Object.entries(effects.resources || {}).forEach(([key, delta]) => adjustResource(key, delta));

  maybeLevelUp();
  recalcResourceCaps();
  renderHud();
  saveState();
}

function getStoryForSeason(seasonKey) {
  return STORY_SEASONS[seasonKey] || STORY;
}

function deriveSeasonFromScene(sceneId) {
  if (sceneId?.startsWith("s2")) return "season2";
  return "season1";
}

function setHeroImage(path) {
  heroImagePath = path;
  document.documentElement.style.setProperty("--hero-image", `url("${path}")`);
}

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.warn("Save failed", e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return hydrateState(JSON.parse(raw));
  } catch (e) {
    console.warn("Load failed", e);
    return null;
  }
}

function setStatus(message = "") {
  gameState.statusMessage = message;
  if (!selectors.statusBanner) return;
  if (!message) {
    selectors.statusBanner.classList.remove("visible");
    selectors.statusBanner.textContent = "";
  } else {
    selectors.statusBanner.textContent = message;
    selectors.statusBanner.classList.add("visible");
  }
}

function describeCost(cost = {}) {
  const parts = [];
  if (typeof cost.energy === "number") parts.push(`Energy -${cost.energy}`);
  if (typeof cost.time === "number") parts.push(`Time +${cost.time}h`);
  if (typeof cost.money === "number") parts.push(`$-${cost.money}`);
  if (typeof cost.streetCred === "number") parts.push(`Cred -${cost.streetCred}`);
  ["focus", "nerve", "physical"].forEach((key) => {
    if (typeof cost[key] === "number") parts.push(`${RESOURCE_CONFIG[key]?.label || key} -${cost[key]}`);
  });
  if (cost.items?.length) parts.push(`Items: ${cost.items.map((i) => `${i.id} x${i.qty || 1}`).join(", ")}`);
  return parts.join(" · ");
}

function describePrereqs(quest = {}) {
  const prereq = quest.prerequisites || {};
  const parts = [];
  if (prereq.completedQuests?.length) parts.push(`Needs: ${prereq.completedQuests.join(", ")}`);
  if (prereq.requiredItems?.length) parts.push(`Items: ${prereq.requiredItems.join(", ")}`);
  if (prereq.requiredStats) {
    Object.entries(prereq.requiredStats).forEach(([stat, val]) => parts.push(`${stat} ${val}+`));
  }
  if (prereq.minEnergy) parts.push(`Energy >= ${prereq.minEnergy}`);
  return parts.join(" · ");
}

function getActiveStepForQuest(questId) {
  return gameState.player?.quests?.active?.[questId]?.stepId || null;
}

function gearLabel(id) {
  const gear = getGearById(id);
  if (gear?.name) return gear.name;
  return id ? id.replace(/_/g, " ") : "None";
}

function renderHud() {
  if (!selectors.playerHud) return;
  const { player } = gameState;
  const xpTarget = xpForNext(player.level);
  selectors.playerHud.innerHTML = `
    <div class="hud-item"><span class="hud-label">Level</span><span class="hud-value">${player.level}</span></div>
    <div class="hud-item"><span class="hud-label">XP</span><span class="hud-value">${player.xp}/${xpTarget}</span></div>
    <div class="hud-item"><span class="hud-label">Money</span><span class="hud-value">$${player.money}</span></div>
    <div class="hud-item"><span class="hud-label">Street Cred</span><span class="hud-value">${player.streetCred}</span></div>
    <div class="hud-item">
      <span class="hud-label">Phone Energy</span>
      <span class="hud-value">${player.phoneEnergy?.current ?? 0}/${player.phoneEnergy?.max ?? 0}</span>
      <div class="resource-bar"><span class="resource-fill" style="width:${clamp(Math.round(((player.phoneEnergy?.current || 0) / (player.phoneEnergy?.max || 1)) * 100), 0, 100)}%"></span></div>
    </div>
    <div class="hud-item"><span class="hud-label">Time</span><span class="hud-value">${formatTime()}</span></div>
    <div class="hud-item"><span class="hud-label">HP</span><span class="hud-value">${player.hp}</span></div>
    <div class="hud-item"><span class="hud-label">Morale</span><span class="hud-value">${player.morale}</span></div>
    <div class="hud-item"><span class="hud-label">Stats</span><span class="hud-value">Code ${player.stats.coding} · Hustle ${player.stats.hustle} · Focus ${player.stats.focus} · Street ${player.stats.streetsmarts} · Fit ${player.stats.fitness}</span></div>
    <div class="hud-item"><span class="hud-label">Gear</span><span class="hud-value">${gearLabel(player.gear.device)}${player.gear.vehicle ? " / " + gearLabel(player.gear.vehicle) : ""}</span></div>
  `;

  if (!selectors.resourceHud) return;
  selectors.resourceHud.innerHTML = Object.values(RESOURCE_CONFIG)
    .map((cfg) => {
      const res = player.resources[cfg.id] || { current: 0, max: cfg.max };
      const percent = clamp(Math.round((res.current / res.max) * 100), 0, 100);
      return `
        <div class="hud-item">
          <span class="hud-label">${cfg.label}</span>
          <span class="hud-value">${res.current}/${res.max}</span>
          <div class="resource-bar"><span class="resource-fill" style="width:${percent}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function updateSeasonBadge() {
  const story = getStoryForSeason(gameState.seasonKey);
  if (selectors.seasonPill) {
    selectors.seasonPill.textContent = story.title;
  }
}

function hideAllPanels() {
  selectors.overlay?.classList.add("hidden");
  [selectors.optionsPanel, selectors.creditsPanel, selectors.quitPanel, selectors.rosterPanel].forEach((panel) => {
    panel?.classList.add("hidden");
  });
}

function showTitleScreen() {
  selectors.titleScreen?.classList.remove("hidden");
  selectors.gameScreen?.classList.add("hidden");
  hideAllPanels();
  hideDialogue();
  setStatus("");
  focusMenuIndex(0);
}

function showGameScreen(message = "Welcome to BrokeCoder. Season 1: The Phone Era begins…") {
  console.log("[BrokeCoder] showGameScreen called with message:", message);
  console.log("[BrokeCoder] titleScreen element:", selectors.titleScreen);
  console.log("[BrokeCoder] gameScreen element:", selectors.gameScreen);
  
  selectors.titleScreen?.classList.add("hidden");
  console.log("[BrokeCoder] titleScreen classes after add hidden:", selectors.titleScreen?.className);
  
  selectors.gameScreen?.classList.remove("hidden");
  console.log("[BrokeCoder] gameScreen classes after remove hidden:", selectors.gameScreen?.className);
  
  if (selectors.gamePlaceholder) selectors.gamePlaceholder.textContent = message;
  hideAllPanels();
  updateSeasonBadge();
  renderHud();
  renderChapterProgress();
  renderLocations();
  renderMissions();
  renderShop();
  renderInventory();
  renderQuestLog();
  setMode(gameState.mode || "story");
}

function showOptions() {
  selectors.overlay?.classList.remove("hidden");
  selectors.optionsPanel?.classList.remove("hidden");
  selectors.creditsPanel?.classList.add("hidden");
  selectors.quitPanel?.classList.add("hidden");
  selectors.rosterPanel?.classList.add("hidden");
}

function showCredits() {
  selectors.overlay?.classList.remove("hidden");
  selectors.optionsPanel?.classList.add("hidden");
  selectors.creditsPanel?.classList.remove("hidden");
  selectors.quitPanel?.classList.add("hidden");
  selectors.rosterPanel?.classList.add("hidden");
}

function showQuitMessage() {
  selectors.overlay?.classList.remove("hidden");
  selectors.optionsPanel?.classList.add("hidden");
  selectors.creditsPanel?.classList.add("hidden");
  selectors.quitPanel?.classList.remove("hidden");
  selectors.rosterPanel?.classList.add("hidden");
}

function showRoster() {
  selectors.overlay?.classList.remove("hidden");
  selectors.optionsPanel?.classList.add("hidden");
  selectors.creditsPanel?.classList.add("hidden");
  selectors.quitPanel?.classList.add("hidden");
  selectors.rosterPanel?.classList.remove("hidden");
  renderCharacterRoster();
}

function showLoadingScreen() {
  selectors.loadingScreen?.classList.remove("hidden");
}

function hideLoadingScreen() {
  selectors.loadingScreen?.classList.add("hidden");
}

function updateLoadingProgress(percent = 0) {
  if (!selectors.loadingProgress) return;
  const clamped = Math.max(0, Math.min(100, percent));
  selectors.loadingProgress.style.width = `${clamped}%`;
}

function renderCharacterRoster() {
  if (!selectors.characterRoster) return;
  selectors.characterRoster.innerHTML = "";

  CHARACTER_IMAGES.forEach((char) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src="${char.path}" alt="${char.name}" />
      <h3>${char.name}</h3>
      <div class="character-id">${char.id}</div>
    `;
    selectors.characterRoster.appendChild(card);
  });
}

function initMainMenuKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    const activeOverlay = selectors.overlay && !selectors.overlay.classList.contains("hidden");
    if (activeOverlay) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusMenuIndex(focusedIndex + 1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      focusMenuIndex(focusedIndex - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      selectors.menuItems[focusedIndex]?.click();
    }
  });
}

function focusMenuIndex(idx) {
  if (!selectors.menuItems.length) return;
  if (idx < 0) idx = selectors.menuItems.length - 1;
  if (idx >= selectors.menuItems.length) idx = 0;
  focusedIndex = idx;
  selectors.menuItems[focusedIndex].focus();
}

function wireMenuClicks() {
  console.log("[BrokeCoder] wiring menu clicks...");
  
  // Add a global click listener to debug
  document.addEventListener("click", (e) => {
    console.log("[BrokeCoder] DOCUMENT CLICK:", e.target, e.target.className, e.target.dataset);
  }, true);
  
  selectors.menuItems.forEach((btn, index) => {
    console.log("[BrokeCoder] adding listener to button:", btn.dataset.action, btn);
    
    // Add onclick directly as backup
    btn.onclick = () => {
      console.log("[BrokeCoder] ONCLICK fired for:", btn.dataset.action);
      try {
        handleMenuAction(btn.dataset.action);
      } catch (err) {
        console.error("[BrokeCoder] ERROR in handleMenuAction:", err);
      }
    };
    
    // Also add addEventListener
    btn.addEventListener("click", (e) => {
      console.log("[BrokeCoder] ADDEVENTLISTENER click fired:", btn.dataset.action, e);
      try {
        handleMenuAction(btn.dataset.action);
      } catch (err) {
        console.error("[BrokeCoder] ERROR in handleMenuAction:", err);
      }
    }, true); // Use capture phase
  });
  console.log("[BrokeCoder] menu clicks wired, total items:", selectors.menuItems.length);
}

function wirePanelCloseButtons() {
  selectors.panelCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      hideAllPanels();
      if (!selectors.titleScreen?.classList.contains("hidden")) {
        focusMenuIndex(0);
      }
    });
  });
}

function wireModeTabs() {
  selectors.modeTabs.forEach((tab) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode));
  });
}

async function handleMenuAction(action) {
  console.log("[BrokeCoder] handleMenuAction called with:", action);
  switch (action) {
    case "new":
      console.log("[BrokeCoder] starting new game flow...");
      await startNewGameFlow();
      break;
    case "continue": {
      console.log("[BrokeCoder] loading save...");
      const save = loadState();
      if (save) {
        gameState = hydrateState(save);
        syncQuestState();
        recalcResourceCaps();
        renderHud();
        renderLocations();
        renderMissions();
        renderShop();
        renderInventory();
        showGameScreen("Loading saved run…");
        goToScene(gameState.sceneId);
        setMode(gameState.mode || "story");
      } else if (selectors.subtitle) {
        selectors.subtitle.textContent = "No save file found. Start a new game first.";
        focusMenuIndex(0);
      }
      break;
    }
    case "options":
      showOptions();
      break;
    case "roster":
      showRoster();
      break;
    case "credits":
      showCredits();
      break;
    case "quit":
      showQuitMessage();
      break;
    default:
      console.warn("[BrokeCoder] unknown menu action:", action);
      break;
  }
}

function findScene(sceneId) {
  const story = getStoryForSeason(gameState.seasonKey);
  for (let i = 0; i < story.chapters.length; i += 1) {
    const chapter = story.chapters[i];
    const sceneIndex = chapter.scenes.findIndex((s) => s.id === sceneId);
    if (sceneIndex !== -1) {
      return {
        chapter,
        chapterIndex: i,
        scene: chapter.scenes[sceneIndex],
        sceneIndex,
      };
    }
  }
  return null;
}

function getNextSceneId(currentSceneId) {
  const lookup = findScene(currentSceneId);
  if (!lookup) return null;
  const { chapter, sceneIndex, chapterIndex } = lookup;
  if (sceneIndex < chapter.scenes.length - 1) {
    return chapter.scenes[sceneIndex + 1].id;
  }
  const story = getStoryForSeason(gameState.seasonKey);
  const nextChapter = story.chapters[chapterIndex + 1];
  return nextChapter?.scenes?.[0]?.id || null;
}

function setMode(mode = "story") {
  gameState.mode = mode;
  const map = {
    story: selectors.storyPanel,
    city: selectors.cityPanel,
    shop: selectors.shopPanel,
    inventory: selectors.inventoryPanel,
  };
  Object.values(map).forEach((panel) => panel?.classList.add("hidden"));
  (map[mode] || map.story)?.classList.remove("hidden");
  selectors.modeTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  if (mode === "city") {
    renderLocations();
    renderMissions();
  } else if (mode === "shop") {
    renderShop();
  } else if (mode === "inventory") {
    renderInventory();
  }
  renderQuestLog();
  saveState();
}

function renderChapterProgress(lookup) {
  if (!selectors.chapterProgress) return;
  const info = lookup || findScene(gameState.sceneId);
  if (!info) {
    selectors.chapterProgress.textContent = "";
    return;
  }
  const { chapter, scene } = info;
  selectors.chapterProgress.textContent = `${chapter.title} — ${chapter.summary || ""} // Scene ${scene.id}`;
}

function goToScene(sceneId) {
  console.log("[BrokeCoder] goToScene() called with:", sceneId);
  const seasonGuess = deriveSeasonFromScene(sceneId);
  if (STORY_SEASONS[seasonGuess]) {
    gameState.seasonKey = seasonGuess;
  }
  const lookup = findScene(sceneId);
  console.log("[BrokeCoder] scene lookup result:", lookup);
  if (!lookup) {
    console.warn("[BrokeCoder] Scene not found, resetting to start");
    gameState = createDefaultState();
    renderHud();
    saveState();
    return;
  }
  gameState.chapterId = lookup.chapter.id;
  gameState.sceneId = sceneId;

  const storyTitle = getStoryForSeason(gameState.seasonKey).title;
  const banner = `${storyTitle} · ${lookup.chapter.title} // ${lookup.scene.id}`;
  if (selectors.gamePlaceholder) selectors.gamePlaceholder.textContent = banner;
  updateSeasonBadge();
  renderHud();
  renderChapterProgress(lookup);
  saveState();
  console.log("[BrokeCoder] calling playScene with:", lookup.scene);
  playScene(lookup.scene);
}

function playScene(scene) {
  console.log("[BrokeCoder] playScene() called with scene:", scene);
  hideDialogue();
  hideLessonOverlay();
  if (!scene) {
    console.warn("[BrokeCoder] playScene called with null/undefined scene");
    return;
  }
  setMode("story");

  const createChoiceHandler = (choice) => () => {
    adjustPhoneEnergy(-1);
    advanceTime(1);
    renderHud();
    if (choice.effects) applyEffects(choice.effects);
    if (choice.lessonId) {
      setMode("story");
      startLesson(choice.lessonId, {
        onComplete: (lesson, result) => {
          if (lesson?.rewards) applyEffects(lesson.rewards);
          if (!gameState.player.completedLessons.includes(lesson?.id)) {
            gameState.player.completedLessons.push(lesson.id);
          }
          const nextId = choice.nextScene || scene.nextScene || getNextSceneId(scene.id);
          if (nextId) goToScene(nextId);
        },
        onCancel: () => {
          const nextId = choice.nextScene || scene.nextScene || getNextSceneId(scene.id);
          if (nextId) goToScene(nextId);
        },
      });
      return;
    }

    const nextId = choice.nextScene || scene.nextScene || getNextSceneId(scene.id);
    if (nextId) goToScene(nextId);
    else hideDialogue();
  };

  if (scene.type === "dialogue" || scene.type === "battle") {
    const choices = (scene.choices || []).map((choice) => ({
      label: choice.label,
      onSelect: createChoiceHandler(choice),
    }));

    if (!choices.length) {
      choices.push({
        label: "Continue",
        onSelect: () => {
          const nextId = scene.nextScene || getNextSceneId(scene.id);
          if (nextId) goToScene(nextId);
          else hideDialogue();
        },
      });
    }

    const battlePrefix = scene.type === "battle" ? "[Battle] " : "";
    console.log("[BrokeCoder] showing dialogue for scene type:", scene.type, "choices:", choices.length);
    showDialogue(scene.character || "charlie", `${battlePrefix}${scene.text}`, choices);
  } else if (scene.type === "lesson") {
    console.log("[BrokeCoder] starting lesson:", scene.lessonId);
    startLesson(scene.lessonId, {
      onComplete: (lesson, result) => {
        if (lesson?.rewards) applyEffects(lesson.rewards);
        if (!gameState.player.completedLessons.includes(scene.lessonId)) {
          gameState.player.completedLessons.push(scene.lessonId);
        }
        goToScene(scene.nextScene || getNextSceneId(scene.id));
      },
      onCancel: () => goToScene(scene.nextScene || getNextSceneId(scene.id)),
    });
  } else {
    console.warn("[BrokeCoder] unknown scene type:", scene.type);
  }
}

function renderLocations() {
  if (!selectors.locationList) return;
  selectors.locationList.innerHTML = "";
  const allowed = unlockedSeasons();

  CITY_CONTENT.locations
    .filter((loc) => allowed.includes(loc.season))
    .forEach((loc) => {
      const card = document.createElement("div");
      card.className = "location-card";
      if (loc.id === gameState.currentLocation) card.classList.add("active");
      card.style.backgroundImage = `url("${loc.image || heroImagePath}")`;
      card.tabIndex = 0;
      card.innerHTML = `
        <h4>${loc.name}</h4>
        <p>${loc.description}</p>
      `;
      const selectLocation = () => {
        gameState.currentLocation = loc.id;
        renderLocations();
        renderMissions(loc.id);
        saveState();
      };
      card.onclick = selectLocation;
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectLocation();
        }
      });
      selectors.locationList.appendChild(card);
    });
}

function renderMissions(locationId = gameState.currentLocation) {
  if (!selectors.missionList) return;
  const quests = questManager.getQuestsForLocation(locationId);
  selectors.missionList.innerHTML = "";

  if (!quests.length) {
    selectors.missionList.innerHTML = `<div class="mission-card"><div class="mission-summary">No quests at this spot yet.</div></div>`;
    return;
  }

  quests.forEach(({ quest, status, activeStepId }) => {
    const card = document.createElement("div");
    card.className = "mission-card";
    const step = activeStepId ? quest.steps.find((s) => s.id === activeStepId) : quest.steps?.[0];
    const headlineCost = describeCost(step?.choices?.[0]?.cost || {});
    const prereqText = describePrereqs(quest);
    const badgeLabel = quest.type === "main" ? `Act ${quest.act} Main` : quest.type === "gig" ? "Repeatable Gig" : "Side Quest";
    const statusLabel = status === "completed" ? "Completed" : status === "active" ? "In Progress" : status === "locked" ? "Locked" : "Available";
    card.innerHTML = `
      <div>
        <h4>${quest.title} <span class="badge">${badgeLabel}</span></h4>
        <div class="mission-summary">${quest.description}</div>
      </div>
      <div class="cost-row">
        <span class="badge">${statusLabel}</span>
        <span>${headlineCost || "See choices for cost"}</span>
      </div>
      <div class="mission-summary">${prereqText || "No prerequisites listed."}</div>
    `;
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = status === "active" ? "Resume Quest" : status === "completed" ? "Replay (repeatable only)" : "Start Quest";
    btn.disabled = status === "locked" || (status === "completed" && !quest.repeatable);
    btn.onclick = () => openQuest(quest.id);
    card.appendChild(btn);
    selectors.missionList.appendChild(card);
  });
}

function buildChoiceMeta(choice = {}) {
  const costs = describeCost(choice.cost || {});
  const risks = choice.risk || choice.failChance ? `Risk: ${choice.risk || `${Math.round((choice.failChance || 0) * 100)}% fail`}` : "";
  const skill = choice.skillCheck ? `Check: ${choice.skillCheck.stat} >= ${choice.skillCheck.threshold}` : "";
  return [costs, skill, risks].filter(Boolean).join(" · ");
}

function openQuest(questId) {
  const status = questManager.getQuestWithStatus(questId);
  if (!status) {
    setStatus("Quest not found.");
    return;
  }
  if (status.status === "locked") {
    setStatus("Quest locked. Meet prerequisites first.");
    return;
  }
  if (status.status === "available" || (status.status === "completed" && status.quest?.repeatable)) {
    const started = questManager.startQuest(questId);
    if (!started.ok) {
      setStatus(started.reason || "Cannot start quest yet.");
      return;
    }
    renderQuestLog();
  }
  presentQuestStep(questId);
}

function presentQuestStep(questId) {
  const data = questManager.getQuestWithStatus(questId);
  if (!data) return;
  const quest = data.quest;
  const activeStepId = getActiveStepForQuest(questId);
  const step = activeStepId ? quest.steps.find((s) => s.id === activeStepId) : quest.steps?.[0];
  if (!step) {
    setStatus("Quest step missing.");
    return;
  }
  const choices = (step.choices || []).map((choice) => ({
    label: choice.label,
    meta: buildChoiceMeta(choice),
    onSelect: () => handleQuestChoice(quest.id, choice),
  }));
  if (!choices.length) {
    setStatus("No choices available.");
    return;
  }
  showDialogue("charlie", `[${quest.title}] ${step.text}`, choices);
}

function handleQuestChoice(questId, choice) {
  const preview = questManager.evaluateChoice(questId, choice.id, Math.random);
  if (!preview.ok) {
    setStatus(preview.reason || "Cannot take that action.");
    return;
  }

  const finish = () => {
    const result = questManager.resolveChoice(questId, choice.id, Math.random);
    if (!result.ok) {
      setStatus(result.reason || "Quest action failed.");
      return;
    }
    maybeLevelUp();
    recalcResourceCaps();
    renderHud();
    renderInventory();
    renderQuestLog();
    renderMissions();
    saveState();
    const outcomeText = result.succeeded ? "Success" : "Setback";
    setStatus(`${outcomeText}: ${choice.label} (${preview.quest?.title || questId})`);
    if (gameState.player.quests.active[questId]) {
      presentQuestStep(questId);
    } else {
      hideDialogue();
    }
  };

  if (choice.lessonId) {
    startLesson(choice.lessonId, {
      onComplete: () => finish(),
      onCancel: () => setStatus("Lesson cancelled."),
    });
    return;
  }

  finish();
}

function renderQuestLog() {
  if (!selectors.questLogList) return;
  const qState = questManager.ensureQuestState(gameState);
  const entries = [];

  Object.keys(qState.active).forEach((questId) => {
    const { quest } = questManager.getQuestWithStatus(questId) || {};
    if (!quest) return;
    const stepId = qState.active[questId].stepId;
    const step = quest.steps?.find((s) => s.id === stepId) || quest.steps?.[0];
    entries.push({
      quest,
      status: "Active",
      detail: step?.text || quest.description,
      cost: describeCost(step?.choices?.[0]?.cost || {}),
    });
  });

  const available = questManager.getAvailableQuests().filter(
    (quest) => !qState.active[quest.id] && !qState.completed.includes(quest.id)
  );
  available.slice(0, 6).forEach((quest) => {
    entries.push({
      quest,
      status: "Available",
      detail: quest.description,
      cost: describeCost(quest.steps?.[0]?.choices?.[0]?.cost || {}),
    });
  });

  const completedMain = (qState.completed || [])
    .map((id) => QUESTS.find((q) => q.id === id))
    .filter((q) => q?.type === "main")
    .slice(-3);
  completedMain.forEach((quest) => {
    entries.push({
      quest,
      status: "Completed",
      detail: quest.description,
      cost: "",
    });
  });

  if (!entries.length) {
    selectors.questLogList.innerHTML = `<div class="mission-summary">No quests yet. Check city locations.</div>`;
    return;
  }

  selectors.questLogList.innerHTML = entries
    .map(
      (entry) => `
      <div class="quest-entry">
        <div class="quest-title">${entry.quest.title} <span class="badge">${entry.status}</span></div>
        <div class="quest-meta">${entry.detail}</div>
        <div class="quest-meta">${entry.cost || describePrereqs(entry.quest) || ""}</div>
      </div>
    `
    )
    .join("");
}

function scaleRewards(rewards = {}, multiplier = 1) {
  const scaled = {};
  ["xp", "money", "morale", "hp"].forEach((key) => {
    if (rewards[key]) scaled[key] = Math.round(rewards[key] * multiplier);
  });
  if (rewards.stats) {
    scaled.stats = {};
    Object.entries(rewards.stats).forEach(([key, val]) => {
      scaled.stats[key] = Math.max(1, Math.round(val * multiplier));
    });
  }
  if (rewards.resources) {
    scaled.resources = {};
    Object.entries(rewards.resources).forEach(([key, val]) => {
      scaled.resources[key] = Math.round(val * multiplier);
    });
  }
  return scaled;
}

function startMission(mission) {
  const details = mission?.id ? mission : getMissionById(mission);
  if (!details) return;
  const phoneCost = details.energyCost || 2;
  if ((gameState.player.phoneEnergy?.current || 0) < phoneCost) {
    setStatus("Phone battery too low for online mission. Charge or rest first.");
    return;
  }
  const canSpend = spendResources(details.cost || {});
  if (!canSpend) {
    setStatus("Not enough Focus / Nerve / Physical energy for that mission.");
    renderHud();
    return;
  }
  adjustPhoneEnergy(-phoneCost);
  advanceTime(1);
  renderHud();
  setMode("city");
  startLesson(details.lessonId, {
    onComplete: (lesson, result) => {
      const repeated = gameState.player.completedMissions.includes(details.id);
      const rewards = scaleRewards(details.rewards || {}, repeated ? 0.5 : 1);
      applyEffects(rewards);
      if (!repeated) gameState.player.completedMissions.push(details.id);
      const stats = result ? ` · ${result.wpm} wpm · ${result.accuracy}% acc` : "";
      setStatus(`Mission complete: ${details.title} — rewards applied${stats}`);
      renderMissions(details.locationId);
      renderShop();
      renderInventory();
      saveState();
    },
    onCancel: () => {
      setStatus("Mission cancelled. Regroup and try again.");
      renderHud();
    },
  });
}

function renderShop() {
  if (!selectors.shopList) return;
  selectors.shopList.innerHTML = "";
  const allowed = unlockedSeasons();

  SHOP_ITEMS.filter((item) => !item.season || allowed.includes(item.season)).forEach((item) => {
    const card = document.createElement("div");
    card.className = "shop-card";
    const owned = item.type === "gear" && gameState.player.gearOwned.includes(item.gearId);
    card.innerHTML = `
      <h4>${item.name}</h4>
      <div class="price">$${item.cost}</div>
      <div class="mission-summary">${item.description}</div>
      <div class="mission-summary">${item.season === "season2" ? "Laptop Era" : "Phone Era"} supply</div>
    `;
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = owned ? "Owned" : `Buy $${item.cost}`;
    btn.disabled = owned || gameState.player.money < item.cost;
    btn.onclick = () => buyItem(item.id);
    card.appendChild(btn);
    selectors.shopList.appendChild(card);
  });
}

function buyItem(itemId) {
  const item = getShopItem(itemId);
  if (!item) return;
  if (item.type === "gear" && gameState.player.gearOwned.includes(item.gearId)) {
    setStatus("You already own that gear.");
    return;
  }
  if (gameState.player.money < item.cost) {
    setStatus("Not enough money yet.");
    return;
  }

  if (item.type === "gear") {
    gameState.player.gearOwned.push(item.gearId);
    const gear = getGearById(item.gearId) || { slot: "device" };
    gameState.player.gear[gear.slot || "device"] = item.gearId;
  } else {
    const existing = gameState.player.inventory.find((it) => it.id === item.id);
    if (existing) existing.qty += 1;
    else gameState.player.inventory.push({ id: item.id, qty: 1 });
  }

  applyEffects({ money: -item.cost, ...(item.effects || {}) });
  setStatus(`${item.name} purchased.`);
  renderInventory();
  renderShop();
}

function renderInventory() {
  if (!selectors.inventoryList) return;
  const nodes = [];
  const gearCards = gameState.player.gearOwned.map((gearId) => {
    const gear = getGearById(gearId) || { name: gearId, slot: "device" };
    const shopMeta = SHOP_ITEMS.find((s) => s.gearId === gearId);
    const equipped = Object.values(gameState.player.gear).includes(gearId);
    const desc = shopMeta?.description || gear.flavor || "Gear upgrade";
    return `
      <div class="inventory-card">
        <h4>${gear.name}</h4>
        <div class="inventory-meta">${desc}</div>
        <div class="inventory-meta">Slot: ${gear.slot}</div>
        <div class="inventory-meta">${equipped ? "Equipped" : "Carried"}</div>
      </div>
    `;
  });

  const itemCards = gameState.player.inventory.map((entry) => {
    const meta = getShopItem(entry.id);
    const label = meta?.name || entry.id;
    const desc = meta?.description || "Usable item";
    const btn = meta?.type === "consumable" ? `<button class="primary-btn" data-use="${entry.id}">Use</button>` : "";
    return `
      <div class="inventory-card">
        <h4>${label}</h4>
        <div class="inventory-meta">${desc}</div>
        <div class="inventory-meta">Qty: ${entry.qty}</div>
        ${btn}
      </div>
    `;
  });

  nodes.push(...gearCards, ...itemCards);
  selectors.inventoryList.innerHTML = nodes.join("") || `<div class="inventory-meta">Your bag is empty. Hit the shop or missions.</div>`;

  selectors.inventoryList.querySelectorAll("[data-use]").forEach((btn) => {
    btn.addEventListener("click", () => useItem(btn.dataset.use));
  });
}

function useItem(itemId) {
  const meta = getShopItem(itemId);
  if (!meta) return;
  const entry = gameState.player.inventory.find((it) => it.id === itemId);
  if (!entry || entry.qty <= 0) return;
  entry.qty -= 1;
  if (entry.qty <= 0) {
    gameState.player.inventory = gameState.player.inventory.filter((it) => it.id !== itemId);
  }
  applyEffects(meta.effects || {});
  setStatus(`${meta.name} consumed.`);
  renderInventory();
}

function regenerateResources() {
  if (!gameState?.player?.resources) return;
  let changed = false;
  Object.values(RESOURCE_CONFIG).forEach((cfg) => {
    const res = gameState.player.resources[cfg.id];
    if (!res) return;
    const next = clamp(res.current + cfg.regen, 0, res.max);
    if (next !== res.current) {
      res.current = next;
      changed = true;
    }
  });
  if (changed) {
    renderHud();
    saveState();
  }
}

function startResourceTicker() {
  if (resourceTicker) clearInterval(resourceTicker);
  resourceTicker = setInterval(regenerateResources, 9000);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startNewGameFlow() {
  console.log("[BrokeCoder] startNewGameFlow() begin");
  showLoadingScreen();
  console.log("[BrokeCoder] loading screen shown");
  updateLoadingProgress(20);
  await sleep(160);
  updateLoadingProgress(55);

  localStorage.removeItem(SAVE_KEY);
  gameState = createDefaultState();
  syncQuestState();
  console.log("[BrokeCoder] game state reset, sceneId:", gameState.sceneId);
  renderHud();
  renderLocations();
  renderMissions();
  renderShop();
  renderInventory();
  setStatus("Booting the Phone Era…");
  showGameScreen("Booting the Phone Era…");
  console.log("[BrokeCoder] game screen shown");
  await sleep(120);
  updateLoadingProgress(85);
  hideLoadingScreen();
  console.log("[BrokeCoder] loading screen hidden, calling goToScene");
  goToScene(gameState.sceneId);
  console.log("[BrokeCoder] startNewGameFlow() complete");
}

async function bootstrapAssets() {
  showLoadingScreen();
  updateLoadingProgress(10);

  try {
    const resolvedHero = await resolveMainImage();
    const chosenHero = resolvedHero || heroImagePath || GAME_MAIN_IMAGE;
    setHeroImage(chosenHero);
    const locationPaths = Object.values(LOCATION_IMAGES);
    const allPaths = [chosenHero, ...CHARACTER_IMAGES.map((c) => c.path), ...locationPaths];
    await preloadImages(allPaths, updateLoadingProgress);
  } catch (error) {
    console.warn("Asset preload skipped", error);
  } finally {
    updateLoadingProgress(100);
    setTimeout(hideLoadingScreen, 240);
  }
}

function renderMmoMeta() {
  renderLocations();
  renderMissions();
  renderShop();
  renderInventory();
  renderQuestLog();
}

async function init() {
  console.log("[BrokeCoder] init() starting");
  console.log("[BrokeCoder] selectors.menuItems:", selectors.menuItems);
  console.log("[BrokeCoder] menuItems count:", selectors.menuItems.length);
  renderHud();
  wireMenuClicks();
  console.log("[BrokeCoder] init() after wireMenuClicks");
  wirePanelCloseButtons();
  initMainMenuKeyboardNavigation();
  wireModeTabs();
  focusMenuIndex(0);

  await bootstrapAssets();
  renderMmoMeta();
  startResourceTicker();
  showTitleScreen();
  console.log("[BrokeCoder] init() complete");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[BrokeCoder] DOMContentLoaded fired");
  setHeroImage(heroImagePath);
  init();
});
