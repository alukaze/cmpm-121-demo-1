import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Beertiful Clicking";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button
const button = document.createElement("button");
button.textContent = "🍻";
button.style.fontSize = "200px";
button.style.padding = "10px 10px";
app.appendChild(button);

// Counter
let beers = 0;
const oneClick = 1;
let autoGen = 0;

const counter = document.createElement("div");
counter.textContent = "Beers: 0";
counter.style.fontSize = "30px";
app.append(counter);

const autoGenDisplay = document.createElement("div");
autoGenDisplay.textContent = "per second: 0";
app.append(autoGenDisplay);

button.addEventListener("click", () => {
  beers += oneClick;
  counter.textContent = "Beers: " + beers;
});

// Upgrade Button
const upgrades = [
  {
    button: createUpgradeButton("Bar", 10, 0.1),
    cost: 10,
    generation: 0.1,
    purchased: 0,
  },
  {
    button: createUpgradeButton("Pub", 100, 2.0),
    cost: 100,
    generation: 2.0,
    purchased: 0,
  },
  {
    button: createUpgradeButton("Brewery", 1000, 50),
    cost: 1000,
    generation: 50,
    purchased: 0,
  },
];

function createUpgradeButton(
  text: string,
  cost: number,
  generation: number,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = `${text}<br>Cost: ${cost}<br>Purchased: 0`;
  button.disabled = true;
  app.appendChild(button);

  button.addEventListener("click", () => {
    if (beers >= cost) {
      beers -= cost;
      cost = Math.round(cost * 1.15 * 100) / 100;
      const upgrade = upgrades.find((upg) => upg.button === button);
      if (upgrade) {
        upgrade.cost = cost;
        upgrade.purchased += 1; // Increment the purchased count
        button.innerHTML = `${text}<br>Cost: ${cost}<br>Purchased: ${upgrade.purchased}`;
      }
      counter.textContent = "Beers: " + beers;
      autoGen += generation;
      unlockUpgrades();
    }
  });

  return button;
}
function unlockUpgrades() {
  upgrades.forEach((upgrade) => {
    upgrade.button.disabled = beers < upgrade.cost;
  });
}

// Continuous Growth
// Check time
let frameTime = performance.now();
const updateCounter = () => {
  // Check time again
  const frame = performance.now();
  // Time elapased between checks
  const deltaTime = (frame - frameTime) / 1000;
  frameTime = frame;

  beers += autoGen * deltaTime;
  counter.textContent = "Beers: " + Math.floor(beers);
  autoGenDisplay.textContent = "Per second: " + autoGen.toFixed(1);

  // Run every frame
  requestAnimationFrame(updateCounter);
  unlockUpgrades();
};
// Start loop
requestAnimationFrame(updateCounter);
