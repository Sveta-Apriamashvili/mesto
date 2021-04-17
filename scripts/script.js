const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');
const container = document.querySelector('.page__container');
const profile = container.querySelector('.profile');

// pop-ups
const popupEdit = container.querySelector('.pop-up_type_edit');
const popupAddElement = container.querySelector('.pop-up_type_add-element');
const popupImage = container.querySelector('.pop-up_type_image');
const popupList = [
    popupEdit,
    popupAddElement,
    popupImage,
]

// open pop-up buttons
const openEditPopupButton = profile.querySelector('.profile-info__edit-button');
const openPopupAddElement = profile.querySelector('.profile__add-button');

// close pop-up buttons
const closeEditPopupButton = popupEdit.querySelector('.pop-up__close-button');
const closePopupAddElement = popupAddElement.querySelector('.pop-up__close-button');
const closePopupImage = popupImage.querySelector('.pop-up__close-button');

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

// pop-up elements
const imagePopupImage = popupImage.querySelector('.pop-up__image');
const captionPopupImage = popupImage.querySelector('.pop-up__image-caption');

// Add cards
function createCard(item) {
    const element = elementTemplate.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementImage = element.querySelector('.element__image');
    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;

    const elementLike = element.querySelector('.element__like');
    elementLike.addEventListener('click', () => handleLikeIcon(elementLike));

    const removeButton = element.querySelector('.element__bin');
    removeButton.addEventListener('click', () => handleDeleteCard(element));

    elementImage.addEventListener('click', () => handlePreviewPicture(item));

    return element
};

initialCards.forEach(function (item) {
    list.append(createCard(item));
});

// Add or remove like
function handleLikeIcon(like) {
    like.classList.toggle('element__like_active');
}

// Remove card
function handleDeleteCard(element) {
    element.remove();
}

// Open image
function handlePreviewPicture(item) {
    imagePopupImage.src = item.link;
    imagePopupImage.alt = item.name;
    captionPopupImage.textContent = item.name;
    openPopup(popupImage);
}

// Open pop-up
function openPopup(popup) {
    popup.classList.add(formSettings.openPopupClass);
    document.addEventListener('keyup', handleEscButtonPress);
}

// Close pop-up
function closePopup(popup) {
    popup.classList.remove(formSettings.openPopupClass);
    document.removeEventListener('keyup', handleEscButtonPress)
}

function handleEscButtonPress(event) {
    if (event.key === "Escape") {
        const openPopup = document.querySelector(`.${formSettings.openPopupClass}`)
        closePopup(openPopup)
    }
}

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
    resetFormState(profileEditForm, formSettings);
});
openPopupAddElement.addEventListener('click', function () { 
    openPopup(popupAddElement);
    cardEditForm.reset();
    resetFormState(cardEditForm, formSettings);
});

// Listener close pop-up
closeEditPopupButton.addEventListener('click', () => closePopup(popupEdit));
closePopupAddElement.addEventListener('click', () => closePopup(popupAddElement));
closePopupImage.addEventListener('click', () => closePopup(popupImage));

popupList.forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closePopup(overlay);
        }
    });
});

// Listener submit buttons
profileEditForm.addEventListener('submit', handleFormSubmit);
cardEditForm.addEventListener('submit', handleAddCard);

// Enable forms validation
enableValidation(formSettings);