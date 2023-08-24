const modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modalContent");
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
    });
    // icone deplacer projet
    const move = document.createElement("span");
    move.textContent = "open_with";
    move.classList.add("material-symbols-outlined", "move");
    //
    figure.append(figureImg, figCaption, trash, move);
    gallery.appendChild(figure);
  });
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
export function areYouSure() {
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  let modalContent = document.querySelector(".modalContent");
  let h3ModalContent = modalContent.querySelector("h3");
  h3ModalContent.textContent = "Voulez vous vraiment suprrimer ce projet ?";
  buttonModalContent.textContent = "Oui";
  buttonModalContent.addEventListener("click", () => {
    console.log("oui");
  });
  AModalContent.textContent = "Non";
  AModalContent.addEventListener("click", () => {
    console.log("non");
  });
  gallery.innerHTML = "";
}

export function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}
