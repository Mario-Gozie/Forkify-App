import icons from "../../img/icons.svg";

export default class view {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); //if there is no data or the data is an array but empty, give an error message.

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup); // adding the html code as the first value of the recipe container.
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    // We need to create a new markup, and copare it with the old one. Then change only text and attributes that has changed so far. The newMarkup above is a string and we can not use it for comparison because it can't be compared with the DOM element we have on the page. so we need to convert it to this newMarkup String to a DOM object, that will live in the memory, which we can use for comparison.

    const newDOM = document.createRange().createContextualFragment(newMarkup); //This will create a new DOM element which will not be living in our DOM and this will be based on the updated value. you can see that we just want to update part of the DOM.

    const newElements = Array.from(newDOM.querySelectorAll("*")); // this will select everything in the new DOM element created.

    // I used array.from to convert the whole elements from a nodelist to an array.

    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    // console.log(newElements);
    // console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(curEl, newEl.isEqualNode(curEl)); // They isEqualNode method will compare the two html elements.

      // updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("💥", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // Updates changed Attributes
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) => {
          // console.log();
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = ` <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = ` <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
