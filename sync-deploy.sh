#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [[ ! -d "deploy" ]]; then
  echo "Missing ./deploy directory" >&2
  exit 1
fi

FILES=(
  "assets.js"
  "dialogueUI.js"
  "gameContent.js"
  "index.html"
  "lessons.js"
  "main.js"
  "questData.js"
  "questManager.js"
  "storyData.js"
  "styles.css"
)

for file in "${FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing ./$file" >&2
    exit 1
  fi
  cp -f "$file" "deploy/$file"
done

echo "Synced ${#FILES[@]} files into ./deploy/"
