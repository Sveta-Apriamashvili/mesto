import {openPopup, popupImage} from './popup-utils.js'

export default class Card {
    constructor(elementTitle, elementLink, templateSelector) {
        this._elementTitle = elementTitle;
        this._elementLink = elementLink;
        this._templateSelector = templateSelector;
        this._captionPopupImage = popupImage.querySelector('.pop-up__image-caption');
        this._imagePopupImage = popupImage.querySelector('.pop-up__image');


    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement
    }

    _assignData(element) {
        element.querySelector('.element__title').textContent = this._elementTitle;
        const elementImage = element.querySelector('.element__image');
        elementImage.src = this._elementLink;
        elementImage.alt = this._elementTitle;
    }
    
    _handleLikeIcon(like) {
        like.classList.toggle('element__like_active');
    }
    
    _assignListeners(element) {
        const elementLike = element.querySelector('.element__like');
        elementLike.addEventListener('click', () => this._handleLikeIcon(elementLike))

        const removeButton = element.querySelector('.element__bin');
        removeButton.addEventListener('click', () => this._handleDeleteCard(element))

        element.addEventListener('click', () => this._handlePreviewPicture());
    }

    generateCard() {
        const template = this._getTemplate()
        this._assignData(template)
        this._assignListeners(template)

        return template
    }

    _handleDeleteCard(element) {
        element.remove();
    }

    // Open image
    _handlePreviewPicture() {
        this._imagePopupImage.src = this._elementLink;
        this._imagePopupImage.alt = this._elementTitle;
        this._captionPopupImage.textContent = this._elementTitle;
        openPopup(popupImage);
    }
}

