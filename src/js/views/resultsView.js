import view from "./view";
import icons from "../../img/icons.svg";

class ResultsView extends view {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No recipies found for your query! Please try again ;)`;
  _message = "";
  _generateMarkup() {
    console.log(this._data);

    // return this._data.map((dat) => this._generateMarkupPreview(dat)).join("");
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    return `<li class="preview">
            <a class="preview__link " href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
              </div>
            </a>
          </li>`;
  }
}

export default new ResultsView();
