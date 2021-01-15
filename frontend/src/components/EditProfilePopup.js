import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    props.isOpen && document.addEventListener('keyup', props.onEscape);

    return () => {
      document.removeEventListener('keyup', props.onEscape);
    };
  }, [props]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name, about });
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleJobChange(evt) {
    setAbout(evt.target.value);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} onLayout={props.onLayout} name="edit-profile" title="Редактирование профиля" isOpen={props.isOpen} isLoading={props.isLoading} buttonText='Сохранить' buttonLoadingText='Сохранение...'>
      <fieldset className="popup__info">
        <input value={name || ''} onChange={handleNameChange} name="name-input" type="text" className="popup__input popup__input_type_name" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__input-error" id="name-input-error" />
        <input value={about || ''} onChange={handleJobChange} name="job-input" type="text" className="popup__input popup__input_type_job" placeholder="Занятие" required minLength="2" maxLength="200" />
        <span className="popup__input-error" id="job-input-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
