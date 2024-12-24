import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(
    // "https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8297"
    `https://forkify-api.jonas.io/api/v2/recipes/${id}`
  );

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
};
