import { deleteWork } from "../js/delete.js";
import { getWorks } from "../data/api.js";
import { verifierSiFormEstComplete, submitForm } from "./add.js";

let modalContent = document.querySelector(".modalContent");

let h3ModalContent = modalContent.querySelector("h3");
let formAjouter = document.querySelector(".formAjouter");
let buttonModalContent = modalContent.querySelector("button");

export function modifierProjetModalContent(works, categories) {
  const modalModifier = document.querySelector(".modal1");
  modalModifier.style.display = null;
  modalModifier.setAttribute("aria-hidden", "false");
  let buttonAjouterPhoto = modalContent.querySelector("button");
  buttonAjouterPhoto.addEventListener("click", (works) =>
    ajouterPhotoModalContent(works, categories)
  );
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

// pour enlever la photo preview quand on quitte le modal

async function ajouterPhotoModalContent(works, categories) {
  const modalAjouter = document.querySelector(".modal2");
  modalAjouter.style.display = null;
  modalAjouter.setAttribute("aria-hidden", "false");
  let formAjouter = modalAjouter.querySelector("form");

  // event sur les inputs
  let imgInput = formAjouter.querySelector("#ajouterPhoto");
  imgInput.addEventListener("change", (e) => {
    if (imgInput !== null) {
      verifierSiFormEstComplete();
      // url img preview
      const temporaryUrl = URL.createObjectURL(imgInput.files[0]);
      // display img preview et incorporé l'url
      let previewPhoto = formAjouter.querySelector(".previewPhoto");
      previewPhoto.classList.remove("hiddenPreviewPhoto");
      previewPhoto.setAttribute("src", temporaryUrl);
      let spanLogo = formAjouter.querySelector(".material-symbols-outlined");
      let labelAjouterPhoto = formAjouter.querySelector("#labelAjouterPhoto");
      let smallMax = formAjouter.querySelector("small");
      spanLogo.style.display = "none";
      labelAjouterPhoto.style.display = "none";
      smallMax.style.display = "none";
    }
  });

  let titleInput = formAjouter.querySelector("#title");
  titleInput.addEventListener("change", (e) => {
    if (titleInput.value !== null) {
      verifierSiFormEstComplete();
    }
  });

  // select dans le "ajouter photo" form
  let selectCategorie = formAjouter.querySelector("select");
  selectCategorie.addEventListener("change", (e) => {
    // savoir si une option du select a été choisi
    if (selectCategorie.value !== "") {
      verifierSiFormEstComplete();
    }
  });
  selectCategorie.innerHTML = "";
  let option = document.createElement("option");
  selectCategorie.append(option);
  // boucle pour les categories
  categories.forEach((categorie) => {
    let option = document.createElement("option");
    option.textContent = categorie.name;
    // categorie.id pour BD car id est inchangeable
    option.setAttribute("value", categorie.id);
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
  // submit le form
  let form = modalAjouter.querySelector("form");
  form.addEventListener("submit", submitForm);

  // button close
  let close = modalAjouter.querySelector(".close");
  close.addEventListener("click", () => {
    closeModal();
  });
}

export function closeModal() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });
  // si on est dans le form ajouter projet :
  let previewPhoto = formAjouter.querySelector(".previewPhoto");
  previewPhoto.classList.add("hiddenPreviewPhoto");
  previewPhoto.setAttribute("src", "");
  let spanLogo = formAjouter.querySelector(".material-symbols-outlined");
  let labelAjouterPhoto = formAjouter.querySelector("#labelAjouterPhoto");
  let smallMax = formAjouter.querySelector("small");
  spanLogo.style.display = "";
  labelAjouterPhoto.style.display = "";
  smallMax.style.display = "";
}
