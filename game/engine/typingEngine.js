export class TypingEngine {
  evaluate(target, typed, durationMs) {
    const errors = this.#calculateErrors(target, typed);
    const accuracy = Math.max(0, ((target.length - errors) / target.length) * 100);
    const minutes = Math.max(0.01, durationMs / 60000);
    const words = typed.trim().split(/\s+/).filter(Boolean).length;
    const wpm = Math.round(words / minutes);
    const critChance = Math.min(0.6, wpm / 200);
    return { accuracy, wpm, errors, critChance };
  }

  #calculateErrors(target, typed) {
    const maxLen = Math.max(target.length, typed.length);
    let errors = 0;
    for (let i = 0; i < maxLen; i += 1) {
      if (target[i] !== typed[i]) errors += 1;
    }
    return errors;
  }
}
