export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    // "https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8297"

    // TRYING TO CAUSE AN ERROR

    // const res = await fetch(
    //   "https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886zzz"
    // );

    const data = await res.json();

    console.log(res, data);

    if (!res.ok) throw Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // I am throwing this error because I want it to be handled in the model.js and not in helpers.js This is more like propergating an error from one async function to another.
  }
};
