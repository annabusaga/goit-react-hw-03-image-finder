import React from 'react';
import css from './ImageGalleryItem.module.css';

// import { PropTypes } from 'prop-types';

export default function ImageGalleryItem({
  onClick,
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryImg}
          onClick={() => onClick({ largeImageURL, tags })}
          src={webformatURL}
          alt={tags}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  //   contacts: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.string.isRequired,
  //       name: PropTypes.string.isRequired,
  //       number: PropTypes.string.isRequired,
  //     }).isRequired
  //   ).isRequired,
  //   onDeleteTodo: PropTypes.func.isRequired,
};
