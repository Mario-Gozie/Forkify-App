import view from "./view";
import icons from "../../img/icons.svg";

class paginationView extends view {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // we are on page1 and there are no other pages,
    // We are on the last page
    if (curPage === numPages && numPages > 1) {
      return `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}s#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    // other page

    if (curPage < numPages) {
      return `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}s#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button><button class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    return ``;
  }
}

export default new paginationView();
