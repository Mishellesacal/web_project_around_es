export function openModal(editPopup) {
  editPopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
};

export function closeModal(editPopup) {
  editPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
};

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}