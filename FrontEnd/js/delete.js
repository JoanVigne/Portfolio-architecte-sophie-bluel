export async function deleteWork(id) {
  const user = sessionStorage.getItem("user");
  if (user === null) {
    console.log("user not found");
    return;
  }

  const token = JSON.parse(user).token;

  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(`Error: ${error}`);
      console.error("There was an error!", error);
    });
}
