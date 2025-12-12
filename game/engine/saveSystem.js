const STORAGE_KEY = "brokeCoderSave";

export class SaveSystem {
  constructor(playerState) {
    this.player = playerState;
  }

  save() {
    const payload = {
      player: this.player,
      ts: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  }

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { loaded: false };
    try {
      const data = JSON.parse(raw);
      Object.assign(this.player, data.player);
      return { loaded: true };
    } catch (e) {
      return { loaded: false, error: e.message };
    }
  }

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
