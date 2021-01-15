import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  React.useEffect(() => {
    props.isOpen && document.addEventListener('keyup', props.onEscape);

    return () => {
      document.removeEventListener('keyup', props.onEscape);
    };
  }, [props]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit}
    onClose={props.onClose}
    onLayout={props.onLayout}
    name="confirm"
    title="Вы уверены?"
    isOpen={props.isOpen}
    isLoading={props.isLoading}
    buttonText='Да'
    buttonLoadingText='Удаление...' />
  )
}

export default ConfirmPopup;
