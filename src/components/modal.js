// Функция открытия попапа с анимацией и обработчиком события "нажата клавиша Esc"
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', closePopupEnvironment)
    document.addEventListener('keydown', closePopupEsc);
}
 
// Функция закрытия попапа и удаление обработчика события "нажата клавиша Esc"
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// Закрытие попапа нажатием на клавишу Esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();

        const openedPopupEsc = document.querySelector('.popup_is-opened');
        closePopup(openedPopupEsc);
    }
}

// Закрытие попапа при клике за его пределами
function closePopupEnvironment(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    
    if (evt.target === openedPopup) {
        evt.preventDefault();
        closePopup(openedPopup);
    }
}

export {openPopup, closePopup};