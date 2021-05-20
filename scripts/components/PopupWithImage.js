import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this.popup.querySelector('.pop-up__image');
        this._caption = this.popup.querySelector('.pop-up__image-caption')
    }

    open(imageURL, imageTitle) {
        super.open()
        this._image.src = imageURL;
        this._image.alt = imageTitle;
        this._caption.textContent = imageTitle;
    }
}