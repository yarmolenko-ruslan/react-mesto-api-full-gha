import logo from "../images/logo.svg";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

function Header({ loggedIn, email, exit }) {
  return (
    <header className="header">
      <a href={logo} alt="Логотип проекта Mesto" className="logo link"></a>
      <div className="header__info">
        <p className="header__email">{loggedIn ? email : ""}</p>
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link className="header__auth" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link className="header__auth" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link className="header__auth" onClick={exit} to="/sign-in">
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
