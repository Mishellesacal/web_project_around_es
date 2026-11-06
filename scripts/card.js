
import api from "./Api.js";

export class Card {
  constructor(data, cardSelector, handleCardClick, currentUserId, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner?._id ?? data.owner;
  
    this._currentUserId = currentUserId;
    console.log("ID recibido en Card:", currentUserId);
console.log("ID guardado en Card:", this._currentUserId);
    this._isLiked = data.isLiked ?? false;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Dar o quitar like
    this._likeButton.addEventListener("click", () => {
      const request = this._isLiked
        ? api.removeLike(this._id)
        : api.addLike(this._id);

      request
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked;

          this._likeButton.classList.toggle(
            "card__like-button_is-active",
            this._isLiked
          );
        })
        .catch((err) => {
          console.error("Error al actualizar el like:", err);
        });
    });

    // Solicitar confirmación para eliminar
    if (this._ownerId === this._currentUserId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    }

    // Abrir imagen
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Mostrar el like guardado
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked
    );

    // Ocultar basura en tarjetas ajenas
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
  }

  getLink() {
    return this._link;
  }

  getName() {
    return this._name;
  }
}
