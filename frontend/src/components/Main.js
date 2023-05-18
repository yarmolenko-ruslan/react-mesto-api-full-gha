import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const renderCard = (card) => {
    return (
      <Card
        key={card._id}
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  };

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.avatar}
          alt="Фотография пользователя"
          className="profile__avatar"
        />
        <div className="profile__cover" onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <p className="profile__info-subtitle">{currentUser.about}</p>
          <button
            className="profile__info-button button"
            aria-label="Редактировать имя и информацию о себе"
            type="button"
            onClick={onEditProfile}
          />
        </div>
        <button
          className="profile__button button"
          aria-label="Добавить новую карточку места"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">{cards.map(renderCard)}</ul>
      </section>
    </main>
  );
}

export default Main;
