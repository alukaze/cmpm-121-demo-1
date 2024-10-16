import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Beertiful Clicking";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button
const button = document.createElement("button");
button.textContent = "🍺";
document.body.appendChild(button);

// Counter
let beers = 0;

const counter = document.createElement("div");
counter.textContent = "Beers: 0";
app.append(counter);

button.addEventListener("click", () => {
  beers++;
  counter.textContent = "Beers: " + beers;
});

// Auto Counter
function autoCount() {
  beers++;
  counter.textContent = "Beers: " + beers;
}
const autoInterval = 5000;
setInterval(autoCount, autoInterval);

// Continuous Growth
// Check time
let frameTime = performance.now();
const updateCounter = () => {
    // Check time again
    const frame = performance.now();
    // Time elapased between checks
    const deltaTime = (frame - frameTime) / 1000;
    frameTime = frame;

    beers += deltaTime;
    counter.textContent = "Beers: " + Math.floor(beers);

    // Run every frame
    requestAnimationFrame(updateCounter);
}
// Start loop 
requestAnimationFrame(updateCounter);