'use strict';

class FormValidator {

      constructor(form) {
          // this.form = form;
          this.button = form.querySelector('.popup__button');
          this.inputs = form.querySelectorAll('.popup__input');
          this.errorMessage = '';
      }

      checkInputValidity(event) {
          const element = event.target;
          if ((element.validity.tooLong || element.validity.tooShort) && (element.type !== 'url')) {
            this.errorMessage = 'Должно быть от 2 до 30 символов';
            this.showErrorMessage(element);
          } else if (element.validity.typeMismatch) {
            this.errorMessage = 'Здесь должна быть ссылка';
            this.showErrorMessage(element);
          } else if (element.validity.valueMissing) {
            this.errorMessage = 'Это обязательное поле';
            this.showErrorMessage(element);
          } else {
            this.errorMessage = '';
            this.showErrorMessage(element);
          }
        }

      showErrorMessage(element) {
          element.nextElementSibling.textContent = this.errorMessage;     //prints error messages
      }

      setSubmitButtonState() {
          const self = this;
          const isFormValid = Array.from(self.inputs).every((input) => input.validity.valid);
          if (isFormValid) {
              /** REVIEW: Можно лучше:
              *   removeAttribute не пинимает второй аргумент, его можно опустить
              **/
            this.button.removeAttribute('disabled', '');
          } else {
            this.button.setAttribute('disabled', '');
          }
      }

  }
