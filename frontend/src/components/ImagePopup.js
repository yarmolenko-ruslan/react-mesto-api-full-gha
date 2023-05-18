function ImagePopup({ card, onClose, propagation }) {
  return (
    <div
      className={`popup popup-image ${card && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup-image__container" onClick={propagation}>
        <button className="popup__close button" onClick={onClose} />
        <img className="popup-image__img" src={card?.link} alt={card?.name} />
        <p className="popup-image__title">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
