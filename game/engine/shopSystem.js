export class ShopSystem {
  constructor(playerState, statsSystem, inventorySystem) {
    this.player = playerState;
    this.stats = statsSystem;
    this.inventory = inventorySystem;
  }

  buy(item) {
    if (!this.stats.adjustMoney(-item.cost)) {
      return { success: false, reason: "Not enough money" };
    }
    this.inventory.addItem(item);
    return { success: true };
  }
}
