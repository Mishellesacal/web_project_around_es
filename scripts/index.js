
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

// Elementos del HTML
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const formElement = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const linkInput = newCardForm.querySelector(".popup__input_type_url");

// Información del perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});

// Ventana de imagen
const imagePopup = new PopupWithImage("#image-popup");

// Función para guardar los cambios del perfil
function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues[nameInput.name],
    description: inputValues[jobInput.name]
  });

  editPopup.close();
}

// Ventana de edición del perfil
const editPopup = new PopupWithForm(
  handleProfileFormSubmit,
  "#edit-popup"
);

// Función para crear una tarjeta nueva
function handleAddCardSubmit(inputValues) {
  const cardData = {
    name: inputValues[titleInput.name],
    link: inputValues[linkInput.name]
  };

  const card = new Card(
    cardData,
    "#card-template",
    (data) => imagePopup.open(data)
  );

  cardSection.addItem(card.generateCard());
  addCardPopup.close();
}

// Ventana para agregar tarjetas
const addCardPopup = new PopupWithForm(
  handleAddCardSubmit,
  "#new-card-popup"
);

// Sección de tarjetas
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        (data) => imagePopup.open(data)
      );

      cardSection.addItem(card.generateCard());
    }
  },
  ".cards__list"
);

// Mostrar las tarjetas iniciales
cardSection.renderItems();

// Activar los eventos de las ventanas
editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Abrir el formulario de edición con los datos actuales
editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.description;

  editPopup.open();
});

// Abrir el formulario para agregar tarjetas
addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Validación de formularios
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form_input_type_error",
  errorClass: "form_input-error_active"
};

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