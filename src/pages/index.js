import './index.css'
import {
    api
} from '../components/Api.js'

import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import {
    formSettings,
    pageSelectors,
    profileSelectors,
    popupSelectors,
    cardSelectors
} from '../scripts/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'

const container = document.querySelector(pageSelectors.container);
const profile = container.querySelector(profileSelectors.main);

// open pop-up buttons
const openEditPopupButton = profile.querySelector(profileSelectors.editButton);
const openPopupAddElement = profile.querySelector(profileSelectors.addButton);

// Popups
const profileEditPopup = new PopupWithForm(popupSelectors.editProfilePopup, handleFormSubmit)
const cardAddPopup = new PopupWithForm(popupSelectors.addElementPopup, handleAddCard)
const imagePreviewPopup = new PopupWithImage(popupSelectors.imagePreviewPopup)
const confirmationPopup = new PopupWithConfirmation(popupSelectors.confirmationPopup)
const avatarEditPopup = new PopupWithForm(popupSelectors.editAvatarPopup, submitNewAvatar)

const popupList = [
    profileEditPopup,
    cardAddPopup,
    imagePreviewPopup,
    confirmationPopup,
    avatarEditPopup,
]

popupList.forEach(popup => popup.setEventListeners())

// Validation
const profileEditFormValidator = new FormValidator(formSettings, profileEditPopup.form)
const cardEditFormValidator = new FormValidator(formSettings, cardAddPopup.form)
const avatarEditFormValidator = new FormValidator(formSettings, avatarEditPopup.form)

profileEditFormValidator.enableValidation()
cardEditFormValidator.enableValidation()
avatarEditFormValidator.enableValidation()

// User Info
let currentUser;
const userInfo = new UserInfo({
    usernameSelector: profileSelectors.nameLabel,
    aboutSelector: profileSelectors.aboutLabel,
    avatarSelector: profileSelectors.avatarImage,
    editButtonSelector: profileSelectors.avatarEditButton
}, {
    onClickEdit: openAvatarEditForm
});

userInfo.setEventListeners();

api.getUserInfo().then((data) => {
    currentUser = data;
    userInfo.setUserInfo({
        username: data.name,
        about: data.about,
        avatar: data.avatar
    });
})

const userNameInput = profileEditPopup.form.querySelector('#name')
const userAboutInput = profileEditPopup.form.querySelector('#about')


// Cards
let cardSection;
api.getInitialCards().then((data) => {
    cardSection = new Section({
            items: data,
            renderer: (item) => {
                const cardElement = createCard(item)
                cardSection.addItem(cardElement);
            }
        },
        cardSelectors.grid
    )
    cardSection.renderItems()
})


// Add cards
function createCard(item) {
    const isEditable = item.owner._id === currentUser._id
    const isLiked = item.likes.some(owner => owner._id === currentUser._id)
    const card = new Card(
        item._id,
        item.name,
        item.link,
        item.likes.length,
        cardSelectors.template,
        isEditable,
        isLiked,
        handleClickCard,
        handleDeleteCard,
        handleCardLike
    )
    return card.generateCard()
};

// Apply profile edit form data
function handleFormSubmit(values) {
    api.editUserInfo({
        name: values[formSettings.nameKey],
        about: values[formSettings.aboutKey]
    }).then((data) => {
        profileEditPopup.close()
        userInfo.setUserInfo({
            username: data.name,
            about: data.about,
            avatar: data.avatar
        });
    })
}

// Create new card
function handleAddCard(values) {
    api.addNewCard({
        name: values[formSettings.nameKey],
        link: values[formSettings.aboutKey]
    }).then((data) => {
        cardAddPopup.close()
        cardSection.prependItem(createCard(data));
    })

}

function handleClickCard({
    url,
    title
}) {
    imagePreviewPopup.open(url, title)
}

function handleDeleteCard(element, id) {
    confirmationPopup.open(() => {
        api.deleteCard(id)
        element.remove()
        confirmationPopup.close()
    })
}

function handleCardLike(isActive, element, id) {
    function assignLikeCount(data) {
        element.textContent = data.likes.length
    }
    if (isActive) {
        api.addLike(id).then(assignLikeCount)
    } else {
        api.deleteLike(id).then(assignLikeCount)
    }
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

function openAvatarEditForm() {
    avatarEditPopup.open()
    avatarEditFormValidator.resetFormState()
}

function submitNewAvatar(values) {
    const link = values[formSettings.aboutKey]
    api.updateAvatar(link).then((data) => {
        avatarEditPopup.close()
        currentUser = data;
        userInfo.setUserInfo({
            username: data.name,
            about: data.about,
            avatar: data.avatar
        });
    })
}