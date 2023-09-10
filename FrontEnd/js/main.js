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

// est ce que user est connecté ?
function connected() {
  let user = sessionStorage.getItem("user");
  user && JSON.parse(user).userId === 1 && adminMode();
}
// si oui, admin mode
function adminMode() {
  const container = document.querySelector(".containerEdit");
  container.classList.add("displayed");

  // pour se deconnecter
  const log = document.querySelector("#log");
  log.innerHTML = "log-out";
  log.setAttribute("href", "#");
  log.addEventListener("click", () => {
    sessionStorage.setItem("user", "");
    window.location.href = "http://localhost:8080/index.html";
  });

  const modifierButtons = document.querySelectorAll(".modifier");
  modifierButtons.forEach((button) => {
    button.style.display = "block";
  });

  // disparition des filtres
  const filtres = document.querySelector(".filtres");
  filtres.style.display = "none";
}
// si projet ajout successfull :
export function projetAjoute(e) {
  console.log("projet ajouté !", JSON.parse(e));
  console.log(works);
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

//  fermer au echap
window.addEventListener("keydown", function (e) {
  console.log("This key : ", e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});
