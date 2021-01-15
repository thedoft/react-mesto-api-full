import React, { useEffect } from 'react';

import Form from './Form';

export default function Login(props) {
  useEffect(() => {
    props.setHeaderNavlinkData('/signup', 'Регистрация');

    return () => {
      props.setHeaderNavlinkData('/', '');
    }
  }, [props]);

  return (
    <div className="auth">
      <Form
        name="login"
        onSubmit={props.onSubmit}
        title="Вход"
        isLoading={props.isLoading}
        buttonLoadingText="Вход..."
        buttonText="Войти"
      />
    </div>
  )
}
