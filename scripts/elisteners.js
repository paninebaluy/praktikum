'use strict';

/** REVIEW: Можно лучше:
*   Лишний код. setEventListeners не используется
**/
const setEventListeners = function() {

  openEditFormButton.addEventListener('click', () => {
    editPopup.open();
  });
  openPlaceFormButton.addEventListener('click', () => {
    placePopup.open();
  });

document.addEventListener('keydown', (event) => {
    const openPop = document.querySelector('.popup_is-opened');
    if (document.body.contains(openPop) && event.key === 'Escape') {
      if (openPop === editProfileContainer) {
        editPopup.close(event);
      } else if (openPop === popupContainer) {
        placePopup.close(event);
      } else if (openPop === pictureContainer) {
        picturePopup.close(event);
     }
   }
 });

  cardCreationForm.addEventListener('submit', (event) => {
    const submitButton = cardCreationForm.querySelector('.popup__button');
    if (!submitButton.hasAttribute('disabled')) {
      list.addCard(event);
      placePopup.close(event);
      placePopup.formReset();
    }
  });

  editForm.addEventListener('submit', (event) => {
    const submitButton = editForm.querySelector('.popup__button');
    if (!submitButton.hasAttribute('disabled')) {
      userInfo.updateUserInfo(event);
      editPopup.close(event);
      editPopup.formReset();
    }
  });

}();
