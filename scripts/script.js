import {openPopup, closePopup, popupEdit, popupAddElement} from './popup-utils.js'
import {initialCards} from './initial-cards.js'
import {formSettings} from './constants.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'

const container = document.querySelector('.page__container');
const profile = container.querySelector('.profile');


// open pop-up buttons
const openEditPopupButton = profile.querySelector('.profile-info__edit-button');
const openPopupAddElement = profile.querySelector('.profile__add-button');

// create new card
const cardName = popupAddElement.querySelector('#cardname');
const imageLink = popupAddElement.querySelector('#image');

const profileName = profile.querySelector('.profile-info__name');
const profileAbout = profile.querySelector('.profile-info__about');
const popupName = popupEdit.querySelector('#name');
const popupAbout = popupEdit.querySelector('#about');

// submit pop-ups
const profileEditForm = popupEdit.querySelector('.pop-up__admin');
const cardEditForm = popupAddElement.querySelector('.pop-up__admin');


const list = document.querySelector('.photo-grid__list');

// Add cards
function createCard(item) {
    const card = new Card(item.name, item.link, '.element-template')
    return card.generateCard()
};

initialCards.forEach(function (item) {
    list.append(createCard(item));
});

// Apply profile edit form data
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup(popupEdit);
}

// Create new card
function handleAddCard(evt) {
    evt.preventDefault();

    list.prepend(createCard({
        name: cardName.value,
        link: imageLink.value
    }));
    closePopup(popupAddElement);
}

// Listener open pop-up
openEditPopupButton.addEventListener('click', function () {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    openPopup(popupEdit);
    profileEditFormValidator.resetFormState()
});
openPopupAddElement.addEventListener('click', function () {
    openPopup(popupAddElement);
    cardEditForm.reset();
    cardEditFormValidator.resetFormState()
});

// Listener submit buttons
profileEditForm.addEventListener('submit', handleFormSubmit);
cardEditForm.addEventListener('submit', handleAddCard);


const profileEditFormValidator = new FormValidator(formSettings, profileEditForm)
const cardEditFormValidator = new FormValidator(formSettings, cardEditForm)
profileEditFormValidator.enableValidation()
cardEditFormValidator.enableValidation()