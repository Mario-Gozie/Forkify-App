import view from "./view";
import icons from "../../img/icons.svg";

class PreviewView extends view {
  _parentElement = "";

  _generateMarkupPreview() {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
            <a class="preview__link ${
              this._data.id === id ? "preview_link--active" : ""
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
              </div>
            </a>
          </li>`;
  }
}

export default new PreviewView();
