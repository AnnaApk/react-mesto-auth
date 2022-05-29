import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="new-avatar-input"
        className="popup__input popup__input_type_avatar"
        type="url"
        name="newAvatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="new-avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
