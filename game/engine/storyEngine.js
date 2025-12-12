export class StoryEngine {
  constructor(playerState, choiceEngine) {
    this.player = playerState;
    this.choiceEngine = choiceEngine;
    this.currentScene = null;
    this.scenes = {};
  }

  loadScenes(scenes) {
    this.scenes = scenes;
  }

  start(sceneId) {
    this.currentScene = this.scenes[sceneId];
    return this.current();
  }

  current() {
    if (!this.currentScene) return null;
    return {
      id: this.currentScene.id,
      text: this.currentScene.text,
      choices: this.currentScene.choices,
      encounter: this.currentScene.encounter,
      lesson: this.currentScene.lesson,
    };
  }

  choose(optionId) {
    if (!this.currentScene) return { error: "No scene" };
    const choice = this.currentScene.choices.find((c) => c.id === optionId);
    if (!choice) return { error: "Invalid choice" };
    const effects = this.choiceEngine.applyChoice(choice.effects || {});
    const nextId = typeof choice.next === "function" ? choice.next(this.player) : choice.next;
    this.currentScene = this.scenes[nextId] || null;
    return { effects, next: this.current() };
  }
}
