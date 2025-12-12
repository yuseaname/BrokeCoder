export class LessonEngine {
  constructor(playerState, statsSystem) {
    this.player = playerState;
    this.stats = statsSystem;
  }

  completeLesson(lesson) {
    if (this.player.completedLessons.has(lesson.id)) return { repeat: true };
    this.player.completedLessons.add(lesson.id);
    const reward = lesson.rewards || {};
    const res = { repeat: false, rewards: [] };
    if (reward.xp) {
      this.stats.gainXP(reward.xp);
      res.rewards.push(`XP +${reward.xp}`);
    }
    if (reward.money) {
      this.stats.adjustMoney(reward.money);
      res.rewards.push(`Money +${reward.money}`);
    }
    if (reward.focus) {
      this.stats.adjustFocus(reward.focus);
      res.rewards.push(`Focus +${reward.focus}`);
    }
    if (reward.flag) {
      this.player.storyFlags.add(reward.flag);
      res.rewards.push(`Unlocked ${reward.flag}`);
    }
    return res;
  }
}
