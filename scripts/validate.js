const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
}

const checkInputValidity = (formElement, inputElement, settings) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, settings)
    } else {
        hideInputError(formElement, inputElement, settings)
    }
};

const toggleButtonState = (inputList, buttonElement) => {
    const isNotValid = inputList.some((inputElement) => !inputElement.validity.valid);
    if (isNotValid) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('.pop-up__submit-button_inactive');
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('.pop-up__submit-button_inactive');
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
            toggleButtonState(inputList, buttonElement);
        })
    })

};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });

};

enableValidation({
    formSelector: '.pop-up__admin',
    inputSelector: '.pop-up__item',
    submitButtonSelector: '.pop-up__submit-button',
    inactiveButtonClass: 'pop-up__submit-button_disabled',
    inputErrorClass: 'pop-up__input-container_type_error',
    errorClass: 'pop-up__error_active'
});