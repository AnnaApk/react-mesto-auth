import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ handleRegister }) {
  const [formParametrs, sertFormParametrs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    sertFormParametrs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formParametrs;
    await handleRegister({ email, password });
  };

  return (
    <div className="page">
      <Header />
      <div className="auth">
        <p className="auth__title">Регистрация</p>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            className="auth__input"
            type="email"
            required
            value={formParametrs.email}
            placeholder="Email"
            onChange={handleChange}
          ></input>
          <input
            id="password"
            name="password"
            className="auth__input"
            type="password"
            required
            value={formParametrs.password}
            placeholder="Пароль"
            onChange={handleChange}
          ></input>
          <button className="auth__button">Зарегистрироваться</button>
        </form>
        <div className="auth__to-sign-in">
          <p>Уже зарегистрированны?</p>
          <Link to="sign-in" className="auth__link-sign-in">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
