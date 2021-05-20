export default class Card {
    constructor(elementTitle, elementLink, templateSelector, handleCardClick) {
        this._elementTitle = elementTitle;
        this._elementLink = elementLink;
        this._element = this._getTemplate(templateSelector);
        this._elementImage = this._element.querySelector('.element__image');
        this._handleCardClick = handleCardClick
    }

    _getTemplate(selector) {
        const cardElement = document
            .querySelector(selector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement
    }

    _assignData() {
        this._element.querySelector('.element__title').textContent = this._elementTitle;
        this._elementImage.src = this._elementLink;
        this._elementImage.alt = this._elementTitle;
    }
    
    _handleLikeIcon(like) {
        like.classList.toggle('element__like_active');
    }
    
    _assignListeners() {
        const elementLike = this._element.querySelector('.element__like');
        elementLike.addEventListener('click', () => this._handleLikeIcon(elementLike))

        const removeButton = this._element.querySelector('.element__bin');
        removeButton.addEventListener('click', () => this._handleDeleteCard(this._element))

        this._elementImage.addEventListener('click', () => {
            this._handleCardClick({
                url: this._elementLink,
                title: this._elementTitle
            });
        });
    }

    generateCard() {
        this._assignData()
        this._assignListeners()

        return this._element
    }

    _handleDeleteCard(element) {
        element.remove();
    }
}

