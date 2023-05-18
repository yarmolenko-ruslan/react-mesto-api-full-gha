import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { api, auth } from "../utils/Api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditPopupAvatar, setEditPopupAvatar] = useState(false);
  const [isEditPopupProfile, setEditPopupProfile] = useState(false);
  const [isEditPopupAddPlace, setEditPopupAddPlace] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isToolTipVisible, setToolTipVisible] = useState(false);
  const [isToolTipSuccess, setToolTipSuccess] = useState(false);
  const [toolTipText, setToolTipText] = useState("");
  const navigate = useNavigate();

  function onRegister(password, email) {
    auth
      .signUp({ password: password, email: email })
      .then((data) => {
        setToolTipSuccess(true);
        setToolTipVisible(true);
        setToolTipText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch((err) => {
        setToolTipSuccess(false);
        setToolTipVisible(true);
        setToolTipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function onLogin(password, email) {
    auth
      .signIn({ password: password, email: email })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setToolTipVisible(true);
        setToolTipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");

    setLoggedIn(false);
  }

  function closeToolTip() {
    setToolTipVisible(false);
  }

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .getUserAuth(jwt)
        .then((data) => {
          setEmail(data.data.email);
          setLoggedIn(true);
        })
        .then(() => navigate("/"))
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditAvatarClick() {
    setEditPopupAvatar(true);
  }

  function handleEditProfileClick() {
    setEditPopupProfile(true);
  }

  function handleAddPlaceClick() {
    setEditPopupAddPlace(true);
  }

  function closeAllPopups() {
    setEditPopupAvatar(false);
    setEditPopupProfile(false);
    setEditPopupAddPlace(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name: name, about: about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchUserAvatar({ avatar: avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateCard({ name, link }) {
    api
      .postCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const isOpen =
    isEditPopupAvatar ||
    isEditPopupProfile ||
    isEditPopupAddPlace ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function stopProp(e) {
    e.stopPropagation();
  }

  const setNewCards = (id, newCard) => {
    setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLikes(card._id, !isLiked)
        .then((newCard) => {
          setNewCards(card._id, newCard);
        })
        .catch(console.error);
    } else {
      api
        .putLikes(card._id, isLiked)
        .then((newCard) => {
          setNewCards(card._id, newCard);
        })
        .catch(console.error);
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} exit={signOut} loggedIn={loggedIn} />

        <Routes>
          <Route path="/mesto-react" element={<Navigate to="/" replace />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />

          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/"
              element={
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Route>
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditPopupProfile}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          propagation={stopProp}
        />
        <EditAvatarPopup
          isOpen={isEditPopupAvatar}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          propagation={stopProp}
        />
        <AddPlacePopup
          isOpen={isEditPopupAddPlace}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
          propagation={stopProp}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          propagation={stopProp}
        />

        <InfoTooltip
          isVisible={isToolTipVisible}
          isSuccess={isToolTipSuccess}
          onClose={closeToolTip}
          text={toolTipText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
