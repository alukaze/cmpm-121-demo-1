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

const counter = document.createElement('counting');
counter.textContent = "Beers: 0";
app.append(counter);

button.addEventListener("click", () => {
    beers ++;
    counter.textContent = 'Beers: ' + beers;
})

// Auto Counter