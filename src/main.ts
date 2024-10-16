import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Beertiful Clicking";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement('button');
button.textContent = '🍺';
document.body.appendChild(button);
