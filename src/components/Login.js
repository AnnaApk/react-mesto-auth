import { useState } from "react";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import union2 from '../images/UnionErr.svg';

function Login(props) {

  const [formParametrs, setFormParametrs] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParametrs((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParametrs.email || !formParametrs.password) {
      return;
    }
    props.handleLogin({email: formParametrs.email, password: formParametrs.password})
  }

  return (
    <div className="page">
      <Header />
      <div className="auth">
        <p className="auth__title">Вход</p>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input id="email" name="email" className="auth__input" type="email" value={formParametrs.email} placeholder='Email' onChange={handleChange}></input>
          <input id="password" name="password" className="auth__input" type="password" value={formParametrs.password} placeholder='Пароль' onChange={handleChange}></input>
          <button className="auth__button" type="submit" value="Войти">Войти</button>
        </form>
      </div>
      <InfoTooltip isOpen={props.loggedErr} onClose={props.onClosePopup} union={union2} message={'Что-то пошло не так! Попробуйте ещё раз.'} />
    </div>
  )
}

export default Login