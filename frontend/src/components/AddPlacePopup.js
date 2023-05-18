import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onUpdateCard, propagation }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateCard({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      propagation={propagation}
    >
      <input
        className="popup__input popup__input_place_top"
        id="input-name"
        name="cardName"
        minLength={2}
        maxLength={30}
        placeholder="Название"
        type="text"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span
        className="popup__input-error input-title-error"
        id="cardNameError"
      ></span>
      <input
        className="popup__input popup__input_place_bottom"
        id="input-link"
        name="cardLink"
        placeholder="Ссылка на картинку"
        type="url"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span
        className="popup__input-error input-link-error"
        id="cardLinkError"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
