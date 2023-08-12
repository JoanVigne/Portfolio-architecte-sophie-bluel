import { getWorks, getCategories } from "./data/api.js";
import { displayWorks } from "./js/works.js";

let works = [];
let categories = [];

const init = async () => {
  works = await getWorks(works);
  console.log(works);

  displayWorks(works);
};

init();
