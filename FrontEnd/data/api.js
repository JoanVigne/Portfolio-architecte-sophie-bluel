export async function getWorks(data) {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

export async function getCategories(data) {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
