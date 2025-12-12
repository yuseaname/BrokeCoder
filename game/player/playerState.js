export class PlayerState {
  constructor() {
    this.name = "BrokeCoder";
    this.classType = "rookie";
    this.level = 1;
    this.xp = 0;
    this.focus = 100; // ADHD/Focus meter
    this.money = 50;
    this.health = 100;
    this.maxHealth = 100;
    this.deviceTier = 0; // phone -> laptop -> tablet -> PC
    this.inventory = [];
    this.skills = new Set();
    this.storyFlags = new Set();
    this.completedLessons = new Set();
    this.completedQuests = new Set();
  }
}
