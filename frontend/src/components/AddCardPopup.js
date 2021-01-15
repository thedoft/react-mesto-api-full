import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddCardPopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');

    props.isOpen && document.addEventListener('keyup', props.onEscape);

    return () => {
      document.removeEventListener('keyup', props.onEscape);
    };
  }, [props]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({ name, link });
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} onLayout={props.onLayout} name="add-card" title="Новое место" isOpen={props.isOpen} isLoading={props.isLoading} buttonText='Добавить' buttonLoadingText='Добавление...'>
      <fieldset className="popup__info">
        <input value={name || ''} onChange={handleNameChange} name="place-input" type="text" className="popup__input popup__input_type_place"  placeholder = 'Название' required minLength="1" maxLength="30" />
        <span className="popup__input-error" id="place-input-error" />
        <input value={link || ''} onChange={handleLinkChange} name="link-input" type="url" className="popup__input popup__input_type_link" placeholder = 'Ссылка на картинку' required />
        <span className="popup__input-error" id="link-input-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default AddCardPopup;
