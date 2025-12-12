export class StatsSystem {
  constructor(playerState) {
    this.player = playerState;
  }

  gainXP(amount) {
    this.player.xp += amount;
    const needed = this.player.level * 100;
    if (this.player.xp >= needed) {
      this.player.xp -= needed;
      this.player.level += 1;
      this.player.maxHealth += 10;
      this.player.health = this.player.maxHealth;
      return { leveledUp: true };
    }
    return { leveledUp: false };
  }

  adjustFocus(amount) {
    this.player.focus = Math.max(0, Math.min(100, this.player.focus + amount));
    return this.player.focus;
  }

  adjustMoney(amount) {
    const next = this.player.money + amount;
    if (next < 0) return false;
    this.player.money = next;
    return true;
  }

  takeDamage(amount) {
    this.player.health = Math.max(0, this.player.health - amount);
    return this.player.health;
  }
}
