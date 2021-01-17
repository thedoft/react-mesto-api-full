import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import logo from '../images/logo.svg';

function Header(props) {
  const currentUser = useContext(CurrentUserContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function updateWindowSize() {
    setWindowWidth(window.innerWidth);

    window.innerWidth <= 425 ? setIsMenuOpen(false) : setIsMenuOpen(true);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    }
  });

  function handleButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  const menuStyles = `
    ${((props.isLoggedIn) && (windowWidth <= 425)) ? 'header__menu_mobile' : 'header__menu'}
    ${((windowWidth <= 425) && (!isMenuOpen)) ? 'hidden' : ''}
  `

  return (
    <header className="header">
      <div className={menuStyles}>
        <p className="header__user-login">{currentUser.email}</p>
        <NavLink className={`header__navlink ${props.isLoggedIn ? 'header__navlink_logged-in' : ''}`}
          to={props.navlinkPath}
          onClick={props.onSignOut}
        >{props.navlinkText}</NavLink>
      </div>

      <div className="header__container">
        <img src={logo} className="header__logo" alt="Логотип сервиса" />
        {props.isLoggedIn && <button className={`header__menu-button ${isMenuOpen ? 'header__menu-button_opened' : ''}`} onClick={handleButtonClick} />}
      </div>
    </header>
  )
}

export default Header;
