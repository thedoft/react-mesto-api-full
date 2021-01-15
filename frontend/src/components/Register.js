import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Form from './Form';

export default function Register(props) {
  useEffect(() => {
    props.setHeaderNavlinkData('/signin', 'Войти');

    return () => {
      props.setHeaderNavlinkData('/', '');
    }
  }, [props]);

  return (
    <div className="auth">
      <Form
        name="register"
        onSubmit={props.onSubmit}
        title="Регистрация"
        isLoading={props.isLoading}
        buttonLoadingText="Регистрация..."
        buttonText="Зарегистрироваться"
      />

      <p className="auth__text">Уже зарегистрированы? <NavLink to="/signin" className="auth__link">Войти</NavLink></p>
    </div>
  )
}
