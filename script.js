let container = document.querySelector('.page__container');
let popup = container.querySelector ('.pop-up');
let profile = container.querySelector('.profile');
let profileName = profile.querySelector('.profile-info__name');
let profileAbout = profile.querySelector('.profile-info__about');
let editButton = profile.querySelector('.profile-info__edit-button');
let closeButton = popup.querySelector('.pop-up__close-button');
let popupInputs = popup.querySelectorAll('.pop-up__item');

function openInfoPopup () {
    popupInputs[0].value = profileName.innerText;
    popupInputs[1].value = profileAbout.innerText;
    popup.classList.add('pop-up_opened');
}

editButton.addEventListener('click', openInfoPopup)

function closeInfoPopup () {
    popup.classList.remove('pop-up_opened')
}

closeButton.addEventListener('click', closeInfoPopup)

