let container = document.querySelector('.page__container');
let popup = container.querySelector ('.pop-up');
let profile = container.querySelector('.profile');
let profileName = profile.querySelector('.profile-info__name');
let profileAbout = profile.querySelector('.profile-info__about');
let editButton = profile.querySelector('.profile-info__edit-button');
let closeButton = popup.querySelector('.pop-up__close-button');
let popupName = popup.querySelector('#name');
let popupAbout = popup.querySelector('#about');
let formElement = popup.querySelector('.pop-up__container');

function openInfoPopup () {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    popup.classList.add('pop-up_opened');  // открываем форму редактирования профиля с предзаполненными данными
}

function closeInfoPopup () {
    popup.classList.remove('pop-up_opened')  // закрываем форму редактирования профиля
}

function formSubmitHandler (evt) {
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    evt.preventDefault();

    closeInfoPopup();  //применяем данные из формы редактирования профиля
}


editButton.addEventListener('click', openInfoPopup); // слушатель для кнопки редактирования профиля
closeButton.addEventListener('click', closeInfoPopup); // слушатель для кнопки закрыть форму редактирования профиля
formElement.addEventListener('submit', formSubmitHandler); // слушатель для кнопки сохранить формы редактирования профиля
