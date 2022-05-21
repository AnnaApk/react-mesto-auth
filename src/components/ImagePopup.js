function ImagePopup(props) {
  return (
    <div className={`popup popup_photo ${props.card && 'popup_active'}`}>
      <div className="popup__container">
        {
          props.card && (
          <div className="popup__photo-group popup__overlay">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <h3 className="popup__photo-title">{props.card.name}</h3>
          <button className="popup__close popup__close_photo" type="button" onClick={props.onClose}></button>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default ImagePopup
