const modal = document.querySelector(".modal");
let modalContent = document.querySelector(".modalContent");
let h3ModalContent = modalContent.querySelector("h3");
let buttonModalContent = modalContent.querySelector("button");
let AModalContent = modalContent.querySelector("a");
let gallery = document.querySelector(".modalGallery");

export function displayWorksModal(works) {
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
      /*  delete works[work.id - 1];
      displayWorksModal(works); */
    });
    // deplacer projet icone
    const move = document.createElement("span");
    move.textContent = "open_with";
    move.classList.add("material-symbols-outlined", "move");
    //
    figure.append(figureImg, figCaption, trash, move);
    gallery.appendChild(figure);
  });
}

export function areYouSure() {
  modal.style.display = null;
  modal.setAttribute("aria-hidden", "false");
  let modalContent = document.querySelector(".modalContent");
  let h3ModalContent = modalContent.querySelector("h3");
  h3ModalContent.textContent = "Voulez vous vraiment suprrimer ce projet ?";
}
