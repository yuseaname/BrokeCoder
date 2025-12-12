/broke-coder-b3
    /typing-engine        ← handles WPM, accuracy, typing challenges
    /story-engine         ← handles missions, choices, branching paths
    /game-ui              ← handles UI (fake browser, inventory, shop)

    Game Flow:
    1. UI loads mission
    2. Story sends a challenge request
    3. UI opens typing engine module
    4. Player completes typing task
    5. Story updates state (coins, items, paths)
