function InfoTooltip(props) {

  const className = `popup ${props.isOpen ? 'popup_active' : ''}`

  return(
    <div className={className}>
      <div className="popup__container">
      <div className="popup__body popup__overlay">
          <img src={props.union} className="popup__union" />
          <p className="popup__subtitle">{props.message}</p>
          <button className="popup__close popup__close_profile" type="button" onClick={props.onClose}></button>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
