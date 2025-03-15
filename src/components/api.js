// Группирование единообразных данных
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32'
  }

// Загрузка информации о пользователе с сервера 
const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Загрузка всех карточек с сервера
const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Редактирование профиля 
const editProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Kascheyka',
            about: 'Gold keeper'
        })
    })    
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Добавление пользователем новой карточки на сервер
const createNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, link})
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Удаление карточки с сервера
const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Лайк карточки на сервере
const likeCardAtServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Удаление лайка с карточки на сервере
const deleteLikeAtServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

// Обновление аватара пользователя
const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar})
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })
}

export {getUserInfo, getAllCards, editProfile, createNewCard, deleteCardFromServer, likeCardAtServer, deleteLikeAtServer, changeAvatar};