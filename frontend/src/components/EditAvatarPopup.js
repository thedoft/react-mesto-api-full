import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatar = React.useRef();

  React.useEffect(() => {
    avatar.current.value = '';
    props.isOpen && document.addEventListener('keyup', props.onEscape);

    return () => {
      document.removeEventListener('keyup', props.onEscape);
    };
  }, [props]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar: avatar.current.value });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} onLayout={props.onLayout} name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen} isLoading={props.isLoading} buttonText='Обновить' buttonLoadingText='Обновление...'>
      <fieldset className="popup__info">
        <input ref={avatar} name="avatar-input" type="url" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="avatar-input-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
