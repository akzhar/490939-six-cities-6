import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {AppRoute} from '../../const.js';

import Header from '../header/header.jsx';

const LoginScreen = ({login, checkLogin, redirectTo}) => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitBtnRef = useRef();

  const getEmailValue = () => emailInputRef.current.value;

  const getPasswordValue = () => passwordInputRef.current.value;

  const isEmailValid = () => {
    // валидация выполнятеся самим input type="email"
    const email = getEmailValue();
    return email !== ``;
  };

  const isPasswordValid = () => {
    // валидации пароля нет
    const password = getPasswordValue();
    return password !== ``;
  };

  const handleInputChange = () => {
    submitBtnRef.current.disabled = (isEmailValid() && isPasswordValid()) ? false : true;
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);
    const user = {email: formData.get(`email`), password: formData.get(`password`)};
    if (user.email && user.password) {
      login(
          user,
          () => {
            redirectTo(AppRoute.MAIN);
          },
          () => {
            // TODO: replace alert by popup
            // eslint-disable-next-line no-alert
            alert(`failed login`);
          }
      );
    }
  };

  useEffect(() => {
    checkLogin(
        () => {
          redirectTo(AppRoute.MAIN);
        }
    );
  }, []);

  return <div className="page page--gray page--login">
    <Header/>
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" ref={emailInputRef} onChange={handleInputChange}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" ref={passwordInputRef} onChange={handleInputChange}/>
            </div>
            <button className="login__submit form__submit button" type="submit" disabled={true} ref={submitBtnRef}>Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>;
};

const mapDispatchToProps = (dispatch) => ({
  login: (user, onSuccess, onFail) => dispatch(ActionCreator.login(user, onSuccess, onFail)),
  checkLogin: (onSuccess, onFail) => dispatch(ActionCreator.checkLogin(onSuccess, onFail)),
  redirectTo: (to) => dispatch(ActionCreator.redirectTo(to))
});

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  checkLogin: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired
};

export {LoginScreen};
export default connect(null, mapDispatchToProps)(LoginScreen);
