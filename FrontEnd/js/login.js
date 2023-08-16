/* let user = {
  email: "sophie.bluel@test.tld",
  password: "S0phie",
}; */

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (e) => login(e));

async function login(event) {
  event.preventDefault();
  let identification = {
    email: document.querySelector('input[type="email"]').value,
    password: document.querySelector('input[type="password"]').value,
  };
  console.log(identification);

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
      localStorage.setItem("user", JSON.stringify(data));
    })
    .catch((err) => console.log("ERROR: ", err));
  window.location.href = "http://localhost:8080/index.html";
}
