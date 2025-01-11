// This contains everything that has to do with the business aspect of the webpage.
import { async } from "regenerator-runtime";
import { API_URL, REST_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  //The state contains all the data we need for our application.
  recipe: {},
  search: { query: "", results: [], page: 1, resultsPerPage: REST_PER_PAGE },
  bookmarks: [],
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

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(state.recipe);
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
    // console.log(data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1; // This code will reset the page number to 1 after every search.

    // console.log(state.search.page);

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

const persistBookmarks = function () {
  // This is the function that stores data into the web browser local storage. here we used localStorage.setItem give the stored item a name, which in this case is Bookmarks, then convert it to strings wih JSON.stringify
  localStorage.setItem("Bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks(); // calling the function for adding things to the local storage
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1); // deleting with splice

  // Mark Current Recipe as not bookmarked.
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks(); // calling the function for adding things to the local storage
};

// The function below loads the data into the bookmark container immidiately the site is loaded.
const init = function () {
  const storage = localStorage.getItem("Bookmarks"); // first storing the data into a variable.

  // console.log(storage);

  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// console.log(state.bookmarks);

// ONE FUNCTION WE MIGHT (for quickly clearing bookmarks while working on the project.)

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};

// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw Error(
            "Wrong ingredient format! please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log(recipe);
  } catch (err) {
    throw err;
  }
};
