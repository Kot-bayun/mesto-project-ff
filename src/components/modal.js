// Функция открытия попапа с обработчиком события "нажата клавиша Esc"
const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}
 
// Функция закрытия попапа и удаление обработчика события "нажата клавиша Esc"
const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// Закрытие попапа нажатием на клавишу Esc
const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {

        const openedPopupEsc = document.querySelector('.popup_is-opened');
        closePopup(openedPopupEsc);
    }
}

// Закрытие попапа при клике за его пределами
const closePopupEnvironment = (evt) => {
    const openedPopup = document.querySelector('.popup_is-opened');
    
    if (evt.target === openedPopup) {
        closePopup(openedPopup);
    }
}

export {openPopup, closePopup, closePopupEnvironment};