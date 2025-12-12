export class InventorySystem {
  constructor(playerState) {
    this.player = playerState;
  }

  addItem(item) {
    this.player.inventory.push(item);
  }

  removeItem(id) {
    const idx = this.player.inventory.findIndex((i) => i.id === id);
    if (idx >= 0) this.player.inventory.splice(idx, 1);
  }

  hasItem(id) {
    return this.player.inventory.some((i) => i.id === id);
  }
}
