export function createShopUI({ root, shopSystem, inventory, stats, log }) {
  root.innerHTML = "<h3>Alley Shop</h3>";
  const list = document.createElement("div");
  root.appendChild(list);
  root.style.display = "none";

  function render(items) {
    list.innerHTML = "";
    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.textContent = `${item.name} - $${item.cost}`;
      btn.onclick = () => {
        const result = shopSystem.buy(item);
        if (!result.success) {
          log("Too broke for that.");
        } else {
          log(`Bought ${item.name}`);
          if (item.effect?.focus) stats.adjustFocus(item.effect.focus);
          if (item.effect?.xp) stats.gainXP(item.effect.xp);
          inventory.addItem(item);
          render(items);
        }
      };
      list.appendChild(btn);
    });
  }

  return {
    open(items) {
      render(items);
      root.style.display = "block";
    },
    close() {
      root.style.display = "none";
    },
  };
}
