export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
}

_getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
    .querySelector(".card")
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handlerLikeIcon);
    this._deleteButton.addEventListener("click", this._handlerDeleteCard);
    this._cardImage.addEventListener("click", () => this._handleCardClick(this));

  }
  _handlerLikeIcon =() => {
    this._likeButton.classList.toggle("card__like-button_is-active");
  };
_handlerDeleteCard =() => {
  this._element.remove();
  this._element = null;
};


  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.addEventListener("click", () => {
      this._handleCardClick(this);
    });
    return this._element;
  }
  getLink() {
    return this._link;
  }

  getName() {
    return this._name;
  }
}
