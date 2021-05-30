import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._confirmationButton = this.popup.querySelector('.pop-up__submit-button')
    }

    open(confirmationHandler) {
        super.open()
        this._pendingAction = confirmationHandler
        this._confirmationButton.addEventListener('click', this._pendingAction);
    }

    close() {
        super.close()
        if (this._pendingAction) {
            this._confirmationButton.removeEventListener('click', this._pendingAction)
        }
    }
    
}