import Popup from './Popup.js'
import { formSettings } from '../scripts/constants.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, onFormSubmit) {
        super(popupSelector)
        this._onFormSubmit = onFormSubmit
        this.form = this.popup.querySelector('.pop-up__admin')
        this._inputList = Array.from(this.form.querySelectorAll(formSettings.inputSelector));
    }

    _getInputValues() {
        let values = {}
        this._inputList.forEach((inputElement) => {
            values[inputElement.name] = inputElement.value
        })

        return values
    }
    
    close() {
        super.close()
        this.form.reset()
    }

    setEventListeners() {
        super.setEventListeners()
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onFormSubmit(this._getInputValues())
            this.close()
        });
    }
}