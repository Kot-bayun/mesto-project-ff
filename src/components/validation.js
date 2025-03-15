// Функция добавления ошибки полю
const showInputError = (popupFormElement, popupFormInput, errorMessage, validationConfig) => {
    const errorElement = popupFormElement.querySelector(`.${popupFormInput.id}-error`);
    popupFormInput.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
}

// Функция удаления ошибки поля
const hideInputError = (popupFormElement, popupFormInput, validationConfig) => {
    const errorElement = popupFormElement.querySelector(`.${popupFormInput.id}-error`);
    popupFormInput.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

// Функция для проверки валидности всех полей и вызова функции добавления/удаления ошибки поля в зависимости от результата проверки
const checkInputValidity = (popupFormElement, popupFormInput, validationConfig) => {
    if (popupFormInput.validity.patternMismatch) {
        popupFormInput.setCustomValidity(popupFormInput.dataset.errorMessage);
    } else {
        popupFormInput.setCustomValidity('');
    }
    
    if (!popupFormInput.validity.valid) {
        showInputError(popupFormElement, popupFormInput, popupFormInput.validationMessage, validationConfig);
    } else {
        hideInputError(popupFormElement, popupFormInput, validationConfig);
    }
}

// Функция отключения и включения кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList, validationConfig)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

// Функция настраивания статуса кнопки в зависимости от валидности полей формы
const hasInvalidInput = (inputList) => {
    return inputList.some((popupFormInput) => {
        return !popupFormInput.validity.valid;
    })
}

// Функция добавления слушателя событий и обработчика всем полям формы
const setEventListeners = (popupFormElement, validationConfig) => {
    const inputList = Array.from(popupFormElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = popupFormElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);
    
    inputList.forEach((popupFormInput) => {
        popupFormInput.addEventListener('input', () => {
            checkInputValidity(popupFormElement, popupFormInput, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        })
    })
}

// Функция включения валидации всех форм
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    
    formList.forEach((popupFormElement) => {
        setEventListeners(popupFormElement, validationConfig);
    })
}

// Функция очистки ошибок валидации, которые могли остаться с прошлого открытия попапа
const clearValidation = (popupFormElement, validationConfig) => {
    const inputList = Array.from(popupFormElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = popupFormElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((popupFormInput) => {
        hideInputError(popupFormElement, popupFormInput, validationConfig);
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    })
}

export {enableValidation, clearValidation}