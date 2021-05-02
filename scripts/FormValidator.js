export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    }
    // Add validation listeners to the form
    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                const isFormValid = this._isFormValid(this._inputList)
                this._toggleButtonState(isFormValid, this._buttonElement);
            })
        })
    };

    // Hide all error messages on the given form
    resetFormState() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
        const isFormValid = this._isFormValid(this._inputList)
        this._toggleButtonState(isFormValid, this._buttonElement);

    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
        inputElement.classList.add(this._settings.inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        errorElement.textContent = '';
        errorElement.classList.remove(this._settings.errorClass);
        inputElement.classList.remove(this._settings.inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _isFormValid(inputList) {
        return !inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _toggleButtonState(isValid, buttonElement) {
        if (isValid) {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
        } else {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._settings.inactiveButtonClass);
        }
    };
}