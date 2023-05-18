import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleRegister(evt) {
    evt.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form className="register__form" onSubmit={handleRegister}>
        <input
          className="register__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email || ""}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="register__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={password || ""}
          onChange={handleChangePassword}
          required
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <p className="register__signup-text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="register__signup-link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
