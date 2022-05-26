import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import { register } from "../utils/Auth";
import union1 from '../images/UnionSuc.svg';
import union2 from '../images/UnionErr.svg';

function Register() {

  const [formParametrs, sertFormParametrs] = useState({
    email: '',
    password: '',
  })

  const [isSuccess, setIsSuccess] = useState(false);
  const [notSuccess, setNotSuccess] = useState(false);

  const history = useHistory();

  const handleSuccess = () => {
    setIsSuccess(true)
  }

  const closeSuccessPopup = () => {
    setIsSuccess(false)
    history.push('/sign-in')
  }

  const closeErrPopup = () => {
    setNotSuccess(false)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    sertFormParametrs((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = ({email, password}) => {
    return register(email, password)
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        setNotSuccess(true);
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let {email, password} = formParametrs;
    const data = await handleRegister({email, password});
    if (data && data.email && data._id) {
      handleSuccess()
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="auth">
        <p className="auth__title">Регистрация</p>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input id="email" name="email" className="auth__input" type="email" required value={formParametrs.email} placeholder='Email' onChange={handleChange}></input>
          <input id="password" name="password" className="auth__input" type="password" required value={formParametrs.password} placeholder='Пароль' onChange={handleChange}></input>
          <button className="auth__button">Зарегистрироваться</button>
        </form>
        <div className="auth__to-sign-in">
          <p>Уже зарегистрированны?</p>
          <Link to="sign-in" className="auth__link-sign-in">Войти</Link>
        </div>
      </div>
      <InfoTooltip isOpen={isSuccess} onClose={closeSuccessPopup} union={union1} message={'Вы успешно зарегистрировались!'} />
      <InfoTooltip isOpen={notSuccess} onClose={closeErrPopup} union={union2} message={'Что-то пошло не так! Попробуйте ещё раз.'} />
    </div>
  )
}

export default Register
