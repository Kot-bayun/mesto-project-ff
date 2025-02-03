// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = (cardData, {deleteCard, openImage, likeCard} = {}) => { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', () => {
    openImage(cardImage);
  });

  likeButton.addEventListener('click', () => {
    likeCard(likeButton);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
}

// Функция лайка карточки
const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};