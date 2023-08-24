const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (e) => login(e));
/* async function login(event) {
  event.preventDefault();
  let identification = {
    email: document.querySelector('input[type="email"]').value,
    password: document.querySelector('input[type="password"]').value,
  };

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(identification),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA: ", JSON.stringify(data));
      // IF MOT DE PASSE OU EMAIL INCORRECT
      if (JSON.stringify(data) === `{"message":"user not found"}`) {
        alert("Utilisateur ou mot de passe incorrect");
        // IF MOT DE PASSE ET EMAIL OK
      } else {
        // STOCK LE USER TOKEN ET ID DANS LE sessionStorage
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "http://localhost:8080/index.html";
      }
    })
    .catch((err) => alert("ERROR: ", err));
} */

import { modalerreur, closeModal } from "../js/modal.js";

async function login(e) {
  // evite le rechargement de la page
  e.preventDefault();
  // utilisation de l'api FormData pour recuperer les données du formulaire
  const formData = new FormData(e.currentTarget);
  // conversion du tableau de tableau en objet
  const formObject = Object.fromEntries(formData);

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(formObject),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 401) {
        modalerreur("Utilisateur non autorisé");
        throw new Error("Utilisateur non autorisé");
      }
      if (res.status === 404) {
        modalerreur("Utilisateur ou mot de passe incorrect");
        throw new Error("Utilisateur ou mot de passe incorrect");
      } else {
        modalerreur("Erreur incconnue");
        throw new Error("Erreur incconnue");
      }
    })
    .then((data) => {
      sessionStorage.setItem("user", JSON.stringify(data));
      window.location.href = "http://localhost:8080/index.html";
    })
    .catch((err) => console.log("ERREUR : " + err));
}

// fermer les modals
let close = document.querySelector(".modalContent .close");
close.addEventListener("click", () => {
  closeModal();
});
//  fermer au echap
window.addEventListener("keydown", function (e) {
  console.log("This key : ", e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});
const modal = document.querySelector(".modal");
modal.addEventListener("click", () => {
  closeModal();
});
// STOP PROPAGATION POUR CLICK OK SUR MODAL
modal.querySelector(".modalContent").addEventListener("click", (e) => {
  e.stopPropagation();
});
