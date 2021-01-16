import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';

import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from './AddCardPopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as api from '../utils/api';

import infoTooltipOkImage from '../images/info-tooltip-ok.svg';
import infoTooltipErrorImage from '../images/info-tooltip-error.svg';

function App() {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [headerNavlinkPath, setHeaderNavlinkPath] = useState('/');
  const [headerNavlinkText, setHeaderNavlinkText] = useState('');
  const [userLogin, setUserLogin] = useState('');

  const [infoTooltipTitle, setInfoTooltipTitle] = useState('');
  const [infoTooltipImage, setInfoTooltipImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function setHeaderNavlinkData(path, text) {
    setHeaderNavlinkPath(path);
    setHeaderNavlinkText(text);
  }

  function setInfoTooltipOk() {
    setInfoTooltipTitle('Вы успешно зарегистрировались!');
    setInfoTooltipImage(infoTooltipOkImage);
  }

  function setInfoTooltipError() {
    setInfoTooltipTitle('Что-то пошло не так! Попробуйте еще раз.');
    setInfoTooltipImage(infoTooltipErrorImage);
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);

    api.register({ email, password })
      .then(() => {
        setInfoTooltipOk();
        setIsInfoTooltipOpen(true);

        history.push('/signin');
      })
      .catch(() => {
        setInfoTooltipError();
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);

    api.login({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        setUserLogin(email);
      })
      .catch(() => {
        setInfoTooltipError();
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setUserLogin('');
  }

  useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setUserLogin(userData.email);
      })
      .catch(() => {
        setInfoTooltipError();
        setIsInfoTooltipOpen(true);
      });
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus({ _id: card._id}, (isLiked ? 'DELETE' : 'PUT'))
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api.deleteCard({ _id: card._id })
    .then(() => {
      const newCards = cards.filter(c => c._id !== card._id);
      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleLayoutClick(popup) {
    popup.addEventListener('mousedown', evt => {
      evt.target === evt.currentTarget && closeAllPopups();
    });
  }

  function handleEscapeClose(evt) {
    evt.key === 'Escape' && closeAllPopups();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api.patchUserProfile({ name, about })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api.patchUserAvatar({ avatar })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddCard({ name, link }) {
    setIsLoading(true);

    api.addNewCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header
        isLoggedIn={isLoggedIn}
        userLogin={userLogin}
        navlinkPath={headerNavlinkPath}
        navlinkText={headerNavlinkText}
        onSignOut={handleSignOut}
      />

      <main className="main">
        <Switch>
          <ProtectedRoute
            exact path='/'
            isLoggedIn={isLoggedIn}
            setHeaderNavlinkData={setHeaderNavlinkData}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLikeClick}
            onCardDelete={handleCardDeleteClick}
          />

          <Route path="/signin">
            {
              isLoggedIn
              ? <Redirect to="/" />
              : <Login
                  isLoading={isLoading}
                  onSubmit={handleLogin}
                  setHeaderNavlinkData={setHeaderNavlinkData}
                />
            }
          </Route>

          <Route path="/signup">
            {
              isLoggedIn
              ? <Redirect to="/" />
              : <Register
                  isLoading={isLoading}
                  onSubmit={handleRegister}
                  setHeaderNavlinkData={setHeaderNavlinkData}
                />
            }
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>

      <Footer />

      <ImagePopup isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onLayout={handleLayoutClick}
        onEscape={handleEscapeClose}
      />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onLayout={handleLayoutClick}
        onEscape={handleEscapeClose}
        isLoading={isLoading}
      />

      <EditProfilePopup isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onLayout={handleLayoutClick}
        onEscape={handleEscapeClose}
        isLoading={isLoading}
      />

      <AddCardPopup isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddCard}
        onLayout={handleLayoutClick}
        onEscape={handleEscapeClose}
        isLoading={isLoading}
      />

      <ConfirmPopup card={selectedCard}
        onConfirm={handleCardDelete}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onLayout={handleLayoutClick}
        onEscape={handleEscapeClose}
        isLoading={isLoading}
      />

      <InfoTooltip name="info-tooltip"
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        onLayout={handleLayoutClick}
        onEscape={handleEscapeClose}
        title={infoTooltipTitle}
        image={infoTooltipImage}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
