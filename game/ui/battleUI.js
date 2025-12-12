const prompts = [
  "const focus = stayCalm();",
  "<div class='raccoon-boss'></div>",
  "sudo npm install hope",
  "function hustle(){return true;}"
];

export function createBattleUI({ root, battleEngine, enemies, onVictory, log }) {
  let session = null;
  let enemy = null;
  let startTime = 0;
  const targetEl = document.createElement("div");
  const input = document.createElement("input");
  const submit = document.createElement("button");
  submit.textContent = "Type Attack";
  root.innerHTML = "";
  root.appendChild(targetEl);
  root.appendChild(input);
  root.appendChild(submit);

  function refreshPrompt() {
    const text = prompts[Math.floor(Math.random() * prompts.length)];
    targetEl.textContent = text;
    input.value = "";
    startTime = performance.now();
    return text;
  }

  submit.onclick = () => {
    if (!session || !enemy) return;
    const targetText = targetEl.textContent;
    const duration = performance.now() - startTime;
    const { defeated } = battleEngine.resolveRound(session, targetText, input.value, duration);
    log(session.log.join("\n"));
    session.log.length = 0;
    if (defeated) {
      onVictory(enemy.reward);
      root.style.display = "none";
    } else {
      refreshPrompt();
    }
  };

  return {
    start(enemyId) {
      enemy = { ...enemies[enemyId], health: enemies[enemyId].health };
      session = battleEngine.startBattle(enemy);
      root.style.display = "block";
      refreshPrompt();
      log(`Encounter: ${enemy.name}`);
    },
  };
}
