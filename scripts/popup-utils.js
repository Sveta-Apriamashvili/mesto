import {formSettings} from './constants.js'

// pop-ups
export const popupEdit = document.querySelector('.pop-up_type_edit');
export const popupAddElement = document.querySelector('.pop-up_type_add-element');
export const popupImage = document.querySelector('.pop-up_type_image');

const _popupList = [
    popupEdit,
    popupAddElement,
    popupImage,
]

const _closeEditPopupButton = popupEdit.querySelector('.pop-up__close-button');
const _closePopupAddElement = popupAddElement.querySelector('.pop-up__close-button');
const _closePopupImage = popupImage.querySelector('.pop-up__close-button');

// Open pop-up
export function openPopup(popup) {
    popup.classList.add(formSettings.openPopupClass);
    document.addEventListener('keyup', _handleEscButtonPress);
}

// Close pop-up
export function closePopup(popup) {
    popup.classList.remove(formSettings.openPopupClass);
    document.removeEventListener('keyup', _handleEscButtonPress)
}

function _handleEscButtonPress(event) {
    if (event.key === "Escape") {
        const openPopup = document.querySelector(`.${formSettings.openPopupClass}`)
        closePopup(openPopup)
    }
}

// Listener close pop-up
_closeEditPopupButton.addEventListener('click', () => closePopup(popupEdit));
_closePopupAddElement.addEventListener('click', () => closePopup(popupAddElement));
_closePopupImage.addEventListener('click', () => closePopup(popupImage));

_popupList.forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closePopup(overlay);
        }
    });
});