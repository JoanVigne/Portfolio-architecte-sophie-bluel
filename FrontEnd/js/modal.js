import { deleteWork } from "../js/delete.js";
import { getWorks, getCategories } from "../data/api.js";
import { displayWorks } from "./works.js";

let works = [];
let categories = [];

const modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modalContent");

let h3ModalContent = modalContent.querySelector("h3");
let formAjouter = document.querySelector(".formAjouter");
let buttonModalContent = modalContent.querySelector("button");
let AModalContent = modalContent.querySelector("a");
let gallery = document.querySelector(".modalGallery");

export function modifierProjetModalContent(works) {
  const modalModifier = document.querySelector(".modal1");
  modalModifier.style.display = null;
  modalModifier.setAttribute("aria-hidden", "false");
  let buttonAjouterPhoto = modalContent.querySelector("button");
  buttonAjouterPhoto.addEventListener("click", ajouterPhotoModalContent);
  let gallery = document.querySelector(".modalGallery");
  gallery.innerHTML = "";
  // boucle pour display chaque travaux
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const figureImg = document.createElement("img");
    figureImg.setAttribute("src", work.imageUrl);
    figureImg.setAttribute("alt", work.title);
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = "éditer";
    const trash = document.createElement("span");
    trash.textContent = "delete";
    trash.classList.add("material-symbols-outlined", "trash");
    // DELETE UN PROJET
    trash.addEventListener("click", (e) => {
      console.log(`Deleting work item named  `, work.title);
      console.log(`Deleting work item : `, work.id);
      areYouSure(work.id);
    });
    // icone deplacer projet non fonctionnelle POUR LE MOMENT ??????
    const move = document.createElement("span");
    move.textContent = "open_with";
    move.classList.add("material-symbols-outlined", "move");
    //
    figure.append(figureImg, figCaption, trash, move);
    gallery.appendChild(figure);
  });
  let close = modalModifier.querySelector(".close");
  close.addEventListener("click", () => {
    modalModifier.style.display = "none";
    modalModifier.setAttribute("aria-hidden", "true");
  });
}

// avant de supprimer un element, confirmation
export function areYouSure(workId) {
  const modalAreYouSure = document.querySelector(".modal3");
  modalAreYouSure.style.display = null;
  modalAreYouSure.setAttribute("aria-hidden", "false");
  const buttonOui = modalAreYouSure.querySelectorAll("button")[0];
  buttonOui.addEventListener("click", yes);
  async function yes() {
    await deleteWork(workId);
    works = await getWorks();
    modifierProjetModalContent(works);
    displayWorks(works);
    modalAreYouSure.style.display = "none";
    modalAreYouSure.setAttribute("aria-hidden", "true");
  }
  const buttonNon = modalAreYouSure.querySelectorAll("button")[1];
  buttonNon.addEventListener("click", no);
  function no() {
    modalAreYouSure.style.display = "none";
    modalAreYouSure.setAttribute("aria-hidden", "true");
  }
}

// page login si mauvais email ou password
export function modalerreur(textError) {
  const modalErreur = document.querySelector(".modal4");
  modalErreur.style.display = null;
  modalErreur.setAttribute("aria-hidden", "false");
  h3ModalContent.textContent = textError;
  buttonModalContent.addEventListener("click", () => {
    modalErreur.style.display = "none";
    modalErreur.setAttribute("aria-hidden", "true");
  });
}

async function ajouterPhotoModalContent() {
  const modalAjouter = document.querySelector(".modal2");
  modalAjouter.style.display = null;
  modalAjouter.setAttribute("aria-hidden", "false");
  let formAjouter = modalAjouter.querySelector("form");
  works = await getWorks();
  categories = await getCategories();

  // select
  let selectCategorie = formAjouter.querySelector("select");
  selectCategorie.innerHTML = "";
  let option = document.createElement("option");
  selectCategorie.append(option);
  // boucle pour les categories
  categories.forEach((categorie) => {
    let option = document.createElement("option");
    option.textContent = categorie.name;
    option.setAttribute("value", categorie);
    selectCategorie.append(option);
  });

  // button back
  let backModalContent = modalAjouter.querySelector(".back");
  backModalContent.style.visibility = "visible";
  backModalContent.addEventListener("click", async () => {
    backModalContent.style.visibility = "hidden";
    modalAjouter.style.display = "none";
    modalAjouter.setAttribute("aria-hidden", "true");
    works = await getWorks();
    modifierProjetModalContent(works);
  });
  //
  /* let buttonValider = modalAjouter.querySelector("button");
  buttonValider.addEventListener("submit", (e) => {
    e.preventDefault;
    console.log("form valider");
  }); */

  // button close
  let close = modalAjouter.querySelector(".close");
  close.addEventListener("click", () => {
    modalAjouter.style.display = "none";
    modalAjouter.setAttribute("aria-hidden", "true");
  });
}

export function closeModal() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });
}
