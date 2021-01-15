import React from 'react';

function PopupWithForm(props) {
  const popup = React.useRef();

  function handleLayoutClick() {
    props.onLayout(popup.current);
  }

  return (
    <div ref={popup} onClick={handleLayoutClick} className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form name={props.name} className="popup__form" noValidate onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__submit-button">{props.isLoading ? props.buttonLoadingText : props.buttonText}</button>
        <button onClick={props.onClose} type="reset" className="popup__close-button" />
      </form>
    </div>
  )
}

export default PopupWithForm;
