import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, propagation }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function hendleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      propagation={propagation}
    >
      <input
        className="popup__input popup__input_place_top"
        name="userName"
        value={name || ""}
        onChange={hendleChangeName}
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        type="text"
        required
      />
      <span
        className="popup__input-error input-name-error"
        id="userNameError"
      ></span>
      <input
        className="popup__input popup__input_place_bottom"
        name="userAbout"
        value={description || ""}
        onChange={handleChangeDescription}
        placeholder="Род занятия"
        minLength={2}
        maxLength={200}
        type="text"
        required
      />
      <span
        className="popup__input-error input-about-error"
        id="userAboutError"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;