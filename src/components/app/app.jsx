import React from 'react';
import PropTypes from 'prop-types';
import {offerShape} from '../../prop-types/prop-types.jsx';

import MainScreen from '../main-screen/main-screen.jsx';

const App = ({offers}) => (
  <MainScreen offers={offers}/>
);

App.propTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired
};

export default App;
