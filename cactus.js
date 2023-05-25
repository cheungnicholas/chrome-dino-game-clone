import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500; //how long it takes to summon a cactus
const CACTUS_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll("[data-cactus").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale;
  }
  nextCactusTime -= delta;
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true; //help select all cactuses
  cactus.src = "imgs/cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElem.append(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); //get random number between 0 and 1 and make sure fall between our max & min range
}
