export function modalContent() {
  let figcaptions = document.querySelectorAll(".modalGallery figcaption");
  figcaptions.forEach((figcaption) => {
    figcaption.innerHTML = `éditer`;
  });

  let figures = document.querySelectorAll(".modalGallery figure");
  figures.forEach((figure) => {
    console.log(figures);
    const logoDelete = document.createElement("span");
    logoDelete.classList.add("material-symbols-outlined");
    figure.appendChild(logoDelete);
  });

  let close = document.querySelector(".modalContent .close");
  close.addEventListener("click", () => {
    console.log("close");
  });
}
