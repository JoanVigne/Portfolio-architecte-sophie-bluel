import { closeModal } from "./modal.js";
import { projetAjoute } from "./main.js";

export function verifierSiFormEstComplete() {
  const formAjouter = document.querySelector(".formAjouter");
  const inputs = formAjouter.querySelectorAll("input");
  //! mettre des noms aux inputs
  let selectCategorie = formAjouter.querySelector("select");
  // je verifie si tous les champs on été rempli
  if (
    selectCategorie.value !== "" &&
    // je regarde la taille du FileList avec le .length
    inputs[0].files.length > 0 &&
    inputs[1].value !== ""
  ) {
    // changement des class et event sur le input submit
    inputs[2].classList.remove("incomplet");
    inputs[2].addEventListener("submit", (e) => submitForm(e));
  } else {
    inputs[2].classList.add("incomplet");
    inputs[2].removeEventListener("submit", (e) => submitForm(e));
  }
}

// url temporaire => pour afficher image css en bg de l'input img

export async function submitForm(e) {
  // formdata
  e.preventDefault();

  const user = sessionStorage.getItem("user");
  const authToken = JSON.parse(user).token;

  const formData = new FormData(e.target);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  // response created
  if (response.status === 201) {
    const result = await response.text();
    console.log(result);
    closeModal();
    projetAjoute(result);
  }
  // bad request
  if (response.status === 400) {
    console.log("bad request !");
  }
  // unauthorized
  if (response.status === 401) {
    console.log("Vous n'avez pas les droits pour ajouter des projets");
  }
  // unexpected error
  if (response.status === 500) {
    console.log(`Request status: ${response.status}`);
  }
}
