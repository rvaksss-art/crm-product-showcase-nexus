const bar = document.querySelector(".portfolio-bar.cinematic-header");
const language = bar.querySelector(".portfolio-language");
const theme = bar.querySelector(".portfolio-theme");
const links = bar.querySelectorAll(".portfolio-arrows a");

function readPreference(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function writePreference(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

let lang = readPreference("portfolio-lang") === "en" ? "en" : "ru";
let light = readPreference("mk-theme") === "light";
function updateHeader() {
  const english = lang === "en";
  language.textContent = lang.toUpperCase();
  language.setAttribute("aria-label", english ? "Switch to Russian" : "Switch to English");
  theme.setAttribute("aria-label", english ? "Switch colour theme" : "Переключить тему");
  theme.setAttribute("aria-pressed", String(light));
  bar.dataset.theme = light ? "light" : "dark";
  links.forEach((link, index) => {
    const destination = link.querySelector("span").textContent;
    const direction = english ? ["Previous", "Next"] : ["Назад", "Вперёд"];
    link.title = direction[index] + ": " + destination;
    link.setAttribute("aria-label", link.title);
  });
}
language.addEventListener("click", () => {
  lang = lang === "en" ? "ru" : "en";
  for (const key of ["portfolio-lang", "mk-lang", "mk-portal-lang"]) writePreference(key, lang);
  updateHeader();
});
theme.addEventListener("click", () => {
  light = !light;
  writePreference("mk-theme", light ? "light" : "dark");
  updateHeader();
});
updateHeader();
