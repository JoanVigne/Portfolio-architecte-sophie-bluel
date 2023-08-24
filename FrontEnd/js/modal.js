import { deleteWork } from "../js/delete.js";
import { getWorks, getCategories } from "../data/api.js";
import { displayWorks } from "./works.js";

let works = [];
let categories = [];

const modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modalContent");
let backModalContent = modalContent.querySelector(".back");
let h3ModalContent = modalContent.querySelector("h3");
let buttonModalContent = modalContent.querySelector("button");
let AModalContent = modalContent.querySelector("a");
let gallery = document.querySelector(".modalGallery");

export function modifierProjetModalContent(works) {
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  h3ModalContent.textContent = "Galerie photo";
  buttonModalContent.textContent = "Ajouter une photo";
  AModalContent.textContent = "Supprimer la gallerie";
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
}

// avant de supprimer un element, confirmation
export function areYouSure(workId) {
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  let modalContent = document.querySelector(".modalContent");
  let h3ModalContent = modalContent.querySelector("h3");
  h3ModalContent.textContent = "Voulez-vous vraiment supprimer ce projet ?";
  buttonModalContent.textContent = "Oui";

  async function yes() {
    console.log("oui");
    await deleteWork(workId);
    // enlève le projet de la gallery du modal modify et de la gallery
    buttonModalContent.removeEventListener("click", yes);
    AModalContent.removeEventListener("click", no);
    works = await getWorks(works);
    modifierProjetModalContent(works);
    displayWorks(works);
  }

  buttonModalContent.addEventListener("click", yes);

  async function no() {
    console.log("non");
    // retour à la modal gallery modify
    buttonModalContent.removeEventListener("click", yes);
    AModalContent.removeEventListener("click", no);
    works = await getWorks(works);
    modifierProjetModalContent(works);
  }

  AModalContent.textContent = "Non";
  AModalContent.addEventListener("click", no);

  gallery.innerHTML = "";
}

// page login si mauvais email ou password
export function modalerreur(textError) {
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  h3ModalContent.textContent = textError;
  buttonModalContent.textContent = "Okay";
  AModalContent.textContent = "";
  gallery.innerHTML = "";
  buttonModalContent.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });
}

function ajouterPhotoModalContent() {
  // creation du form :
  let formAjouter = document.createElement("form");
  let apercuPhoto = document.createElement("img");
  let inputAjouterPhoto = document.createElement("input");
  let infoPhoto = (document.createElement("p").innerText =
    "jpg, png : 4mo max");
  let labelTitre = (document.createElement("label").textContent = "Titre");
  let inputTitre = document.createElement("input");
  const getthem = async () => {
    works = await getWorks(works);
    getCategories(works);
  };
  getthem();
  let labelCategorie = (document.createElement("label").textContent =
    "Catégorie");
  let selectCategorie = document.createElement("select");
  categories.forEach((categorie) => {
    let option = document.createElement("option");
    option.textContent = categorie;
    option.setAttribute("value", categorie);
    selectCategorie.append(option);
  });
  formAjouter.append(
    apercuPhoto,
    inputAjouterPhoto,
    infoPhoto,
    labelTitre,
    inputTitre,
    labelCategorie,
    selectCategorie
  );
  // insertion du form
  h3ModalContent.insertAdjacentElement("afterend", formAjouter);

  backModalContent.style.visibility = "visible";
  backModalContent.addEventListener("click", async () => {
    works = await getWorks(works);
    modifierProjetModalContent(works);
  });
  h3ModalContent.textContent = "Ajouter photo";
  gallery.innerHTML = "";
  buttonModalContent.textContent = "Valider";
  AModalContent.textContent = "";
}

export function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}
