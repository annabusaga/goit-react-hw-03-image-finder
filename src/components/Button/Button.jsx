import React from 'react';

// import { PropTypes } from 'prop-types';

export default function Button({ children }) {
  return (
    <>
      <button>Load more</button>;
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
