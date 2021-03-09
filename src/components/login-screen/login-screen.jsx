import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {ActionCreator} from '../../store/actions.js';
import {AppRoute} from '../../const.js';

import Header from '../header/header.jsx';

const LoginScreen = ({tryLogin}) => {

  const history = useHistory();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);
    const loginInfo = {email: formData.get(`email`), password: formData.get(`password`)};
    if (loginInfo.email && loginInfo.password) {
      tryLogin(loginInfo, () => {
        history.push(AppRoute.MAIN);
      });
    }
  };

  return <div className="page page--gray page--login">
    <Header/>
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required=""/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required=""/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
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
  tryLogin: (user, onSuccess) => dispatch(ActionCreator.login(user, onSuccess))
});

LoginScreen.propTypes = {
  tryLogin: PropTypes.func.isRequired
};

export {LoginScreen};
export default connect(null, mapDispatchToProps)(LoginScreen);
