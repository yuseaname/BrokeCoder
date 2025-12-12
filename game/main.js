import { PlayerState } from "./player/playerState.js";
import { skillTree } from "./player/skillTree.js";
import { StatsSystem } from "./engine/statsSystem.js";
import { InventorySystem } from "./engine/inventorySystem.js";
import { DeviceUpgradeSystem } from "./engine/deviceUpgradeSystem.js";
import { TypingEngine } from "./engine/typingEngine.js";
import { BattleEngine } from "./engine/battleEngine.js";
import { ChoiceEngine } from "./engine/choiceEngine.js";
import { LessonEngine } from "./engine/lessonEngine.js";
import { ShopSystem } from "./engine/shopSystem.js";
import { StoryEngine } from "./engine/storyEngine.js";
import { SaveSystem } from "./engine/saveSystem.js";
import scenes from "./data/scenes/season1.js";
import { enemies } from "./data/enemies/list.js";
import { devices } from "./data/devices/list.js";
import { shopInventory } from "./data/items/shopInventory.js";
import { lessons as lessonData } from "./data/lessons/season1.js";
import { initUI } from "./ui/ui.js";

const player = new PlayerState();
const stats = new StatsSystem(player);
const inventory = new InventorySystem(player);
const deviceUpgrades = new DeviceUpgradeSystem(player, devices);
const typing = new TypingEngine();
const battle = new BattleEngine(player, stats, typing, inventory);
const choice = new ChoiceEngine(player, stats, inventory);
const lessonEngine = new LessonEngine(player, stats);
const shop = new ShopSystem(player, stats, inventory);
const story = new StoryEngine(player, choice);
const saver = new SaveSystem(player);

story.loadScenes(scenes);
story.start("wakeUpMotel");

initUI({
  player,
  stats,
  inventory,
  deviceUpgrades,
  typing,
  battle,
  choice,
  lessons: lessonData,
  lessonEngine,
  shop,
  story,
  saver,
  skillTree,
  enemies,
  shopInventory,
});
