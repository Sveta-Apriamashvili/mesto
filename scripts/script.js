const container = document.querySelector('.page__container');
const profile = container.querySelector('.profile');

// pop-ups
const popupEdit = container.querySelector('.pop-up_type_edit');
const popupAddElement = container.querySelector('.pop-up_type_add-element');
const popupImage = container.querySelector('.pop-up_type_image');

// open pop-up buttons
const openEditPopupButton = profile.querySelector('.profile-info__edit-button');
const openPopupAddElement = profile.querySelector('.profile__add-button');

// close pop-up buttons
const closeEditPopupButton = popupEdit.querySelector('.pop-up__close-button');
const closePopupAddElement = popupAddElement.querySelector('.pop-up__close-button');
const closePopupImage = popupImage.querySelector('.pop-up__close-button');


const profileName = profile.querySelector('.profile-info__name');
const profileAbout = profile.querySelector('.profile-info__about');
const popupName = popupEdit.querySelector('#name');
const popupAbout = popupEdit.querySelector('#about');

// submit pop-ups
const profileEditForm = popupEdit.querySelector('.pop-up__container');
const cardEditForm = popupAddElement.querySelector('.pop-up__container');

const list = document.querySelector('.photo-grid__list');

// pop-up elements
const ImagePopupImage = popupImage.querySelector('.pop-up__image');
const CaptionPopupImage = popupImage.querySelector('.pop-up__image-caption');

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Add cards
function createCard(item) {
    const elementTemplate = document.querySelector('.element-template').content.querySelector('.element')
    const element = elementTemplate.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementImage = element.querySelector('.element__image');
    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;

    const elementLike = element.querySelector('.element__like');
    elementLike.addEventListener('click', function () {
        like(elementLike)
    })

    const removeButton = element.querySelector('.element__bin');
    removeButton.addEventListener('click', function () {
        removeElement(element);
    })

    elementImage.addEventListener('click', function () {
        imageClickHandler(item);
    });
    
    return element
};

initialCards.forEach(function (item) {
    list.append(createCard(item));
});

// Add or remove like
function like(like) {
    like.classList.toggle('element__like_active');
}

// Remove card
function removeElement(element) {
    element.remove();
}

// Open image
function imageClickHandler (item) {
    ImagePopupImage.src = item.link;
    ImagePopupImage.alt = item.name;
    CaptionPopupImage.textContent = item.name;
    openPopup(popupImage);
}

// Open pop-up
function openPopup(popup) {
    popup.classList.add('pop-up_opened');
}

// Close pop-up
function closePopup(popup) {
    popup.classList.remove('pop-up_opened')
}

// Apply profile edit form data
function formSubmitHandler(evt) {
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    evt.preventDefault();

    closePopup(popupEdit);
}

// Create new card
function addCardSubmitHandler(evt) {
    const cardName = popupAddElement.querySelector('#cardname').value;
    const imageLink = popupAddElement.querySelector('#image').value;

    const cardObject = {
        name: cardName,
        link: imageLink
    };

    evt.preventDefault();

    list.prepend(createCard(cardObject));
    closePopup(popupAddElement);
}

// Listener open pop-up
openEditPopupButton.addEventListener('click', function () {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    openPopup(popupEdit)
});
openPopupAddElement.addEventListener('click', function () {
    openPopup(popupAddElement)
});

// Listener close pop-up
closeEditPopupButton.addEventListener('click', function () {
    closePopup(popupEdit)
});
closePopupAddElement.addEventListener('click', function () {
    closePopup(popupAddElement)
});
closePopupImage.addEventListener('click', function () {
    closePopup(popupImage)
});

// Listener submit buttons
profileEditForm.addEventListener('submit', formSubmitHandler); 
cardEditForm.addEventListener('submit', addCardSubmitHandler);