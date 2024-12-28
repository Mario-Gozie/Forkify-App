import view from "./view";
import icons from "../../img/icons.svg";

class paginationView extends view {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return "page 1, others";
    }
    // we are on page1 and there are no other pages,
    // We are on the last page
    if (this._data.page === numPages && numPages > 1) {
      return "last page";
    }
    // other page

    if (this._data.page < numPages) {
      return "other page";
    }

    return "only 1 page";
  }
}

export default new paginationView();
