import {deleteCardFromServer, likeCardAtServer, deleteLikeAtServer} from '../components/api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = (cardData, {deleteCard, userId, openImage, likeCard} = {}) => { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;
  
  if (cardData.owner._id !== userId) {
    deleteButton.setAttribute('hidden', 'true');
  } else {
    deleteButton.removeAttribute('hidden', 'false');
  }

  if (cardData.likes.some((userLike) => {
    return userLike._id === userId;
  })) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement, cardData._id);
  });

  cardImage.addEventListener('click', () => {
    openImage(cardImage);
  });

  likeButton.addEventListener('click', () => {
    likeCard(likeButton, cardData._id, cardLikeCount);
  });

  return cardElement;
}

// @tod: Функция удаления карточки
const deleteCard = (cardElement, cardId) => {
deleteCardFromServer(cardId)
.then(() => {
  cardElement.remove();
})
.catch((error) => {
    console.log(error);
})
}

// Функция проставления/снятия лайка и изменеия количества лайков
const likeCard = (likeButton, cardId, cardLikeCount) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeAtServer(cardId)
    .then((result) => {
      likeButton.classList.remove('card__like-button_is-active');
      cardLikeCount.textContent = result.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    likeCardAtServer(cardId)
    .then((result) => {
      likeButton.classList.add('card__like-button_is-active');
      cardLikeCount.textContent = result.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export {createCard, deleteCard, likeCard};