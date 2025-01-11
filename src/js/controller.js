import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/SearchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
// import view from "./views/view.js";

import "core-js/modules/es.symbol.js"; // for polyfilling everything else.
import "regenerator-runtime/runtime"; // for polyfilling async Await
// import { search } from "core-js/fn/symbol";

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

if (module.hot) {
  // |This is not javaScript. it comes from parcel
  module.hot.accept;
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) update results to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) updating bookmarks view

    bookmarksView.update(model.state.bookmarks);

    // 2) Loading Recipe

    await model.loadRecipe(id); // we didn't put the result of this promise into a variabe because we dont need it. in the model module, it will put it's result into the recipe object. but because we need to handle all promises, that is why we had to use an await here.

    // const { recipe } = model.state; //trying to destructure the recipe object of the state object to see it's content.

    // 3) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get Data or query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load Search results.
    await model.loadSearchResults(query);

    //  Render Results
    // console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);

    resultsView.render(model.getSearchResultsPage());

    // Render the initial pagination buttons.

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults();
// controlRecipes();

const controlPagination = function (goToPage) {
  //  1) Render New Results

  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render New pagination buttons.

  paginationView.render(model.state.search);
  console.log(goToPage);
};

const controlServings = function (newServings) {
  //Update recipe servings  in the state.
  model.updateServings(newServings);

  // Update the recipeView
  // recipeView.render(model.state.recipe);  // using render to update a view will basically reload everything, including pixtures. we need to make it better, so it would only update the necessary parts.

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  // Upload the new recipe data.
  model.uploadRecipe(newRecipe);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); // I just used this to implement the publisher-subscriber pattern where by there is a function in the view, and I need to pass in the controller function inside the function so that it can display what it has to display on listening to an event lister. remember, I want the view to present items on the webpage while the controller only controls.

  recipeView.addHandlerUpdateServings(controlServings);

  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
