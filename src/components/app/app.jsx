import React from 'react';
import PropTypes from 'prop-types';
import {offerShape} from '../../prop-types/prop-types.jsx';

import MainScreen from '../main-screen/main-screen.jsx';

const App = ({data}) => (
  <MainScreen offers={data}/>
);

App.propTypes = PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired;

export default App;