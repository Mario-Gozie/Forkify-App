import view from "./view";
import icons from "../../img/icons.svg";

class AddRecipeView extends view {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was Successfully uploaded :)";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    //The _addHandlerShowWindow doesn't need a controller (it does not need to be in the controller region). that is why we created a constructor here and because it is a child class, we also used super and the called the _addHandlerShowWindow.
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this)); // Remember that the this keyword in an event listener points specifically to the item it is attached to. so I used bind here to be more specific about the this keyword I mean.
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      // To get access to all the values in the form, we can select all the form elements and then read the value property. However, there is an easier way which is to use form data which which is a modern APi we can make use of. in this Api constructor, we need to pass in an element that is a form, which in this case is the element having the class called upload. then it is going to return an object which we can't understand but we will spread the object into an array.

      const dataArr = [...new FormData(this)]; // This this points to the element the event listener is attached to. you remember? that this within an event listerner always points to the element it is attached to and the element here is the form that is why we used only this. dataArr will simply be an array of fields and values. lets see

      //const
      const data = Object.fromEntries(dataArr); // This Method (Object.fromEntries) from ES6 converts an array of arrays to object easily. so it will convert the dataArr to an object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView(); // This Object need to be imported to the controller so that which is the main script will never execute this file. and the object will never be created.
