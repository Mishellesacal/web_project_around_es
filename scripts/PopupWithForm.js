
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");

    this._inputList = Array.from(
      this._form.querySelectorAll(".popup__input")
    );

    this._submitButton = this._form.querySelector('button[type="submit"]');
this._defaultButtonText = this._submitButton.textContent;

    this._submitButton = this._form.querySelector(
      'button[type="submit"]'
    );

    this._defaultButtonText = this._submitButton.textContent;
  }

  

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}