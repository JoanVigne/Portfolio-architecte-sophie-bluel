/* export async function getWorks(data) {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

export async function getCategories(data) {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
} */

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Erreur fetching data de ${url}. Status: ${response.status}`
    );
  }

  return response.json();
}

export async function getWorks() {
  return await fetchData("http://localhost:5678/api/works");
}

export async function getCategories() {
  return await fetchData("http://localhost:5678/api/categories");
}
