import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const card = props.card;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardTrashButtonClassName = (
    `element__trash-button ${isOwn ? '' : 'element__trash-button_hidden'}`
  );
  const isLiked = card.likes.some(user => user === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="element">
      <img className="element__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="element__title-container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="element__likes-count">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className={cardTrashButtonClassName} onClick={handleDeleteClick} />
    </li>
  )
}

export default Card;
