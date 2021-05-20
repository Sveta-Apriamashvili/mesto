import PopupWithForm from './components/PopupWithForm.js'
import PopupWithImage from './components/PopupWithImage.js'
import {
    initialCards
} from './initial-cards.js'
import {
    formSettings,
    pageSelectors,
    profileSelectors,
    popupSelectors,
    cardSelectors
} from './constants.js'
import Card from './components/Card.js'
import FormValidator from './FormValidator.js'
import Section from './components/Section.js'
import UserInfo from './components/UserInfo.js'

const container = document.querySelector(pageSelectors.container);
const profile = container.querySelector(profileSelectors.main);

// open pop-up buttons
const openEditPopupButton = profile.querySelector(profileSelectors.editButton);
const openPopupAddElement = profile.querySelector(profileSelectors.addButton);

// Popups
const profileEditPopup = new PopupWithForm(popupSelectors.editProfilePopup, handleFormSubmit)
const cardAddPopup = new PopupWithForm(popupSelectors.addElementPopup, handleAddCard)
const imagePreviewPopup = new PopupWithImage(popupSelectors.imagePreviewPopup)

const popupList = [
    profileEditPopup,
    cardAddPopup,
    imagePreviewPopup,
]

popupList.forEach(popup => popup.setEventListeners())

// Validation
const profileEditFormValidator = new FormValidator(formSettings, profileEditPopup.form)
const cardEditFormValidator = new FormValidator(formSettings, cardAddPopup.form)

profileEditFormValidator.enableValidation()
cardEditFormValidator.enableValidation()

// User Info
const userInfo = new UserInfo({
    usernameSelector: profileSelectors.nameLabel, 
    aboutSelector: profileSelectors.aboutLabel
});

const userNameInput = profileEditPopup.form.querySelector('#name')
const userAboutInput = profileEditPopup.form.querySelector('#about')


// Cards
const cardSection = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item)
            cardSection.addItem(cardElement);
        }
    }, 
    cardSelectors.grid
)
cardSection.renderItems()

// Add cards
function createCard(item) {
    const card = new Card(
        item.name, 
        item.link, 
        cardSelectors.template, 
        handleClickCard
    )
    return card.generateCard()
};

// Apply profile edit form data
function handleFormSubmit(values) {
    userInfo.setUserInfo({
        username: values[formSettings.nameKey], 
        about: values[formSettings.aboutKey]
    });
}

// Create new card
function handleAddCard(values) {
    const cardData = {
        name: values[formSettings.nameKey],
        link: values[formSettings.aboutKey]
    };
    cardSection.prependItem(createCard(cardData));
}

function handleClickCard({url, title}) {
    imagePreviewPopup.open(url, title)
}

// Listener open pop-up
openEditPopupButton.addEventListener('click', function () {
    const values = userInfo.getUserInfo()
    userNameInput.value = values.username;
    userAboutInput.value = values.about
    profileEditPopup.open();
    profileEditFormValidator.resetFormState()
});

openPopupAddElement.addEventListener('click', function () {
    cardAddPopup.open();
    cardEditFormValidator.resetFormState()
});
