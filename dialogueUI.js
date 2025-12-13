import { CHARACTER_IMAGES, getCharacterById } from "./assets.js";

const getNodes = () => ({
  container: document.getElementById("dialogue-container"),
  portrait: document.getElementById("dialogue-portrait"),
  text: document.getElementById("dialogue-text"),
  choices: document.getElementById("dialogue-choices"),
});

let lastDialogue = null;
let reopenWired = false;
let backdropClickHandler = null;

function getReopenButton() {
  return document.getElementById("dialogue-reopen");
}

function setReopenVisible(visible) {
  const btn = getReopenButton();
  if (!btn) return;
  btn.classList.toggle("hidden", !visible);
}

function wireReopenButton() {
  if (reopenWired) return;
  const btn = getReopenButton();
  if (!btn) return;
  btn.addEventListener("click", () => restoreDialogue());
  reopenWired = true;
}

export function showDialogue(characterId, text, choices = []) {
  console.log("[DialogueUI] showDialogue called with:", characterId, text, choices);
  wireReopenButton();
  lastDialogue = { characterId, text, choices };
  setReopenVisible(false);

  const nodes = getNodes();
  console.log("[DialogueUI] nodes:", nodes);
  if (!nodes.container || !nodes.text || !nodes.choices) {
    console.error("[DialogueUI] Missing dialogue nodes!");
    return;
  }

  const character = getCharacterById(characterId) || CHARACTER_IMAGES[0] || null;
  if (nodes.portrait && character) {
    nodes.portrait.src = character.path;
    nodes.portrait.alt = character.name || "Character portrait";
    nodes.portrait.classList.remove("hidden");
  }

  nodes.text.textContent = text;
  nodes.choices.innerHTML = "";

  let firstChoice = null;
  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;
    if (choice.meta) {
      const meta = document.createElement("span");
      meta.className = "choice-meta";
      meta.textContent = choice.meta;
      btn.appendChild(meta);
    }
    btn.addEventListener("click", () => {
      if (choice.onSelect) choice.onSelect();
    });
    if (!firstChoice) firstChoice = btn;
    nodes.choices.appendChild(btn);
  });

  if (!choices.length) {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = "Continue";
    btn.addEventListener("click", () => hideDialogue());
    firstChoice = btn;
    nodes.choices.appendChild(btn);
  }

  // Add close button handler
  const closeBtn = document.getElementById("dialogue-close");
  if (closeBtn) {
    closeBtn.onclick = () => minimizeDialogue();
  }

  // Add backdrop click handler
  if (backdropClickHandler) {
    nodes.container.removeEventListener("click", backdropClickHandler);
  }
  backdropClickHandler = (e) => {
    if (e.target === nodes.container) {
      minimizeDialogue();
    }
  };
  nodes.container.addEventListener("click", backdropClickHandler);

  console.log("[DialogueUI] removing hidden class from container");
  nodes.container.classList.remove("hidden");
  try {
    // Keep the choice UI on-screen even when the mission list is long.
    nodes.container.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (err) {
    console.debug("[DialogueUI] scrollIntoView failed", err);
  }
  if (firstChoice) {
    try {
      firstChoice.focus({ preventScroll: true });
    } catch (err) {
      // ignore focus errors in older runtimes
    }
  }
  console.log("[DialogueUI] container classes after:", nodes.container.className);
}

export function hideDialogue() {
  lastDialogue = null;
  setReopenVisible(false);
  const { container } = getNodes();
  container?.classList.add("hidden");
}

export function minimizeDialogue() {
  const { container } = getNodes();
  container?.classList.add("hidden");
  setReopenVisible(Boolean(lastDialogue));
}

export function restoreDialogue() {
  if (!lastDialogue) return;
  const { characterId, text, choices } = lastDialogue;
  showDialogue(characterId, text, choices);
}

export function isDialogueVisible() {
  const { container } = getNodes();
  return container ? !container.classList.contains("hidden") : false;
}
