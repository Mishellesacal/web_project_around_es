
export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._inputs = Array.from(
      formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(
      `.${input.id}-input-error`
    );

    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `.${input.id}-input-error`
    );

    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(
        this._config.inactiveButtonClass
      );
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(
        this._config.inactiveButtonClass
      );
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}