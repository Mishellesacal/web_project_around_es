

import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import api from "./Api.js";

let currentUserId;

// Elementos del HTML
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarImage = document.querySelector(".profile__image");

const formElement = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const avatarForm = document.querySelector("#avatar-popup form");

const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const linkInput = newCardForm.querySelector(".popup__input_type_url");

// Información del usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});

// Ventanas emergentes
const imagePopup = new PopupWithImage("#image-popup");
const deletePopup = new PopupWithConfirmation("#delete-popup");

// Confirmación para eliminar tarjetas
function handleDeleteClick(card) {
  deletePopup.setSubmitAction(() => {
    api.deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deletePopup.close();
      })
      .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
      });
  });

  deletePopup.open();
}

// Crear una tarjeta
function createCard(cardData) {

  console.log("ID enviado a Card:", currentUserId);
  const card = new Card(
    cardData,
    "#card-template",
    (data) => imagePopup.open(data),
    currentUserId,
    handleDeleteClick
  );

  return card.generateCard();
}

// Contenedor de tarjetas
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    }
  },
  ".cards__list"
);

// Guardar cambios del perfil
function handleProfileFormSubmit(inputValues) {
  editPopup.renderLoading(true);

  api.setUserInfo({
    name: inputValues.name,
    about: inputValues.description
  })
    .then((user) => {
      userInfo.setUserInfo({
        name: user.name,
        description: user.about
      });
      editPopup.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el perfil:", err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

// Agregar una tarjeta
function handleAddCardSubmit(inputValues) {
  addCardPopup.renderLoading(true);

  api.addCard({
    name: inputValues[titleInput.name],
    link: inputValues[linkInput.name]
  })
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error al agregar la tarjeta:", err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

// Actualizar el avatar
function handleAvatarFormSubmit(inputValues) {
  avatarPopup.renderLoading(true);

  api.setUserAvatar({
    avatar: inputValues.avatar
  })
    .then((user) => {
      avatarImage.src = user.avatar;
      avatarPopup.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el avatar:", err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

// Formularios emergentes
const editPopup = new PopupWithForm(
  handleProfileFormSubmit,
  "#edit-popup"
);

const addCardPopup = new PopupWithForm(
  handleAddCardSubmit,
  "#new-card-popup"
);

const avatarPopup = new PopupWithForm(
  handleAvatarFormSubmit,
  "#avatar-popup"
);

// Activar eventos de las ventanas
editPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();

// Abrir edición de perfil
editButton.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();

  nameInput.value = currentInfo.name;
  jobInput.value = currentInfo.description;

  editPopup.open();
});

// Abrir formulario de tarjeta
addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Abrir formulario de avatar
avatarImage.addEventListener("click", () => {
  avatarPopup.open();
});

// Configuración de validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form_input_type_error",
  errorClass: "form_input-error_active"
};

// Validar formularios
const editFormValidator = new FormValidator(
  validationConfig,
  formElement
);
editFormValidator.enableValidation();

const newCardValidator = new FormValidator(
  validationConfig,
  newCardForm
);
newCardValidator.enableValidation();

const avatarValidator = new FormValidator(
  validationConfig,
  avatarForm
);
avatarValidator.enableValidation();

// Cargar información desde la API
api.getAppInfo()
  .then(([user, cards]) => {
    currentUserId = user._id;

    userInfo.setUserInfo({
      name: user.name,
      description: user.about
    });

    avatarImage.src = user.avatar;

    cards.forEach((item) => {
      cardSection.addItem(createCard(item));
    });
  })
  .catch((err) => {
    console.error("Error al cargar la información:", err);
  });
