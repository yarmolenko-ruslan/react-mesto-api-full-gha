function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
  propagation,
}) {
  return (
    <div
      className={`popup ${isOpen && "popup_opened"} popup_${name}`}
      onClick={onClose}
    >
      <div
        className={`popup__container popup__container_${name}`}
        onClick={propagation}
      >
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <button
          className={`popup__close button popup__close_${name}`}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <form
          className={`popup__form form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__button button popup__button_${name}`}
            aria-label={buttonText}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
