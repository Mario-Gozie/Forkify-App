// This contains everything that has to do with the business aspect of the webpage.
import { async } from "regenerator-runtime";
import { API_URL, REST_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  //The state contains all the data we need for our application.
  recipe: {},
  search: { query: "", results: [], page: 1, resultsPerPage: REST_PER_PAGE },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    // Temporary error handling
    // console.error(`${err} 💥💥💥💥`);
    throw err; // Propagating error to the controller function.
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1; // This code will reset the page number to 1 after every search.

    console.log(state.search.page);

    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};

// Pagination
// This is not an async function because we have the data already.
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity / newServings / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8/4 = 4
  });

  state.recipe.servings = newServings;
};
