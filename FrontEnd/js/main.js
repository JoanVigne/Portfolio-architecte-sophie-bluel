import { getWorks, getCategories } from "../data/api.js";
import { modifierProjetModalContent, closeModal } from "./modal.js";
import { displayWorks, displayCategories } from "./works.js";

let works = [];
let categories = [];

const init = async () => {
  works = await getWorks();
  categories = await getCategories();
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
const modifierProjets = document.querySelector("#modifierProjets");
modifierProjets.addEventListener("click", () => {
  modifierProjetModalContent(works);
});

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  // EVENT SUR CHAQUES MODALS
  modal.addEventListener("click", () => {
    closeModal();
  });
  // STOP PROPAGATION POUR CLICK OK SUR TOUS LES MODALS
  modal.querySelector(".modalContent").addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

/* const modal = document.querySelector(".modal");
modal.addEventListener("click", () => {
  closeModal();
});

// STOP PROPAGATION POUR CLICK OK SUR MODAL
modal.querySelector(".modalContent").addEventListener("click", (e) => {
  e.stopPropagation();
});
 */
// fermer les modals

/* let closes = document.querySelectorAll(".modalContent .close");
closes.forEach((close) => {
  close.addEventListener("click", () => {
    closeModal();
  });
}); */

/* let close = document.querySelector(".modalContent .close");
close.addEventListener("click", () => {
  closeModal();
}); */
//  fermer au echap
window.addEventListener("keydown", function (e) {
  console.log("This key : ", e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});
