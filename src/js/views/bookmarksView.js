import view from "./view";
import icons from "../../img/icons.svg";

class BookmarksView extends view {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it ;)`;
  _message = "";
  _generateMarkup() {
    // console.log(this._data);

    // return this._data.map((dat) => this._generateMarkupPreview(dat)).join("");
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
            <a class="preview__link ${
              result.id === id ? "preview_link--active" : ""
            }" href="#${result.id}">
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

export default new BookmarksView();
