export const skillTree = {
  hacking: {
    id: "hacking",
    name: "Chaotic Hacker",
    perks: [
      { id: "critFocus", name: "Crit Focus", desc: "Gain crit chance when focus is above 60.", cost: 1 },
      { id: "fastFingers", name: "Fast Fingers", desc: "Small WPM boost in battles.", cost: 1 },
    ],
  },
  halfAsser: {
    id: "halfAsser",
    name: "Half-Asser",
    perks: [
      { id: "coffeeShield", name: "Coffee Shield", desc: "Reduce damage from mistakes by 10%.", cost: 1 },
    ],
  },
  designer: {
    id: "designer",
    name: "Web Designer",
    perks: [
      { id: "cssFlair", name: "CSS Flair", desc: "Extra XP from design lessons.", cost: 1 },
    ],
  },
  programmer: {
    id: "programmer",
    name: "Full Programmer",
    perks: [
      { id: "syntaxSensei", name: "Syntax Sensei", desc: "Reduce focus loss in lessons.", cost: 1 },
    ],
  },
};

export function unlockSkill(playerState, perkId) {
  if (playerState.skills.has(perkId)) return false;
  playerState.skills.add(perkId);
  return true;
}
