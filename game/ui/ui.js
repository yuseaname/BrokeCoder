import { renderDialogue } from "./dialogueUI.js";
import { createBattleUI } from "./battleUI.js";
import { createShopUI } from "./shopUI.js";
import { InkLessonRunner } from "./inkLessonRunner.js";
import { lessonInk } from "../data/lessons/inkStories.js";

export function initUI(ctx) {
  const { player, stats, inventory, deviceUpgrades, battle, shop, story, saver, enemies, shopInventory, lessons, lessonEngine, typing } = ctx;
  const storyEl = document.getElementById("story");
  const choicesEl = document.getElementById("choices");
  const statsEl = document.getElementById("stats");
  const logEl = document.getElementById("log");
  const battleEl = document.getElementById("battle");
  const shopEl = document.getElementById("shop");
  const typingEl = document.getElementById("typing");

  const log = (line) => {
    logEl.textContent = `${line}\n${logEl.textContent}`.slice(0, 500);
  };

  const battleUI = createBattleUI({ root: battleEl, battleEngine: battle, enemies, log, onVictory: (reward) => {
    stats.gainXP(reward?.xp || 0);
    stats.adjustMoney(reward?.money || 0);
    renderStats();
    log(`Rewards: XP ${reward?.xp || 0} $${reward?.money || 0}`);
  } });
  const shopUI = createShopUI({ root: shopEl, shopSystem: shop, inventory, stats, log });

  function renderStats() {
    statsEl.innerHTML = `HP ${player.health}/${player.maxHealth} · Focus ${player.focus} · $${player.money} · XP ${player.xp} · LV ${player.level}`;
  }

  function renderScene(scene) {
    if (!scene) return;
    renderDialogue(storyEl, scene);
    choicesEl.innerHTML = "";
    shopUI.close();
    battleEl.style.display = scene.encounter ? "block" : "none";
    if (scene.encounter) {
      battleUI.start(scene.encounter.enemyId);
    }
    if (scene.lesson) {
      renderLesson(scene.lesson.id);
    } else {
      typingEl.innerHTML = "";
    }
    scene.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.id === "buy") shopUI.open(shopInventory);
        const res = story.choose(choice.id);
        renderStats();
        res.effects?.forEach(log);
        if (res.next) renderScene(res.next);
      };
      choicesEl.appendChild(btn);
    });
  }

  function difficultyTargets(level) {
    switch (level) {
      case "easy":
        return { accuracy: 80, wpm: 12 };
      case "medium":
        return { accuracy: 88, wpm: 20 };
      case "hard":
        return { accuracy: 92, wpm: 28 };
      case "final":
        return { accuracy: 95, wpm: 32 };
      default:
        return { accuracy: 85, wpm: 15 };
    }
  }

  function renderLesson(lessonId) {
    const lesson = lessons[lessonId];
    if (!lesson) return;
    typingEl.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = `${lesson.title} (Ch ${lesson.chapter})`;
    const meta = document.createElement("div");
    meta.className = "lesson-meta";
    const difficulty = document.createElement("span");
    difficulty.className = "tag";
    difficulty.textContent = `Difficulty: ${lesson.difficulty}`;
    meta.appendChild(difficulty);

    const storyBox = document.createElement("div");
    storyBox.className = "lesson-story";
    const introLine = document.createElement("p");
    introLine.className = "lesson-line";
    introLine.textContent = lesson.story;
    storyBox.appendChild(introLine);

    typingEl.appendChild(title);
    typingEl.appendChild(meta);
    typingEl.appendChild(storyBox);

    const startTypingChallenge = () => {
      storyBox.innerHTML = "";
      const prompt = document.createElement("p");
      prompt.className = "lesson-line";
      prompt.textContent = lesson.text;
      storyBox.appendChild(prompt);

      const input = document.createElement("input");
      input.placeholder = "Type the prompt here to clear the lesson";
      const submit = document.createElement("button");
      submit.textContent = "Complete Lesson";

      let start = performance.now();
      input.onfocus = () => { start = performance.now(); };

      submit.onclick = () => {
        const duration = performance.now() - start;
        const fallback = () => {
          const minutes = Math.max(0.01, duration / 60000);
          const words = input.value.trim().split(/\s+/).filter(Boolean).length;
          const lenDiff = Math.abs(lesson.text.length - input.value.length);
          const accuracy = Math.max(0, 100 - (lenDiff / Math.max(1, lesson.text.length)) * 100);
          return { accuracy, wpm: Math.round(words / minutes), critChance: 0 };
        };
        const result = typeof typing?.evaluate === "function" ? typing.evaluate(lesson.text, input.value, duration) : fallback();
        const targets = difficultyTargets(lesson.difficulty);
        log(`Result: ${result.wpm} WPM, ${result.accuracy.toFixed(1)}% acc, crit ${(result.critChance * 100).toFixed(0)}%`);

        if (result.accuracy >= targets.accuracy && result.wpm >= targets.wpm) {
          const completion = lessonEngine.completeLesson(lesson);
          completion.rewards?.forEach(log);
          renderStats();
          log(`Lesson cleared in ${(duration / 1000).toFixed(1)}s`);
        } else {
          const fail = lesson.fail || {};
          if (fail.focus) stats.adjustFocus(fail.focus);
          if (fail.money) stats.adjustMoney(fail.money);
          renderStats();
          const failNote = fail.note || `Need ${targets.accuracy}% acc & ${targets.wpm} WPM.`;
          log(failNote);
        }
      };

      typingEl.appendChild(input);
      typingEl.appendChild(submit);
      input.focus();
    };

    const inkText = lessonInk[lessonId];
    if (inkText && window.inkjs?.Compiler) {
      const runner = new InkLessonRunner({
        lessonId,
        inkText,
        container: storyBox,
        onComplete: startTypingChallenge,
      });
      runner.render();
    } else {
      const fallback = document.createElement("p");
      fallback.className = "lesson-line";
      fallback.textContent = "Focus choice, then typing challenge.";
      storyBox.appendChild(fallback);
      startTypingChallenge();
    }
  }

  renderStats();
  renderScene(story.current());
}
