import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  useEffect(() => {
    setNameValue(currentUser.name);
    setDescriptionValue(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleNameChange(e) {
    setNameValue(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescriptionValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: nameValue,
      about: descriptionValue,
    });
  }

  return (
  <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
    <input id="name-input" className="popup__input popup__input_type_name" type="text" name="userName" required minLength="2" maxLength="40" value={nameValue || ''} onChange={handleNameChange} />
    <span className="name-input-error popup__input-error"></span>
    <input id="job-input" className="popup__input popup__input_type_job" type="text" name="userJob" required minLength="2" maxLength="200" value={descriptionValue || ''} onChange={handleDescriptionChange} />
    <span className="job-input-error popup__input-error"></span>
  </PopupWithForm>
  )
  
}

export default EditProfilePopup;
