import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../images/logo.svg';

function Header(props) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function updateWindowSize() {
    setWindowWidth(window.innerWidth);

    window.innerWidth <= 425 ? setIsMenuOpen(false) : setIsMenuOpen(true);
  }

  React.useEffect(() => {
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
        <p className="header__user-login">{props.userLogin}</p>
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
