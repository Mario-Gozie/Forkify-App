import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Remember that Promice race() returns the first promise. so we use the time out to return errors when there is delay in fetching data for recipe.

    // "https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8297"

    // TRYING TO CAUSE AN ERROR

    // const res = await fetch(
    //   "https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886zzz"
    // );

    const data = await res.json();

    // console.log(res, data);

    if (!res.ok) throw Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // I am throwing this error because I want it to be handled in the model.js and not in helpers.js This is more like propergating an error from one async function to another.
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST", //we are saying we want to post
      headers: {
        "Content-Type": "application/json", //we are saying the file type will be json
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    // console.log(res, data);

    if (!res.ok) throw Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // I am throwing this error because I want it to be handled in the model.js and not in helpers.js This is more like propergating an error from one async function to another.
  }
};
