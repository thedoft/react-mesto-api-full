import React, { useState } from 'react';

export default function Form(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({ email, password });
  }

  function handleFocus(evt) {
    evt.target.removeAttribute('readonly');
  }

  return (
    <form name={props.name} className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">{props.title}</h2>
        <fieldset className="form__info">
          <input value={email || ''} onChange={handleEmailChange} name="email-input" type="email" className="form__input form__input_type_email" placeholder="Email" required autoComplete="email" maxLength="50" />
          <span className="form__input-error" id="email-input-error" />
          <input value={password || ''} onChange={handlePasswordChange} name="password-input" type="password" className="form__input form__input_type_password" placeholder="Пароль" required autoComplete="password" minLength="8" maxLength="100" readOnly onFocus={handleFocus} />
          <span className="form__input-error" id="password-input-error" />
        </fieldset>
      <button type="submit" className="form__submit-button">{props.isLoading ? props.buttonLoadingText : props.buttonText}</button>
    </form>
  )
}
