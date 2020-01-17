'use strict';

class Card {

    constructor(name, link, template) {
        this.name = name;
        this.link = link;
        this.card = template.content.cloneNode(true);
        this.image = pictureContainer.querySelector('.popup__image');
    }

    create() {
        const cardImage = this.card.querySelector('.place-card__image');
        const cardName = this.card.querySelector('.place-card__name');
        const deleteIcon = this.card.querySelector('.place-card__delete-icon');
        const self = this;

        cardName.textContent = this.name;
        cardImage.style.backgroundImage = `url(${this.link})`;

        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        this.card.querySelector('.place-card__image').addEventListener('click', (event) => {
            if (event.target !== deleteIcon) {
                /** REVIEW: Можно лучше:
                *   self = this можно не создавать, а сразу обращаться к this, т.к. функция стрелочная и не имеет своего контекста
                **/
                self.openPic(event);
            }
        });
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
        event.target.style.outline = 'none';
    }

    remove(event) {
        event.target.closest('.place-card').remove();
    }

    openPic(event) {
        /** REVIEW: Можно лучше:
        *   Ссылку на другие инстансы лучше передать через конструктор для уменьшения связанности кода
        **/
        picturePopup.open();
        const cardImage = event.target.closest('.place-card__image').style.backgroundImage.slice(4, -1).replace(/"/g, "");
        this.image.setAttribute('src', `${cardImage}`);                      //pass the imape url to popup
    }
}
