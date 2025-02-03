import './pages/index.css';
import {initialCards} from './components/cards.js'; 
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupEnvironment} from './components/modal.js';

// @todo: DOM узлы
const popups = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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

const closeButtons = document.querySelectorAll('.popup__close'); 

// Функция открытия попапа с картинкой 
const openImage = (cardImage) => {
    openPopup(popupImage);
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    imageCaption.textContent = cardImage.alt;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const card = createCard(cardData, {deleteCard, openImage, likeCard}); 
    initialCardsList.append(card);
});

// Отслеживание клика по кнопке, открытие попапа "Редактировать" и подтягивание значений, которые отображаются в профиле
editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

// Функция обновления информации в профиле, сборс введенных данных и закрытие попапа "Редактировать"
const handleFormEditSubmit = (evt) => {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    formEdit.reset();
    closePopup(popupEdit);
}

// Прикрепляем обработчик события "отправка формы" к попапу "Редактировать"
formEdit.addEventListener('submit', handleFormEditSubmit);

// Перебор всех попапов и  кнопок "Х", отслеживание клика по кнопке и закрытие попапа, прикрепляем обработчик события "закрытие по оверлей" и добавление анимации
popups.forEach((popup) => {
    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            closePopup(popup);
        })
    })
    popup.addEventListener('mousedown', closePopupEnvironment);
    popup.classList.add('popup_is-animated');
});

// Отслеживание клика по кнопке и открытие попапа "+"
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

// Функция создания и добавления новой карточки в начало контейнера, сборс введенных данных и закрытие попапа "+"
const handleFormNewCardSubmit = (evt) => {
    evt.preventDefault();

    const nameNewCard = titleInput.value;
    const linkNewCard = linkInput.value;

    const newCard = createCard({name: nameNewCard, link: linkNewCard}, {deleteCard, openImage, likeCard}); 

    initialCardsList.prepend(newCard);

    formNewCard.reset();
    closePopup(popupNewCard);
}

// Прикрепляем обработчик события "отправка формы" к попапу "+"
formNewCard.addEventListener('submit', handleFormNewCardSubmit);