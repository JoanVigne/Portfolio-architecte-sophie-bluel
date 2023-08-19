export function displayWorksModal(works) {
  let gallery = document.querySelector(".modalGallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
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
  });
}

export function modalContent() {
  const modal = document.querySelector(".modal");
  let close = document.querySelector(".modalContent .close");
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("keydown", function (e) {
    console.log("This key : ", e.key);
    if (e.key === "Escape" || e.key === "Esc") {
      modal.style.display = "none";
    }
  });
}
