import { useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [nameValue, setNameValue] = useState('');
  const [linkValue, setLinkValue] = useState('');

  function handleNameChange(e) {
    setNameValue(e.target.value);
  }

  function handleLinkChange(e) {
    setLinkValue(e.target.value);
  }

  useEffect(() => {
    setNameValue('');
    setLinkValue('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameValue,
      link: linkValue,
    });
  }
  return (
    <PopupWithForm name="new-post" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="new-place-input" className="popup__input popup__input_type_place" type="text" name="NewPlace" placeholder="Название" required minLength="1" maxLength="30" value={nameValue} onChange={handleNameChange} />
      <span className="new-place-input-error popup__input-error"></span>
      <input id="new-photo-input" className="popup__input popup__input_type_photo" type="url" name="NewPhoto" placeholder="Ссылка на картинку" value={linkValue} onChange={handleLinkChange} required />
      <span className="new-photo-input-error popup__input-error"></span>
  </PopupWithForm>
  )
}

export default AddPlacePopup;
