export function displayCategories(categories) {
  let gallery = document.querySelector(".gallery");
  let categoryContainer = document.createElement("div");
  categoryContainer.classList.add("categoryContainer");
  gallery.before(categoryContainer);
  // creation button "TOUS"
  let buttonTous = document.createElement("button");
  buttonTous.innerText = "Tous";
  categoryContainer.appendChild(buttonTous);
  // boucle our les autres buttons
  categories.forEach((category) => {
    let button = document.createElement("button");
    button.innerHTML = category.name;
    categoryContainer.appendChild(button);
  });
}
