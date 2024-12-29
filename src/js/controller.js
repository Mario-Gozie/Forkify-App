import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/SearchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

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

    // 1) Loading Recipe

    await model.loadRecipe(id); // we didn't put the result of this promise into a variabe because we dont need it. in the model module, it will put it's result into the recipe object. but because we need to handle all promises, that is why we had to use an await here.

    // const { recipe } = model.state; //trying to destructure the recipe object of the state object to see it's content.

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
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

    resultsView.render(model.getSearchResultsPage(6));

    // Render the initial pagination buttons.

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults();
// controlRecipes();

const init = function () {
  recipeView.addHandlerRender(controlRecipes); // I just used this to implement the publisher-subscriber pattern where by there is a function in the view, and I need to pass in the controller function inside the function so that it can display what it has to display on listening to an event lister. remember, I want the view to present items on the webpage while the controller only controls.

  searchView.addHandlerSearch(controlSearchResults);
};

init();
