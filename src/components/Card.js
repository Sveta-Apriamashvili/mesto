export default class Card {
    constructor(id, elementTitle, elementLink, likeCount, templateSelector, isEditable, isLiked, handleCardClick, handleCardDelete, handleCardLike) {
        this._id = id;
        this._elementTitle = elementTitle;
        this._elementLink = elementLink;
        this._likeCount = likeCount;
        this._isEditable = isEditable;
        this._isLiked = isLiked;
        this._element = this._getTemplate(templateSelector);
        this._elementImage = this._element.querySelector('.element__image');
        this._elementLike = this._element.querySelector('.element__like');
        this._handleCardClick = handleCardClick
        this._handleCardDelete = handleCardDelete
        this._handleCardLike = handleCardLike

    }

    _getTemplate(selector) {
        const cardElement = document
            .querySelector(selector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        if (this._isEditable) {
            cardElement
                .querySelector('.element__bin')
                .classList
                .add('element__bin_active')
        }

        if (this._isLiked) {
            cardElement
                .querySelector('.element__like')
                .classList
                .add('element__like_active')
        }

        return cardElement
    }

    _assignData() {
        this._element.querySelector('.element__title').textContent = this._elementTitle;
        this._elementImage.src = this._elementLink;
        this._elementImage.alt = this._elementTitle;
        this._elementLike.textContent = this._likeCount;
    }

    _handleLikeIcon(like) {
        this._handleCardLike(
            this,
            this._id,
            like.classList.contains('element__like_active'),
        )
    }

    _assignListeners() {
        this._elementLike.addEventListener('click', () => this._handleLikeIcon(this._elementLike))
        const removeButton = this._element.querySelector('.element__bin');
        removeButton.addEventListener('click', () => this._handleCardDelete(this, this._id))

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

    setLikesCount(value) {
        this._elementLike.textContent = value
    }

    toggleLike() {
        this._elementLike.classList.toggle('element__like_active');
    }

    delete() {
        this._element.remove()
    }
}