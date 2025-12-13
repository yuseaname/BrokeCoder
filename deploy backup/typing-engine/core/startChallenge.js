/**
 * Minimal typing challenge wrapper used by the in-browser lessons overlay.
 * Computes WPM / accuracy / errors and returns results through a callback.
 *
 * @param {string} text - target text to type
 * @param {number} durationMs - time limit in ms
 * @param {(result: { wpm: number, accuracy: number, errors: number, elapsedMs: number, timedOut: boolean, typed: string }) => void} callback
 * @returns {{ submit: (typed: string) => void, cancel: () => void }}
 */
export function startChallenge(text, durationMs = 60000, callback = () => {}) {
    const target = (text || "").trim();
    const state = {
        startedAt: Date.now(),
        finished: false,
        timer: null,
    };

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    const finalize = (typed, timedOut = false) => {
        if (state.finished) return;
        state.finished = true;
        if (state.timer) clearTimeout(state.timer);

        const doneAt = Date.now();
        const elapsedMs = Math.max(1, doneAt - state.startedAt);
        const elapsedMinutes = elapsedMs / 1000 / 60;
        const typedClean = (typed || "").trim();

        const maxLen = Math.max(target.length, typedClean.length, 1);
        let correct = 0;
        for (let i = 0; i < Math.min(target.length, typedClean.length); i += 1) {
            if (target[i] === typedClean[i]) correct += 1;
        }
        const errors = maxLen - correct;
        const accuracy = clamp(Math.round((correct / maxLen) * 100), 0, 100);
        const words = typedClean.length ? typedClean.split(/\\s+/).length : 0;
        const wpm = Math.round(words / elapsedMinutes);

        callback({
            wpm,
            accuracy,
            errors,
            elapsedMs,
            timedOut,
            typed: typedClean,
        });
    };

    if (durationMs > 0) {
        state.timer = setTimeout(() => finalize("", true), durationMs);
    }

    return {
        submit: (typed) => finalize(typed, false),
        cancel: () => {
            if (state.finished) return;
            state.finished = true;
            if (state.timer) clearTimeout(state.timer);
        },
    };
}
