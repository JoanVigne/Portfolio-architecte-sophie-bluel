import { getWorks, getCategories } from "./data/api.js";
import { displayWorks } from "./js/works.js";
import { displayCategories } from "./js/categories.js";

let works = [];
let categories = [];

const init = async () => {
  works = await getWorks(works);
  categories = await getCategories(categories);
  displayWorks(works);
  displayCategories(categories);
};

init();
