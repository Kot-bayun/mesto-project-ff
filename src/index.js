import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/cards.js';
import {openPopup, closePopup} from './components/modal.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');

const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const titleInput = formNewCard.querySelector('.popup__input_type_card-name');
const linkInput = formNewCard.querySelector('.popup__input_type_url');

const initialCardsList = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_image');
const previewImage = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardData) {
    const card = createCard(cardData, deleteCard, openImage, likeCard);
    initialCardsList.append(card);
});

// Отслеживание клика по кнопке, открытие попапа "Редактировать" и подтягивание значений, которые отображаются в профиле
editButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(popupEdit);
    
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

// Функция обновления информации в профиле, сборс введенных данных и закрытие попапа "Редактировать"
function handleFormEditSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    formEdit.reset();
    closePopup(popupEdit);
}

// Прикрепляем обработчик события "отправка формы" к попапу "Редактировать"
formEdit.addEventListener('submit', handleFormEditSubmit);

// Перебор кнопок "X", отслеживание клика и закрытие попапа "Редактировать"
closeButtons.forEach(function (button) {
   button.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup(popupEdit);
   })
});

// Отслеживание клика по кнопке и открытие попапа "+"
addButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(popupNewCard);
});

// Функция создания и добавления новой карточки в начало контейнера, сборс введенных данных и закрытие попапа "+"
function handleFormNewCardSubmit (evt) {
    evt.preventDefault();

    const nameNewCard = titleInput.value;
    const linkNewCard = linkInput.value;

    const newCard = createCard({name: nameNewCard, link: linkNewCard}, deleteCard, openImage, likeCard);

    initialCardsList.prepend(newCard);

    formNewCard.reset();
    closePopup(popupNewCard);
}

// Прикрепляем обработчик события "отправка формы" к попапу "+"
formNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Перебор кнопок "X", отслеживание клика и закрытие попапа "+"
closeButtons.forEach(function (button) {
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        closePopup(popupNewCard);
    })
});

// Функция открытия попапа с картинкой 
function openImage(cardImage) {
    openPopup(popupImage);
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    imageCaption.textContent = cardImage.alt;
  }

// Перебор кнопок "X", отслеживание клика и закрытие попапа с картинкой
closeButtons.forEach(function (button) {
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        closePopup(popupImage);
    })
});


