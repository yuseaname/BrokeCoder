export function renderDialogue(root, scene) {
  root.innerHTML = "";
  const text = document.createElement("p");
  text.textContent = scene?.text || "";
  root.appendChild(text);
}
