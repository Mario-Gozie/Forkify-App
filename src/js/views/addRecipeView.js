import view from "./view";
import icons from "../../img/icons.svg";

class AddRecipeView extends view {
  _parentElement = document.querySelector(".upload");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    //The _addHandlerShowWindow doesn't need a controller (it does not need to be in the controller region). that is why we created a constructor here and because it is a child class, we also used super and the called the _addHandlerShowWindow.
    super();
    this._addHandlerShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView(); // This Object need to be imported to the controller so that which is the main script will never execute this file. and the object will never be created.
