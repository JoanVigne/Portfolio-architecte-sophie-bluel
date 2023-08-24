export function displayWorksModal(works) {
  let modalContent = document.querySelector(".modalContent");
  let h3ModalContent = modalContent.querySelector("h3");
  h3ModalContent.textContent = "Galerie photo";
  let gallery = document.querySelector(".modalGallery");
  gallery.innerHTML = "";
  /*   works.forEach((work) => {
    gallery.innerHTML += `<figure><img src="${work.imageUrl}" alt="${work.title}">
          <figcaption>
           éditer
           </figcaption>
           <span class="material-symbols-outlined trash">
    delete
    </span>
    <span class="material-symbols-outlined move">
    open_with
    </span>
           </figure>`;
  }); */
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
      console.log(`Deleting work item : `, work.title);
      console.log(`Deleting work item : `, work.id);
      delete works[work.id - 1];
      displayWorksModal(works);
    });
    const move = document.createElement("span");
    move.textContent = "open_with";
    move.classList.add("material-symbols-outlined", "move");
    figure.append(figureImg, figCaption, trash, move);
    gallery.appendChild(figure);
  });
}

export function areYouSure() {
  let modalContent = document.querySelector(".modalContent");
  let h3ModalContent = modalContent.querySelector("h3");
  h3ModalContent.textContent = "Voulez vous vraiment suprrimer ce projet ?";
}
