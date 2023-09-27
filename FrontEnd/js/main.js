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
  let user = sessionStorage.getItem("user");
  if (user) {
    let userParsed = JSON.parse(user);
    if (userParsed.userId === 1) {
      adminMode();
    }
  }
};
if (window.location.href !== "http://localhost:8080/login.html") {
  init();
}
function adminMode() {
  // disparition filtre de la gallery
  const filtres = document.querySelector(".filtres");
  filtres.style.display = "none";

  const container = document.querySelector(".containerEdit");
  container.classList.add("displayed");

  const modifierProjets = document.querySelector("#modifierProjets");
  modifierProjets.addEventListener("click", () => {
    modifierProjetModalContent(works, categories);
  });
  // pour se deconnecter
  const log = document.querySelector("#log");
  log.innerHTML = "log-out";
  log.setAttribute("href", "#");
  log.addEventListener("click", () => {
    sessionStorage.setItem("user", "");
    window.location.href = "http://localhost:8080/index.html";
    filtres.style.display = "flex";
  });

  const modifierButtons = document.querySelectorAll(".modifier");
  modifierButtons.forEach((button) => {
    button.style.display = "block";
  });
}

// si projet ajout successfull :
export function projetAjoute(e) {
  let thisWork = JSON.parse(e);
  // le categoryId est un string, pour pouvoir utiliser les filtres, besoin convertion en nombre
  thisWork.categoryId = parseInt(thisWork.categoryId);
  works.push(thisWork);
  displayWorks(works);
}

export function projetSupprime(id) {
  const nouveauxWorks = works.filter((work) => {
    // si l'id est different, on le garde.
    return work.id !== id;
  });
  works = nouveauxWorks;
  displayWorks(works);
  modifierProjetModalContent(works, categories);
}

// MODAL

// mode edition

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
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});
