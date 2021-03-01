import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/actions.js';
import {SORT_OPTIONS} from '../../const.json';

// TODO: move to const
const Class = {
  LIST_OPENED: `places__options--opened`,
  OPTION_ACTIVE: `places__option--active`
};

const SortOptions = ({sort, changeSort}) => {

  const sortTypeRef = useRef();
  const sortOptionsListRef = useRef();

  const handleSortTypeClick = () => {
    sortOptionsListRef.current.classList.toggle(Class.LIST_OPENED);
  };

  const handleSortOptionsListClick = (evt) => {
    const newSort = evt.target.textContent;
    changeSort(newSort);
    sortTypeRef.current.querySelector(`span`).textContent = newSort;
    sortOptionsListRef.current.classList.remove(Class.LIST_OPENED);
  };

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0" ref={sortTypeRef} onClick={handleSortTypeClick}>
      <span style={{margin: `0 0 0 5px`}}>{sort}</span>
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className="places__options places__options--custom" ref={sortOptionsListRef} onClick={handleSortOptionsListClick}>
      {SORT_OPTIONS.map((option) => (
        <li
          key={option}
          className={`places__option ${(option === sort) ? Class.OPTION_ACTIVE : ``}`}
          tabIndex="0"
        >
          {option}
        </li>
      ))}
    </ul>
  </form>;
};

const mapStateToProps = (state) => ({
  sort: state.sort
});

const mapDispatchToProps = (dispatch) => ({
  changeSort: (newSort) => {
    dispatch(ActionCreator.changeSort(newSort));
  }
});

SortOptions.propTypes = {
  sort: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired
};

export {SortOptions};
export default connect(mapStateToProps, mapDispatchToProps)(SortOptions);
