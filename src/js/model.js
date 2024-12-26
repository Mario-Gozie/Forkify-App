// This contains everything that has to do with the business aspect of the webpage.
import { async } from "regenerator-runtime";
import { API_URL } from "./config";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    // "https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8297"

    // TRYING TO CAUSE AN ERROR

    // const res = await fetch(
    //   "https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886zzz"
    // );

    const data = await res.json();

    console.log(res, data);

    if (!res.ok) throw Error(`${data.message} (${res.status})`);

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
    alert(err);
  }
};
