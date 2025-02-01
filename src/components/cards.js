import moscowImage from "../images/moscow-small.jpg";
import petersburgImage from "../images/saint-petersburg-small.jpg";
import lipetskImage from "../images/lipetskaya-oblast-small.jpg";
import zelenogradskImage from "../images/zelenogradsk-small.jpg";
import dombayImage from "../images/dombay-small.jpg";
import vladivostokImage from "../images/vladivostok-small.jpg";

export const initialCards = [
    {
      name: "Москва",
      link: moscowImage
    },
    {
      name: "Санкт-Петербург",
      link: petersburgImage
    },
    {
      name: "Липецкая область",
      link: lipetskImage
    },
    {
      name: "Зеленоградск",
      link: zelenogradskImage
    },
    {
      name: "Домбай",
      link: dombayImage
    },
    {
      name: "Владивосток",
      link: vladivostokImage
    }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardData, deleteCard, openImage, likeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', function () {
      deleteCard(cardElement);
  });

  likeButton.addEventListener('click', function () {
      likeCard(likeButton);
  });

  cardImage.addEventListener('click', function () {
      openImage(cardImage);
  });
      
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};