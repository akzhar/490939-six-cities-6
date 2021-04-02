import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {SORT_OPTIONS, Class} from '../../const.js';

const SortOptions = ({activeSort, changeActiveSort}) => {

  const sortListRef = useRef();
  const optionsListRef = useRef();

  const handleListClick = () => {
    optionsListRef.current.classList.toggle(Class.LIST_OPENED);
  };

  const handleOptionsListClick = (evt) => {
    const newActiveSort = evt.target.textContent;
    if (newActiveSort !== activeSort) {
      changeActiveSort(newActiveSort);
      sortListRef.current.querySelector(`span`).textContent = newActiveSort;
    }
    optionsListRef.current.classList.remove(Class.LIST_OPENED);
  };

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0" ref={sortListRef} onClick={handleListClick}>
      <span style={{margin: `0 0 0 5px`}}>{activeSort}</span>
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className="places__options places__options--custom" ref={optionsListRef} onClick={handleOptionsListClick}>
      {SORT_OPTIONS.map((option) => (
        <li
          key={option}
          className={`places__option ${(option === activeSort) && Class.OPTION_ACTIVE}`}
          tabIndex="0"
        >
          {option}
        </li>
      ))}
    </ul>
  </form>;
};

SortOptions.propTypes = {
  activeSort: PropTypes.string.isRequired,
  changeActiveSort: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeSort: state.active.sort
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveSort: (newActiveSort) => {
    dispatch(ActionCreator.changeActiveSort(newActiveSort));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SortOptions);
