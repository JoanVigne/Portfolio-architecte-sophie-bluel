import { deleteWork } from "../js/delete.js";
import { getWorks, getCategories } from "../data/api.js";
import { displayWorks } from "./works.js";

let works = [];
let categories = [];

const modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modalContent");
let backModalContent = modalContent.querySelector(".back");
let h3ModalContent = modalContent.querySelector("h3");
let formAjouter = document.querySelector(".formAjouter");
let buttonModalContent = modalContent.querySelector("button");
let AModalContent = modalContent.querySelector("a");
let gallery = document.querySelector(".modalGallery");

export function modifierProjetModalContent(works) {
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  h3ModalContent.textContent = "Galerie photo";
  buttonModalContent.textContent = "Ajouter une photo";
  buttonModalContent.addEventListener("click", ajouterPhotoModalContent);
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
  /*   let modalContent = document.querySelector(".modalContent"); */
  /*   let h3ModalContent = modalContent.querySelector("h3"); */
  h3ModalContent.textContent = "Voulez-vous vraiment supprimer ce projet ?";
  buttonModalContent.textContent = "Oui";

  async function yes() {
    console.log("oui");
    await deleteWork(workId);
    // enlève le projet de la gallery du modal modify et de la gallery
    buttonModalContent.removeEventListener("click", yes);
    AModalContent.removeEventListener("click", no);
    works = await getWorks();
    modifierProjetModalContent(works);
    displayWorks(works);
  }
  buttonModalContent.addEventListener("click", yes);

  AModalContent.textContent = "Non";
  async function no() {
    console.log("non");
    // retour à la modal gallery modify
    buttonModalContent.removeEventListener("click", yes);
    AModalContent.removeEventListener("click", no);
    works = await getWorks();
    modifierProjetModalContent(works);
  }
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

async function ajouterPhotoModalContent() {
  // creation du form :
  formAjouter.style.display = "flex";
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
  backModalContent.style.visibility = "visible";
  backModalContent.addEventListener("click", async () => {
    backModalContent.style.visibility = "hidden";
    formAjouter.style.display = "none";
    works = await getWorks();
    modifierProjetModalContent(works);
  });
  //
  h3ModalContent.textContent = "Ajouter photo";
  gallery.innerHTML = "";
  buttonModalContent.textContent = "Valider";
  AModalContent.textContent = "";
  // button close
  let close = modal.querySelector(".close");
  close.addEventListener("click", () => {
    formAjouter.style.display = "none";
  });
}

export function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // si ajouterPhoto =>
  backModalContent.style.visibility = "hidden";
  if (formAjouter !== null) {
    formAjouter.style.display = "none";
  }
}
