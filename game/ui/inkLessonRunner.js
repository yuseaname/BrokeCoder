export class InkLessonRunner {
  constructor({ lessonId, inkText, container, onComplete }) {
    this.lessonId = lessonId;
    this.inkText = inkText;
    this.container = container;
    this.onComplete = onComplete;
    this.story = null;
    this.finished = false;
    this.compiler = window.inkjs?.Compiler;
  }

  compile() {
    if (!this.compiler || !this.inkText) return false;
    try {
      this.story = new this.compiler(this.inkText).Compile();
      return true;
    } catch (error) {
      console.warn(`Ink compile failed for ${this.lessonId}`, error);
      return false;
    }
  }

  render() {
    if (!this.compile()) {
      this.finish();
      return;
    }
    this.advance();
  }

  advance(choiceIndex = null) {
    if (!this.story || this.finished) return;
    if (choiceIndex !== null) {
      this.story.ChooseChoiceIndex(choiceIndex);
    }

    const text = this.story.ContinueMaximally().trim();
    this.container.innerHTML = "";

    if (text) {
      text.split(/\n+/).forEach((line) => {
        const p = document.createElement("p");
        p.className = "lesson-line";
        p.textContent = line;
        this.container.appendChild(p);
      });
    }

    if (this.story.currentChoices.length) {
      const choiceWrap = document.createElement("div");
      choiceWrap.className = "lesson-choices";
      this.story.currentChoices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.className = "choice story-choice";
        btn.textContent = choice.text;
        btn.onclick = () => this.advance(choice.index);
        choiceWrap.appendChild(btn);
      });
      this.container.appendChild(choiceWrap);
      return;
    }

    if (!this.story.canContinue) {
      this.finish();
    }
  }

  finish() {
    if (this.finished) return;
    this.finished = true;
    this.container.innerHTML = "";
    if (typeof this.onComplete === "function") this.onComplete();
  }
}
