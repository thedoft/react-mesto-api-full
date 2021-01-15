import React from 'react';

function ImagePopup(props) {
  const card = props.card;
  const popup = React.useRef();

  function handleLayoutClick() {
    props.onLayout(popup.current);
  }

  React.useEffect(() => {
    props.isOpen && document.addEventListener('keyup', props.onEscape);

    return () => {
      document.removeEventListener('keyup', props.onEscape);
    };
  }, [props]);

  return (
    <div ref={popup} onClick={handleLayoutClick} className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
        <button onClick={props.onClose} type="reset" className="popup__close-button" />
      </div>
    </div>
  )
}

export default ImagePopup;
