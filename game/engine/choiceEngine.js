export class ChoiceEngine {
  constructor(playerState, statsSystem, inventorySystem) {
    this.player = playerState;
    this.stats = statsSystem;
    this.inventory = inventorySystem;
  }

  applyChoice(choice) {
    const effects = [];
    if (choice.money) {
      this.stats.adjustMoney(choice.money);
      effects.push(`Money ${choice.money > 0 ? "+" : ""}${choice.money}`);
    }
    if (choice.xp) {
      const leveled = this.stats.gainXP(choice.xp).leveledUp;
      effects.push(`XP +${choice.xp}${leveled ? " (Level Up!)" : ""}`);
    }
    if (choice.focus) {
      this.stats.adjustFocus(choice.focus);
      effects.push(`Focus ${choice.focus > 0 ? "+" : ""}${choice.focus}`);
    }
    if (choice.item) {
      this.inventory.addItem(choice.item);
      effects.push(`Received ${choice.item.name}`);
    }
    if (choice.flag) {
      this.player.storyFlags.add(choice.flag);
      effects.push(`Flag ${choice.flag}`);
    }
    return effects;
  }
}
