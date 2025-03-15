import './pages/index.css';
import {initialCards} from './components/cards.js'; 
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupEnvironment} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, getAllCards, editProfile, createNewCard, changeAvatar} from './components/api.js';

// @todo: DOM узлы
const popups = document.querySelectorAll('.popup');

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAvatar = document.querySelector('.popup_type_new-avatar');
const formAvatar = document.forms['new-avatar'];
const avatarInput = formAvatar.querySelector('.popup__input_type_avatar');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');

const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = document.forms['new-place'];
const titleInput = formNewCard.querySelector('.popup__input_type_card-name');
const linkInput = formNewCard.querySelector('.popup__input_type_url');

const initialCardsList = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_image');
const previewImage = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

const popupButton = document.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__error_visible' 
}

// @todo: Вывести карточки на страницу
Promise.all([getUserInfo(), getAllCards()])
.then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.src = user.avatar;
    const userId = user._id;
 
    cards.forEach((cardData) => { 
        const card = createCard(cardData, {deleteCard, userId, openImage, likeCard});  
        initialCardsList.append(card); 
    })
})
.catch((error) => {
    console.log(error);
});

// Функция открытия попапа с картинкой 
const openImage = (cardImage) => {
    openPopup(popupImage);
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    imageCaption.textContent = cardImage.alt;
}

// Отслеживание клика по аватару, очистка ошибок валидации, открытие попапа "Обновить аватар" и установка пустого значения
profileImage.addEventListener('click', () => {
    clearValidation(formAvatar, validationConfig);
    openPopup(popupAvatar);

    avatarInput.value = '';
});

// Функция обновления аватара, сброс введенных данных и закрытие попапа "Обновить аватар"
const handleFormAvatarSubmit = (evt) => {
    evt.preventDefault();

    saveLoading(true);

    changeAvatar(avatarInput.value)
    .then((result) => {
        profileImage.style.backgroundImage = `url(${result.avatar})`;

        formAvatar.reset();
        closePopup(popupAvatar);
    })
    .catch((error) => {
        console.log(error);
    });
}

// Прикрепляем обработчик события "отправка формы" к попапу "Обновить аватар"
formAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Отслеживание клика по кнопке, очистка ошибок валидации, открытие попапа "Редактировать" и подтягивание значений, которые отображаются в профиле
editButton.addEventListener('click', () => {
    clearValidation(formEdit, validationConfig);
    openPopup(popupEdit);
        
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

// Функция обновления информации в профиле, сброс введенных данных и закрытие попапа "Редактировать"
const handleFormEditSubmit = (evt) => {
    evt.preventDefault();

    saveLoading(true);
    
    editProfile()
    .then(() => {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    formEdit.reset();
    closePopup(popupEdit);    
    })
    .catch((error) => {
        console.log(error);
    }); 
}

// Прикрепляем обработчик события "отправка формы" к попапу "Редактировать"
formEdit.addEventListener('submit', handleFormEditSubmit);

// Перебор всех попапов, поиск кнопки "Х" и отслеживание клика по ней, прикрепляем обработчик события "закрытие по оверлей" и добавление анимации
popups.forEach((popup) => {
    popup.querySelector('.popup__close').addEventListener('click', () => {
        closePopup(popup);
    })
    
    popup.addEventListener('mousedown', closePopupEnvironment);
    popup.classList.add('popup_is-animated');
});

// Отслеживание клика по кнопке, очистка ошибок валидации, открытие попапа "+" и установка пустых значений
addButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationConfig);
    openPopup(popupNewCard);
    
    titleInput.value = '';
    linkInput.value = '';
});

// Функция создания новой карточки, сброс введенных данных и закрытие попапа "+"
const handleFormNewCardSubmit = (evt) => {
    evt.preventDefault();

    saveLoading(true);

    createNewCard(titleInput.value, linkInput.value)
    .then((newCardData) => {
        
    const newCard = createCard(newCardData, {deleteCard, userId, openImage, likeCard});

    initialCardsList.prepend(newCard);
        
    formNewCard.reset();
    closePopup(popupNewCard);
    })
    .catch((error) => {
        console.log(error);
    });
}

// Прикрепляем обработчик события "отправка формы" к попапу "+"
formNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Функция-уведомление пользователя о процессе загрузки
function saveLoading (isLoading) {
    if (isLoading) {
        popupButton.textContent = 'Сохранение...';
    } else {
        popupButton.textContent = 'Сохранить';
    }
}

// Вызов функции enableValidation
enableValidation({
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__error_visible' 
});