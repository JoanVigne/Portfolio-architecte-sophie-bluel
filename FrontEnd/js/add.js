export function verifierSiFormEstComplete() {
  const formAjouter = document.querySelector(".formAjouter");
  const inputs = formAjouter.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("blur", updateValue);

    function updateValue(e) {
      console.log("target value : ", e.target.value);
    }
  });
  const select = formAjouter.querySelector("select");
  select.addEventListener("change", (e) => {
    console.log(e);
  });
  const options = select.querySelectorAll("option");
  /*  options.forEach((option) => {
    option.addEventListener("change", (e) => {
      console.log("target value option: ", e.target.value);
      // if option !== "" { ok }
    });
  }); */
}

// url temporaire => pour afficher image css en bg de l'input img

function submitForm(e) {
  // formdata
  e.preventDefault();

  const formData = new FormData(form);
}
