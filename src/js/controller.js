import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; // for polyfilling everything else.
import "regenerator-runtime/runtime"; // for polyfilling async Await

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe

    await model.loadRecipe(id); // we didn't put the result of this promise into a variabe because we dont need it. in the model module, it will put it's result into the recipe object. but because we need to handle all promises, that is why we had to use an await here.

    // const { recipe } = model.state; //trying to destructure the recipe object of the state object to see it's content.

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();

// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);

// instead of running these two functions above seperately, we can do use a foreach function and put the different events in an array.

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
