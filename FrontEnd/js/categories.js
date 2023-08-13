export function displayCategories(categories) {
  let gallery = document.querySelector(".gallery");
  let categoryContainer = document.createElement("div");
  categoryContainer.classList.add("categoryContainer");
  gallery.before(categoryContainer);
  // creation button "TOUS"
  let buttonTous = document.createElement("button");
  buttonTous.innerText = "Tous";
  buttonTous.addEventListener("click", (buttonTous) =>
    categoryClicked(buttonTous)
  );
  categoryContainer.appendChild(buttonTous);
  // boucle our les autres buttons
  categories.forEach((category) => {
    let button = document.createElement("button");
    button.innerHTML = category.name;
    button.addEventListener("click", (button) => categoryClicked(button));
    categoryContainer.appendChild(button);
  });
}

// ON CLICK
export function categoryClicked(e) {
  console.log("this button => ", e.target.innerText);
}
