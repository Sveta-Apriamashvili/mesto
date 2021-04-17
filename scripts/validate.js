const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
    inputElement.classList.add(settings.inputErrorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
    inputElement.classList.remove(settings.inputErrorClass);

}

const checkInputValidity = (formElement, inputElement, settings) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    const isNotValid = inputList.some((inputElement) => !inputElement.validity.valid);
    if (isNotValid) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, settings) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        })
    })

};

// Public API

// Enable validation on forms
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

// Hide all error messages on the given form
const resetFormState = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
    })
}