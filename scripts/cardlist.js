'use strict';

class CardList {

    constructor(container, cardArray, card) {
        /** REVIEW: Можно лучше:
        *   card лучше переименовать в getCardInstance или createCard
        **/
        this.container = container;
        /** REVIEW: Можно лучше:
        *   cardArray лучше переименовать в cards
         *  имена во множественном числе указывают, что в переменной итерируемый обьект(массив или Set)
         *  это общепринятое соглашение
        **/
        this.cardArray = cardArray;   //array of objects
        this.card = card;
    }

    render() {
            this.cardArray.forEach( function(cardItem) {
                const newCard = this.card(cardItem.name, cardItem.link, cardTemplate);
                newCard.create();
                this.container.appendChild(newCard.card);
        }.bind(this));
    }

    addCard(event) {
        event.preventDefault();
        const customCard = customCardFromForm();
        customCard.create();
        this.container.appendChild(customCard.card);
    }
}
