export class BattleEngine {
  constructor(playerState, statsSystem, typingEngine, inventorySystem) {
    this.player = playerState;
    this.stats = statsSystem;
    this.typing = typingEngine;
    this.inventory = inventorySystem;
  }

  startBattle(enemy) {
    return {
      enemy: { ...enemy },
      playerHealth: this.player.health,
      log: ["Battle started vs " + enemy.name],
    };
  }

  resolveRound(session, targetText, typedText, durationMs) {
    const typingResult = this.typing.evaluate(targetText, typedText, durationMs);
    const baseDamage = Math.round(typingResult.accuracy * 0.5);
    const crit = Math.random() < typingResult.critChance;
    const playerDamage = crit ? Math.round(baseDamage * 1.5) : baseDamage;
    session.enemy.health -= playerDamage;

    const mistakeDamage = Math.min(25, typingResult.errors * 2);
    if (session.enemy.health > 0 && mistakeDamage > 0) {
      this.stats.takeDamage(mistakeDamage);
      session.playerHealth = this.player.health;
      session.log.push(`Enemy counterattacks for ${mistakeDamage}`);
    }

    const defeated = session.enemy.health <= 0;
    session.log.push(`You dealt ${playerDamage}${crit ? " (crit!)" : ""}. Accuracy ${typingResult.accuracy.toFixed(1)}% WPM ${typingResult.wpm}`);

    if (defeated) {
      session.log.push(`Defeated ${session.enemy.name}!`);
    }

    return { session, typingResult, defeated };
  }
}
