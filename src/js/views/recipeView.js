import view from "./view";
import icons from "../../img/icons.svg";
// REMOVE: import { Fraction } from "fractional"; // No longer needed

// Helper function for formatting quantities
function formatQuantity(quantity) {
  if (!quantity) return "";

  // 1. Convert to a fraction if it's a decimal
  if (typeof quantity === "number" && !Number.isInteger(quantity)) {
    let numerator = Math.round(quantity * 100); // Or a higher power of 10 for more precision
    let denominator = 100;

    // 2. Simplify the fraction (find the greatest common divisor)
    function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    }
    const commonDivisor = gcd(numerator, denominator);
    numerator /= commonDivisor;
    denominator /= commonDivisor;

    // 3. Format the output
    if (numerator === denominator) {
      return "1"; // e.g., 1/1 becomes 1
    } else if (numerator > denominator) {
      const wholeNumber = Math.floor(numerator / denominator);
      const remainingNumerator = numerator % denominator;
      if (remainingNumerator === 0) {
        return String(wholeNumber); // e.g 2/1 becomes 2
      }
      return `${wholeNumber} ${remainingNumerator}/${denominator}`; // e.g., 5/2 becomes "2 1/2"
    }
    return `${numerator}/${denominator}`; // e.g., 1/2
  }
  return String(quantity); // If it's already an integer or not a number
}

class RecipeView extends view {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = `We could not find that recipe. Please try another one!`;
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      console.log(btn);

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      console.log(btn);
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to = ${
            this._data.servings - 1
          } >
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to = ${
            this._data.servings + 1
          } >
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

               <div class="recipe__user-generated ${
                 this._data.key ? "" : "hidden"
               }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients
        .map((ing) => this._generateMarkupIngridient(ing))
        .join("")}
      
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  _generateMarkupIngridient(ing) {
    return `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ing.quantity ? formatQuantity(ing.quantity) : "" // Use formatQuantity here
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
  </div>
</li>`;
  }
}

export default new RecipeView();

// // This contains all the things rendered to the webpage
// // Importing Icons

// import view from "./view"; // This is a moudle for parent class for rendering results
// import icons from "../../img/icons.svg";
// import { Fraction } from "fractional";
// // console.log(Fraction);

// class RecipeView extends view {
//   _parentElement = document.querySelector(".recipe");
//   _errorMessage = `We could not find that recipe. Please try another one!`;
//   _message = "";

//   addHandlerRender(handler) {
//     // This function is used for publisher-subscriber relationship where by controller function is passed as an argument then into it. then in the controller module. this function is put into an init functiom and then called. This type of function is not made private so it can be accessible by the controller function in the controller module.

//     // window.addEventListener("hashchange", controlRecipes);
//     // window.addEventListener("load", controlRecipes);

//     // instead of running these two functions above seperately, we can do use a foreach function and put the different events in an array.

//     ["hashchange", "load"].forEach((ev) =>
//       window.addEventListener(ev, handler)
//     );
//   }

//   addHandlerUpdateServings(handler) {
//     this._parentElement.addEventListener("click", function (e) {
//       const btn = e.target.closest(".btn--update-servings");
//       if (!btn) return;
//       console.log(btn);

//       const { updateTo } = btn.dataset; // the update-to here is using a camel case here because when ther is a dash between a dataset data name, a camel case is used when it needs to be used.
//       if (+updateTo > 0) handler(+updateTo); // we want to only udate when service is greater than 0
//     });
//   }

//   addHandlerAddBookmark(handler) {
//     this._parentElement.addEventListener("click", function (e) {
//       const btn = e.target.closest(".btn--bookmark");
//       console.log(btn);
//       if (!btn) return;
//       handler();
//     });
//   }

//   _generateMarkup() {
//     return `
//     <figure class="recipe__fig">
//       <img src="${this._data.image}" alt="${
//       this._data.title
//     }" class="recipe__img" />
//       <h1 class="recipe__title">
//         <span>${this._data.title}</span>
//       </h1>
//     </figure>

//     <div class="recipe__details">
//       <div class="recipe__info">
//         <svg class="recipe__info-icon">
//           <use href="${icons}#icon-clock"></use>
//         </svg>
//         <span class="recipe__info-data recipe__info-data--minutes">${
//           this._data.cookingTime
//         }</span>
//         <span class="recipe__info-text">minutes</span>
//       </div>
//       <div class="recipe__info">
//         <svg class="recipe__info-icon">
//           <use href="${icons}#icon-users"></use>
//         </svg>
//         <span class="recipe__info-data recipe__info-data--people">${
//           this._data.servings
//         }</span>
//         <span class="recipe__info-text">servings</span>

//         <div class="recipe__info-buttons">
//           <button class="btn--tiny btn--update-servings" data-update-to = ${
//             this._data.servings - 1
//           } >
//             <svg>
//               <use href="${icons}#icon-minus-circle"></use>
//             </svg>
//           </button>
//           <button class="btn--tiny btn--update-servings" data-update-to = ${
//             this._data.servings + 1
//           } >
//             <svg>
//               <use href="${icons}#icon-plus-circle"></use>
//             </svg>
//           </button>
//         </div>
//       </div>

//                <div class="recipe__user-generated ${
//                  this._data.key ? "" : "hidden"
//                }">
//             <svg>
//               <use href="${icons}#icon-user"></use>
//             </svg>
//           </div>
//       <button class="btn--round btn--bookmark">
//         <svg class="">
//           <use href="${icons}#icon-bookmark${
//       this._data.bookmarked ? "-fill" : ""
//     }"></use>
//         </svg>
//       </button>
//     </div>

//     <div class="recipe__ingredients">
//       <h2 class="heading--2">Recipe ingredients</h2>
//       <ul class="recipe__ingredient-list">
//       ${this._data.ingredients
//         .map((ing) => this._generateMarkupIngridient(ing))
//         .join("")}

//       </ul>
//     </div>

//     <div class="recipe__directions">
//       <h2 class="heading--2">How to cook it</h2>
//       <p class="recipe__directions-text">
//         This recipe was carefully designed and tested by
//         <span class="recipe__publisher">${
//           this._data.publisher
//         }</span>. Please check out
//         directions at their website.
//       </p>
//       <a
//         class="btn--small recipe__btn"
//         href="${this._data.sourceUrl}"
//         target="_blank"
//       >
//         <span>Directions</span>
//         <svg class="search__icon">
//           <use href="${icons}#icon-arrow-right"></use>
//         </svg>
//       </a>
//     </div>
//     `;
//   }

//   _generateMarkupIngridient(ing) {
//     return `<li class="recipe__ingredient">
//   <svg class="recipe__icon">
//     <use href="${icons}#icon-check"></use>
//   </svg>
//   <div class="recipe__quantity">${
//     ing.quantity ? new Fraction(ing.quantity).toString() : ""
//   }</div>
//   <div class="recipe__description">
//     <span class="recipe__unit">${ing.unit}</span>
//     ${ing.description}
//   </div>
// </li>`;
//   }
// }

// export default new RecipeView();
