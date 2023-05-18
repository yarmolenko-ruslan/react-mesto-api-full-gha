import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like button ${
    isLiked && "element__like_active"
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleCardDelet = () => {
    onCardDelete(card);
  };

  return (
    <li className="element">
      {isOwner && (
        <button
          className="element__trash-btn button"
          aria-label="Удалить карточку"
          type="button"
          onClick={handleCardDelet}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleCardLike}
          />
          <span className="element__like-quantity">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
