function PopupWithForm(props) {

  const className = `popup popup_${props.name} ${props.isOpen ? 'popup_active' : ''}`

  return(
    <div className={className}>
      <div className="popup__container">
        <form className="popup__body popup__overlay" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <input className="popup__submit" type="submit" value="Сохранить" />
          <button className="popup__close popup__close_profile" type="button" onClick={props.onClose}></button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
