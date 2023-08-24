import { getWorks } from "../data/api.js";

let works = [];

let gallery = document.querySelector(".gallery");
export function displayWorks(works) {
  gallery.innerHTML = "";
  works.forEach((work) => {
    gallery.innerHTML += `<figure><img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>
         ${work.title} 
         </figcaption>
         </figure>`;
  });
}

export function displayCategories(categories) {
  let categoryContainer = document.createElement("div");
  categoryContainer.classList.add("categoryContainer");
  gallery.before(categoryContainer);
  // creation button "TOUS"
  let buttonTous = document.createElement("button");
  buttonTous.innerText = "Tous";
  buttonTous.addEventListener("click", async () => {
    works = await getWorks(works);
    displayWorks(works);
  });
  categoryContainer.appendChild(buttonTous);
  // boucle pour les autres buttons
  categories.forEach((category) => {
    let button = document.createElement("button");
    button.innerHTML = category.name;
    button.addEventListener("click", (button) => categoryClicked(button));
    categoryContainer.appendChild(button);
  });
}

// onclick sur categories autre que TOUS
function categoryClicked(category) {
  let thisCategory = category.target.innerText;
  let onlyThisCategory = works.filter(
    (work) => work.category.name === thisCategory
  );
  displayWorks(onlyThisCategory);
}
