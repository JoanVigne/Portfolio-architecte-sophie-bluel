import { getWorks, getCategories } from "../data/api.js";
import { modifierProjetModalContent, closeModal } from "./modal.js";
import { displayWorks, displayCategories } from "./works.js";

let works = [];
let categories = [];

const init = async () => {
  works = await getWorks(works);
  categories = await getCategories(categories);
  displayWorks(works); // display les travaux dans les div "gallery"
  displayCategories(categories); // display les categories
  connected(); // user connected ? display la modification
};
init();

function connected() {
  let user = sessionStorage.getItem("user");
  user && JSON.parse(user).userId === 1 && displayModify();
}

function displayModify() {
  const container = document.querySelector(".containerEdit");
  container.classList.add("displayed");

  const modifierButtons = document.querySelectorAll(".modifier");
  modifierButtons.forEach((button) => {
    button.style.display = "block";
  });
}

// MODAL

// mode edition
const modal = document.querySelector(".modal");

const modifierProjets = document.querySelector("#modifierProjets");

modifierProjets.addEventListener("click", () => {
  modifierProjetModalContent(works);
});

modal.addEventListener("click", () => {
  closeModal();
});

// STOP PROPAGATION POUR CLICK OK SUR MODAL
modal.querySelector(".modalContent").addEventListener("click", (e) => {
  e.stopPropagation();
});

// fermer les modals
let close = document.querySelector(".modalContent .close");
close.addEventListener("click", () => {
  closeModal();
});
//  fermer au echap
window.addEventListener("keydown", function (e) {
  console.log("This key : ", e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});
