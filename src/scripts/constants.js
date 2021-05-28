export const pageSelectors = {
    container: '.page__container'
}

export const profileSelectors = {
    main: '.profile',
    editButton: '.profile-info__edit-button',
    addButton: '.profile__add-button',
    nameLabel: '.profile-info__name',
    aboutLabel: '.profile-info__about',
    avatarImage: '.profile-info__avatar'
}

export const formSettings = {
    formSelector: '.pop-up__admin',
    inputSelector: '.pop-up__item',
    submitButtonSelector: '.pop-up__submit-button',
    inactiveButtonClass: 'pop-up__submit-button_inactive',
    inputErrorClass: 'pop-up__item_type_error',
    errorClass: 'pop-up__error_active',
    openPopupClass: 'pop-up_opened',
    nameKey: "name",
    aboutKey: "about",
}

export const popupSelectors = {
    closeButton: '.pop-up__close-button',
    editProfilePopup: '.pop-up_type_edit',
    addElementPopup: '.pop-up_type_add-element',
    imagePreviewPopup: '.pop-up_type_image',
    confirmationPopup: '.pop-up_type_remove-card',
}

export const cardSelectors = {
    template: '.element-template',
    grid: '.photo-grid__list'
}