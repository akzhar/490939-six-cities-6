import React from 'react';
import MainScreen from '../main-screen/main-screen.jsx';

const SETTINGS = {
  offers: [
    {id: 1, isPremium: true, costEuro: 120, header: `Beautiful &amp; luxurious apartment at great location`},
    {id: 2, isPremium: false, costEuro: 80, header: `Wood and stone place`},
    {id: 3, isPremium: false, costEuro: 132, header: `Canal View Prinsengracht`},
    {id: 4, isPremium: true, costEuro: 180, header: `Nice, cozy, warm big bed apartment`},
    {id: 5, isPremium: false, costEuro: 80, header: `Wood and stone place`}
  ]
};

const App = () => (
  <MainScreen offers={SETTINGS.offers}/>
);

export default App;
