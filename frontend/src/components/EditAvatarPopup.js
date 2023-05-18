import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, propagation }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      propagation={propagation}
    >
      <input
        className="popup__input popup__input_place_bottom popup__input-change"
        name="avatarLink"
        placeholder="Введите ссылку на аватар"
        type="url"
        required
        ref={avatarRef}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
