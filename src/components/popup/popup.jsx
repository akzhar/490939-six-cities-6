import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';

import CloseBtn from '../close-btn/close-btn.jsx';

import './popup.css';

const Popup = ({isOpen, message, hidePopup}) => {

  const handleKeyDown = (evt) => {
    if (evt.key === `Escape`) {
      hidePopup();
    }
  };

  useEffect(() => {
    document.body.addEventListener(`keydown`, handleKeyDown);
    return () => {
      document.body.removeEventListener(`keydown`, handleKeyDown);
    };
  }, []);

  return <div className={`popup ${isOpen && `popup--open`}`} id="popup">
    <div className="popup__window">
      <p className="popup__message">{message}</p>
      <CloseBtn
        title="Закрыть"
        onClick={hidePopup}
      />
    </div>
  </div>;
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  hidePopup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isOpen: state.popup.isOpen,
  message: state.popup.message
});

const mapDispatchToProps = (dispatch) => ({
  hidePopup: () => dispatch(ActionCreator.hidePopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
