import React from 'react';

const PlacesMainLoading = () => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">Loading offers for you...</b>
      <p className="cities__status-description">Please wait a few seconds...</p>
    </div>
  </section>
);

export default PlacesMainLoading;
