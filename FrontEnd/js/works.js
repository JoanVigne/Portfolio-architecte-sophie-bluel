export function displayWorks(works) {
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
