import {formSettings, popupSelectors} from '../scripts/constants.js'

export default class Popup {
constructor (popupSelector) {
    this.popup = document.querySelector(popupSelector)
    this._closeButton = this.popup.querySelector(popupSelectors.closeButton)
}

open() {
    this.popup.classList.add(formSettings.openPopupClass);
    document.addEventListener('keyup', this._handleEscClose);
}

close() {
    this.popup.classList.remove(formSettings.openPopupClass);
    document.removeEventListener('keyup', this._handleEscClose)
}

_handleEscClose(event) {
    if (event.key === "Escape") {
        this.close()
    }
}

setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this.popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            this.close();
        }
    });
}

}