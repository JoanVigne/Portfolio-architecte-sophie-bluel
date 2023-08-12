import { getWorks, getCategories } from "./data/api.js";

let works = [];
let categories = [];

const init = async () => {
  works = await getWorks(works);
  console.log(works);

  works = await getWorks(categories);
  console.log(categories);
};

init();
