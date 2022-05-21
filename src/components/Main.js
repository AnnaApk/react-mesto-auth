import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const {name, about, avatar} = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <div className="profile__photo-container" onClick={props.onEditAvatar} >
            <img className="profile__photo" src={avatar} alt="Фото профиля" />
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__user-name">{name}</h1>
              <button className="profile__change" type="button" onClick={props.onEditProfile}></button>
            </div>
            <h2 className="profile__job">{about}</h2>
          </div>
        </div>
        <button className="profile__add-post" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
       {props.cards.map((card) => (
          <Card {...card} key={card._id} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main
