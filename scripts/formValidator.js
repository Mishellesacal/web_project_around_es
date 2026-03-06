export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._inputs = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = formElement.querySelector(this._config.submitButtonSelector);
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }
  enableValidation() {
    this._setEventListeners();
  }
}



