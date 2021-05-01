export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    enableValidation() {
        this._resetFormState()

        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    };
    
    // Hide all error messages on the given form
    _resetFormState() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    
        inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
            this._toggleButtonState(inputList, buttonElement);
        })
    }

    _showInputError (inputElement, errorMessage) {
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
    
    _toggleButtonState(inputList, buttonElement) {
        const isNotValid = inputList.some((inputElement) => !inputElement.validity.valid);
        if (isNotValid) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._settings.inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    };
}