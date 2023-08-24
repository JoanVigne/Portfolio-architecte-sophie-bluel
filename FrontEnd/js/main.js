import { getWorks, getCategories } from "../data/api.js";
import { displayWorksModal } from "./modal.js";

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

function displayWorks(works) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
    gallery.innerHTML += `<figure><img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>
       ${work.title} 
       </figcaption>
       </figure>`;
  });
}

function displayCategories(categories) {
  let gallery = document.querySelector(".gallery");
  let categoryContainer = document.createElement("div");
  categoryContainer.classList.add("categoryContainer");
  gallery.before(categoryContainer);
  // creation button "TOUS"
  let buttonTous = document.createElement("button");
  buttonTous.innerText = "Tous";
  buttonTous.addEventListener("click", async () => {
    works = await getWorks(works);
    displayWorks(works);
  });
  categoryContainer.appendChild(buttonTous);
  // boucle pour les autres buttons
  categories.forEach((category) => {
    let button = document.createElement("button");
    button.innerHTML = category.name;
    button.addEventListener("click", (button) => categoryClicked(button));
    categoryContainer.appendChild(button);
  });
}

// onclick sur categories autre que TOUS
function categoryClicked(category) {
  let thisCategory = category.target.innerText;
  let onlyThisCategory = works.filter(
    (work) => work.category.name === thisCategory
  );
  displayWorks(onlyThisCategory);
}

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
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  displayWorksModal(works);
  modalContent();
});

modal.addEventListener("click", () => {
  /*   modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true"); */
  closeModal();
});

// fermer le modal

// STOP PROPAGATION POUR CLICK OK SUR MODAL
modal.querySelector(".modalContent").addEventListener("click", (e) => {
  e.stopPropagation();
});

function modalContent() {
  // changement du HTML
  const modal = document.querySelector(".modal");
  modal.setAttribute("aria-hidden", "true");
  // fermer la modale avec la croix
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
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  /*  displayWorks(works); */ // display les travaux dans la div "gallery"
}
