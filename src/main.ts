import "./style.css";

// Select the main app container
const app: HTMLDivElement = document.querySelector("#app")!;

// Game title and document setup
const gameTitle = "Beertiful Clicking";
document.title = gameTitle;

// Header setup
const header = document.createElement("h1");
header.innerHTML = gameTitle;
app.append(header);

// Beer button setup
const beerButton = document.createElement("button");
beerButton.textContent = "🍻";
beerButton.style.fontSize = "200px";
beerButton.style.padding = "10px";
app.appendChild(beerButton);

// Counter variables
let beers = 0;
const clickIncrement = 1;
let autoGeneration = 0;

// Beer counter display
const counterDisplay = document.createElement("div");
counterDisplay.textContent = "Beers: 0";
counterDisplay.style.fontSize = "30px";
app.append(counterDisplay);

// Auto-generation rate display
const autoGenDisplay = document.createElement("div");
autoGenDisplay.textContent = "Per second: 0";
app.append(autoGenDisplay);

// Upgrade items with costs and generation rates
const upgradeItems = [
  {
    button: createUpgradeButton("Bar", 10, 0.1, "This is my bar!"),
    baseCost: 10,
    generation: 0.1,
    purchased: 0,
  },
  {
    button: createUpgradeButton("Pub", 100, 2.0, "Welcome to the pub!"),
    baseCost: 100,
    generation: 2.0,
    purchased: 0,
  },
  {
    button: createUpgradeButton("Brewery", 1000, 50, "Freshly brewed!"),
    baseCost: 1000,
    generation: 50,
    purchased: 0,
  },
  {
    button: createUpgradeButton("Winery", 5000, 100, "Fine wines!"),
    baseCost: 5000,
    generation: 100,
    purchased: 0,
  },
  {
    button: createUpgradeButton(
      "Distillery",
      10000,
      1000,
      "Distilled spirits!",
    ),
    baseCost: 10000,
    generation: 1000,
    purchased: 0,
  },
];

// Create an upgrade button with description
function createUpgradeButton(
  text: string,
  cost: number,
  generation: number,
  description: string,
): HTMLButtonElement {
  const button = createButton(text, cost);
  const descriptionDiv = createDescriptionDiv(description);

  app.appendChild(button);
  app.appendChild(descriptionDiv);

  button.addEventListener("click", () =>
    handleUpgradeClick(button, generation),
  );

  return button;
}

// Creates a button with text and cost information
function createButton(text: string, cost: number): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = `${text}<br>Cost: ${cost}<br>Purchased: 0`;
  button.disabled = true;
  return button;
}

// Creates a description div for upgrades
function createDescriptionDiv(description: string): HTMLDivElement {
  const div = document.createElement("div");
  div.textContent = description;
  div.style.fontSize = "15px";
  return div;
}

// Handle clicks on an upgrade button
function handleUpgradeClick(button: HTMLButtonElement, generation: number) {
  const upgrade = upgradeItems.find((upg) => upg.button === button);
  if (upgrade && beers >= upgrade.baseCost) {
    beers -= upgrade.baseCost;
    upgrade.purchased += 1;

    // Increase cost by 15% after each purchase and update auto-generation rate
    upgrade.baseCost = Math.round(upgrade.baseCost * 1.15 * 100) / 100;
    autoGeneration += generation;

    updateUpgradeButton(button, upgrade.baseCost, upgrade.purchased);
    updateUI();
  }
}

// Update upgrade button text to reflect new cost and purchase count
function updateUpgradeButton(
  button: HTMLButtonElement,
  cost: number,
  purchased: number,
) {
  button.innerHTML = `Cost: ${cost}<br>Purchased: ${purchased}`;
}

// Update UI elements for beer count, auto-generation rate, and upgrade button availability
function updateUI() {
  counterDisplay.textContent = "Beers: " + Math.floor(beers);
  autoGenDisplay.textContent = "Per second: " + autoGeneration.toFixed(1);

  upgradeItems.forEach((upgrade) => {
    upgrade.button.disabled = beers < upgrade.baseCost;
  });
}

// Main game loop for auto-generation
let previousFrame = performance.now();
const gameLoop = () => {
  const currentFrame = performance.now();
  const deltaTime = (currentFrame - previousFrame) / 1000;
  previousFrame = currentFrame;

  beers += autoGeneration * deltaTime;
  updateUI();

  requestAnimationFrame(gameLoop);
};

// Beer button click event to manually add beers
beerButton.addEventListener("click", () => {
  beers += clickIncrement;
  updateUI();
});

// Start main game loop
requestAnimationFrame(gameLoop);
