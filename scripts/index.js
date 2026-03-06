import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { openModal, closeModal, handleEscClose } from "./utils.js";


const initialCards = [{
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
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
},
{
  name: "Parque Nacional de la Vanoise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
},
{
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
}];


const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const CloseButton = editPopup.querySelector(".popup__close");


editButton.addEventListener("click", () => {
  handleOpenEditModal();
});

CloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formElement = document.querySelector("#edit-profile-form");


function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
};

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
};


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editPopup);

};
formElement.addEventListener("submit", handleProfileFormSubmit);

function handleImageClick(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(imagePopup);
}
;



const allPopups = document.querySelectorAll(".popup");

allPopups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

const cardsList = document.querySelector(".cards__list");


const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const newCardInputs = newCardForm.querySelectorAll(".popup__input");
const profileInputs = formElement.querySelectorAll(".popup__input");
console.log(profileInputs);




const getCardElement = (data) => {


  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = data.name || "sin titulo";
  cardImage.src = data.link || "./images/placeholder.jpg";
  cardImage.alt = data.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteClick);

  cardImage.addEventListener("click", () => {
    handleImageClick(data);
  });
  return cardElement;
};

const handleLikeClick = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
}
const handleDeleteClick = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
}


const renderCard = (data, wrap) => {
  wrap.prepend(getCardElement(data));
};


function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard({name: titleInput.value, link: linkInput.value}, cardsList);

  closeModal(document.querySelector("#new-card-popup"));
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

const submitButton = newCardForm.querySelector(".popup__button");
const submitGuardar = formElement.querySelector(".popup__button");
const inputs = document.querySelectorAll(".popup__input");

const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const linkInput = newCardForm.querySelector(".popup__input_type_url");



addButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

initialCards.forEach((item) => {
  renderCard({name: item.name, link: item.link}, cardsList);
});

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit-button_disabled"
};

const editFormValidator = new FormValidator(validationConfig, formElement);
editFormValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.enableValidation();
