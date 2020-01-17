'use strict';

const cardCreationForm = document.forms.new;
const cardContainer = document.querySelector('.places-list');
const editForm = document.forms.editinfo;
const pictureContainer = document.getElementById('picture');
const editProfileContainer = document.getElementById('edit');
const popupContainer = document.getElementById('newplace');
const openEditFormButton = document.querySelector('.profile__edit-button');
const openPlaceFormButton = document.querySelector('.user-info__button');
const name = document.querySelector('.user-info__name');
const info = document.querySelector('.user-info__job');
const cardTemplate = document.getElementById('card-sample');

/** REVIEW: Можно лучше:
 *  Можно переписать в одну строку с помощью стрелочной функции
*   const createCard = (cName, cLink, cTemplate) => new Card(cName, cLink, cTemplate);
**/
const newCard = function(cName, cLink, cTemplate) {
  const card = new Card(cName, cLink, cTemplate);
  return card;
}
const customCardFromForm = function() {
  const card = new Card(cardCreationForm.name.value, cardCreationForm.link.value, cardTemplate);
  return card;
}

const formValidator = function(form) {
  const validator = new FormValidator(form);
  return validator;
}

const list = new CardList(cardContainer, initialCards, newCard);
const editPopup = new Form(editProfileContainer, formValidator);
const placePopup = new Form(popupContainer, formValidator);
const picturePopup = new Popup(pictureContainer);
const userInfo = new UserInfo(name.textContent, info.textContent);


list.render();                               //add initial cards
/** REVIEW: Можно лучше:
*   Старый код лучше сразу удалять, а не комментировать, история обычно хранится в системе контроля версий,
 *   если понадобится обратиться к старому коду
**/

/** REVIEW: В целом по работе:
 * Хорошая работа, вся функциональность работает без багов и критических замечаний, код отрефакторен на классы.
 *
 * Что сделано хорошо:
 * - Использовано наследование классов
 * - Попапы закрываются по ESC и клику вне форм
 * - Код хорошо струтурирован и читаем
 *
 * Что можно улучшить(необязательно):
 * - Ссылки на инстансы других классов, сущности и другие необходимые данные для работы классов передавать
 * через конструктор. Это позволит сделать класс максимально изолированным и переносимым.
 * - В обработчиках нужно явно обьявлять аргумент event. Использование window.event считается устаревшим и
 * может приводить к ошибкам
 * - Лишний код: файл elisteners.js
 *
 *
 **/
