import {useState} from 'react';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  };

  function handleChangePassword(e) {
    setPassword(e.target.value);
  };

  function handleLogin(evt) {
    evt.preventDefault();
    onLogin(password, email);
  }

  return(
    <div className="login">
      <p className="login__title">Вход</p>
      <form className="login__form" onSubmit={handleLogin}>
        <input className="login__input" placeholder="Email" name="email" type="email" value={email || ""} onChange={handleChangeEmail} required />
        <input className="login__input" placeholder="Пароль" name="password" type="password" value={password || ""} onChange={handleChangePassword} required />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
    </div>
  )
}

export default Login;