// Группирование единообразных данных
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
        authorization: '84bb8fca-5e09-4f25-b1db-24d07d91b050',
        'Content-Type': 'application/json'
    }
}

const replyPromise = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

// Загрузка информации о пользователе с сервера 
const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(replyPromise)
}

// Загрузка всех карточек с сервера
const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(replyPromise)
}

// Редактирование профиля 
const editProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: 'Kascheyka',
            about: 'Gold keeper'
        })
    })    
    .then(replyPromise)
}

// Добавление пользователем новой карточки на сервер
const createNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
    .then(replyPromise)
}

// Удаление карточки с сервера
const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(replyPromise)
}

// Лайк карточки на сервере
const likeCardAtServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(replyPromise)
}

// Удаление лайка с карточки на сервере
const deleteLikeAtServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(replyPromise)
}

// Обновление аватара пользователя
const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar})
    })
    .then(replyPromise)
}

export {getUserInfo, getAllCards, editProfile, createNewCard, deleteCardFromServer, likeCardAtServer, deleteLikeAtServer, changeAvatar};