import { CHARACTER_IMAGES, getCharacterById } from "./assets.js";

const getNodes = () => ({
  container: document.getElementById("dialogue-container"),
  portrait: document.getElementById("dialogue-portrait"),
  text: document.getElementById("dialogue-text"),
  choices: document.getElementById("dialogue-choices"),
});

export function showDialogue(characterId, text, choices = []) {
  console.log("[DialogueUI] showDialogue called with:", characterId, text, choices);
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
    closeBtn.onclick = () => hideDialogue();
  }

  // Add backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === nodes.container) {
      hideDialogue();
      nodes.container.removeEventListener("click", handleBackdropClick);
    }
  };
  nodes.container.addEventListener("click", handleBackdropClick);

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
  const { container } = getNodes();
  container?.classList.add("hidden");
}

export function isDialogueVisible() {
  const { container } = getNodes();
  return container ? !container.classList.contains("hidden") : false;
}
