'use strict';

class Popup {

    constructor(thisPopup) { //accepts DOM popup elements
        /** REVIEW: Можно лучше:
        *   thisPopup можно переименовать в popupElement
         *   так будет понятно, что в переменной HTMLElement и какой, комментарий при этом можно опустить
        **/
        this.thisPopup = thisPopup;
        this.closeButton = thisPopup.querySelector('.popup__close');
    }

    open() {
        this.thisPopup.classList.add('popup_is-opened');
        this.thisPopup.addEventListener('click', this.close.bind(this));
    }

    close(event) {
        const self = this;
        const removeImage = () => {
            if (self.thisPopup === pictureContainer) {
                self.thisPopup.querySelector('.popup__image').removeAttribute('src');
            }
        }

        if (event.type === 'click') {
            if (event.target.closest('.popup__content') === null || event.target === self.closeButton) { //handles clicks
                self.thisPopup.classList.remove('popup_is-opened');
                removeImage();
                this.thisPopup.removeEventListener('click', this.close.bind(this));
            }
        } else {
            self.thisPopup.classList.remove('popup_is-opened'); //handles ESC button
            removeImage();
            this.thisPopup.removeEventListener('click', this.close.bind(this));
        }
    }
}


class Form extends Popup {

    constructor(thisPopup, validator) {
        super(thisPopup);
        this.form = this.thisPopup.querySelector('.popup__form');
        this.validator = validator;
        this.validity = this.validator(this.form);
    }

    open() {
        super.open();
        this.formReset();
        this.formInitialize();
    }

    close(event) {
        super.close(event);
        if (event.target.closest('.popup__content') === null || event.target === this.closeButton) {
            this.formReset();
        }

        /** REVIEW: Можно лучше:
        *   Этот код не снимет ранее установленные обработчики, т.к. вторым аргументом в removeEventListener нужно передать
            *   ссылки на колбеки, которые использовались при добавлении обработчика. Пример:
            *   const handleClick = (event) => {console.log(event)};
            *   button.addEventListener(`click`, handleClick);
            *   button.removeEventListener(`click`, handleClick);
         *
         *   bind так же создаст новые функции - нужно передавать ссылки на ранее созданные обработчики
         *   можно сохранить их в this.handlers при создании к примеру
        **/
        this.thisPopup.removeEventListener('input', this.checkInput.bind(this));
        this.thisPopup.removeEventListener('keyup', this.setButton.bind(this));
    }

    formReset() {
        this.form.reset();
        this.form.querySelector('.popup__button').setAttribute('disabled', '');
        Array.from(this.form.querySelectorAll('.popup__input-error')).forEach( (element) =>
            element.textContent = '');
    }

    formInitialize() {
        if (this.form === editForm) {
            this.form.name.value = name.textContent; //sets default values of edit form input fields
            this.form.info.value = info.textContent;
            this.validity.setSubmitButtonState();
        }

        /** REVIEW: Можно лучше:
         * Можно так сохранить обработчики для их последующей возможности удаления через this.thisPopup.removeEventListener
        *   this.handlers = {
         *     checkInput: this.checkInput.bind(this),
         *     setButton: this.setButton.bind(this)
         *   }
         *
         *      this.thisPopup.addEventListener('input', this.handlers.checkInput);
                this.thisPopup.addEventListener('keyup', this.handlers.setButton);
        **/

        this.thisPopup.addEventListener('input', this.checkInput.bind(this));
        this.thisPopup.addEventListener('keyup', this.setButton.bind(this));
    }

    checkInput(event) {
        this.validity.checkInputValidity(event);
    }

    setButton() {
        this.validity.setSubmitButtonState();
    }
}
