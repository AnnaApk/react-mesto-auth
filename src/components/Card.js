import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  const {_id} = useContext(CurrentUserContext);

  const isOwn = props.owner._id === _id;

  const isLiked = props.likes.some(i => i._id === _id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );  

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    
      <div className="element">
        <div className="element__photo-container" onClick={handleClick}>
          <img className="element__photo" src={props.link} alt={props.name} />
        </div>
        <div className="element__group">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__like-group">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="element__likes-count">{props.likes.length}</span>
          </div>
        </div>
        {
         isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>
        }
      </div>
    
  )
}