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
const userInfo = new UserInfo({
    usernameSelector: profileSelectors.nameLabel,
    aboutSelector: profileSelectors.aboutLabel,
    avatarSelector: profileSelectors.avatarImage,
    editButtonSelector: profileSelectors.avatarEditButton
}, {
    onClickEdit: openAvatarEditForm
});

userInfo.setEventListeners();

let currentUser;
let cardSection;
Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
]).then((values) => {
    setUserInfo(values[0])
    setInitialCards(values[1])
}).catch(logError)

function setUserInfo(info) {
    currentUser = info;
    userInfo.setUserInfo({
        username: info.name,
        about: info.about,
        avatar: info.avatar
    });
}

function setInitialCards(cards) {
    cardSection = new Section({
            items: cards,
            renderer: (item) => {
                const cardElement = createCard(item)
                cardSection.addItem(cardElement);
            }
        },
        cardSelectors.grid
    )
    cardSection.renderItems()
}

const userNameInput = profileEditPopup.form.querySelector('#name')
const userAboutInput = profileEditPopup.form.querySelector('#about')

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
        userInfo.setUserInfo({
            username: data.name,
            about: data.about,
            avatar: data.avatar
        });
    })
    .catch(logError)
    .finally(() => {
        profileEditPopup.close()
    });
}

// Create new card
function handleAddCard(values) {
    api.addNewCard({
        name: values[formSettings.nameKey],
        link: values[formSettings.aboutKey]
    }).then((data) => {
        cardSection.prependItem(createCard(data));
    })
    .catch(logError)
    .finally(() => {
        cardAddPopup.close()
    });

}

function handleClickCard({
    url,
    title
}) {
    imagePreviewPopup.open(url, title)
}

function handleDeleteCard(card, id) {
    confirmationPopup.open(() => {
        api.deleteCard(id).then(() => {
            card.delete()
        })
        .catch(logError)
        .finally(() => {
            confirmationPopup.close()
        });
    })
}

function handleCardLike(card, id, isActive) {
    function assignLikeCount(data) {
        card.setLikesCount(data.likes.length)
        card.toggleLike()
    }
    if (!isActive) {
        api.addLike(id).then(assignLikeCount).catch(logError)
    } else {
        api.deleteLike(id).then(assignLikeCount).catch(logError)
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
            currentUser = data;
            userInfo.setUserInfo({
                username: data.name,
                about: data.about,
                avatar: data.avatar
            });
        })
        .catch(logError)
        .finally(() => {
            avatarEditPopup.close()
        });
}

function logError(err) {
    console.log(err);
}