function verifierSiFormEstComplete() {
  const formAjouter = document.querySelector(".formAjouter");
  const inputs = formAjouter.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", updateValue);

    function updateValue(e) {
      console.log("target value : ", e.target.value);
    }
  });
  const select = formAjouter.querySelector("select");
  const options = select.querySelectorAll("option");
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      console.log("target value option: ", e.target.value);
    });
  });
  select.addEventListener("click", updateValue);
  function updateValue(e) {
    console.log("target value : ", e.target.value);
  }
}
