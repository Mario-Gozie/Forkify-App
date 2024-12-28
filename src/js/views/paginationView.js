import view from "./view";
import icons from "../../img/icons.svg";

class paginationView extends view {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = this._data.results / this._data.resultsPerPage;
    console.log(numPages);
    // Page 1 and there are other pages
    // we are on page1 and there are no other pages,
    // We are on the last page
    // other page
  }
}

export default new paginationView();
