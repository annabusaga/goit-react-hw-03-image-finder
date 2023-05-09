import React from 'react';
import css from './Button.module.css';

// import { PropTypes } from 'prop-types';

export default function Button({ loadMoreClick }) {
  return (
    <>
      <button onClick={loadMoreClick} className={css.button}>
        Load more
      </button>
    </>
  );
}

Button.propTypes = {
  //   contacts: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.string.isRequired,
  //       name: PropTypes.string.isRequired,
  //       number: PropTypes.string.isRequired,
  //     }).isRequired
  //   ).isRequired,
  //   onDeleteTodo: PropTypes.func.isRequired,
};
