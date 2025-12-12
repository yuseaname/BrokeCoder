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
    nodes.choices.appendChild(btn);
  });

  if (!choices.length) {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = "Continue";
    btn.addEventListener("click", () => hideDialogue());
    nodes.choices.appendChild(btn);
  }

  console.log("[DialogueUI] removing hidden class from container");
  nodes.container.classList.remove("hidden");
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
