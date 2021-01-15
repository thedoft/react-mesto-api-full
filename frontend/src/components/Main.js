import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    props.setHeaderNavlinkData('/signin', 'Выйти');

    return () => {
      props.setHeaderNavlinkData('/', '');
    }
  });

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
          <button onClick={props.onEditAvatar} type="button" className="profile__edit-button profile__edit-button_type_avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button profile__edit-button_type_profile" />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddCard} type="button" className="profile__add-button" />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map(card => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Main;
