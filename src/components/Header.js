import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  const location = useLocation();
 
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {(location.pathname === '/sign-up') && <Link to="/sign-in" className="auth__link-sign-in">Войти</Link>}
      {(location.pathname === '/sign-in') && <Link to="/sign-up" className="auth__link-sign-in">Зарегистрироваться</Link>}
      {(location.pathname === '/') && (
      <div className="container">
        <p>{props.userData}</p>
        <Link to="/sign-in" className="auth__link-sign-in" onClick={props.signOut}>Выйти</Link>
      </div>)}
    </header>
  )
}

export default Header
