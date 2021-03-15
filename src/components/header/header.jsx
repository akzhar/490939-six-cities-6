import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const Header = ({isAuthorized, userEmail, avatarUrl}) => {

  const history = useHistory();

  const getLogoImg = () => <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;

  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          { history.location.pathname === AppRoute.MAIN ?
            <a className="header__logo-link">{getLogoImg()}</a>
            :
            <Link to="/" className="header__logo-link">{getLogoImg()}</Link>
          }
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={isAuthorized ? AppRoute.FAVORITES : AppRoute.LOGIN}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {isAuthorized && <img src={avatarUrl} style={{borderRadius: `50%`}}/>}
                </div>
                <span className={isAuthorized ? `header__user-name user__name` : `header__login`}>
                  {isAuthorized ? userEmail : `Sign in`}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

const mapStateToProps = (state) => ({
  isAuthorized: state.isAuthorized,
  userEmail: state.user.email,
  avatarUrl: state.user.avatarUrl
});

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  avatarUrl: PropTypes.string
};

export {Header};
export default connect(mapStateToProps, null)(Header);
