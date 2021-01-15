import React, { useState, useEffect, useRef } from 'react';

export default function InfoTooltip(props) {
  const popup = useRef();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setTitle(props.title);
    setImage(props.image);

    props.isOpen && document.addEventListener('keyup', props.onEscape);

    return () => {
      document.removeEventListener('keyup', props.onEscape);

      setImage('');
      setTitle('');
    };
  }, [props]);

  function handleLayoutClick() {
    props.onLayout(popup.current);
  }

  return (
    <div ref={popup} onClick={handleLayoutClick} className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form name={props.name} className="popup__form">
        <img src={image} alt="Результат запроса" className="popup__tooltip-image" />
        <h2 className="popup__title popup__title_tooltip">{title}</h2>
        <button onClick={props.onClose} type="reset" className="popup__close-button" />
      </form>
    </div>
  )
}
