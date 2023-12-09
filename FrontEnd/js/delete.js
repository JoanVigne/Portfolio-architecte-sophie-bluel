import { projetSupprime } from "./main.js";
import { closeModal } from "./modal.js";

// used in modal
export async function deleteWork(id) {
  const user = sessionStorage.getItem("user");
  if (user === null) {
    console.log("user not found");
    return;
  }
  const token = JSON.parse(user).token;

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const result = await response.text();
    console.log(result);
  }
  if (response.status === 204) {
    closeModal();
    projetSupprime(id);
  }
  if (response.status === 401) {
    console.log("Vous n'avez pas les droits pour supprimer des projets");
  } else {
    console.log(`Request status: ${response.status}`);
  }
}
