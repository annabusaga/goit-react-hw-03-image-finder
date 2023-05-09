import React, { Component } from 'react';
import css from './Modal.module.css';

// import { PropTypes } from 'prop-types';

class Modal extends Component {
  handlerClick = event => {
    if (event.target === event.currentTarget) {
      this.props.modalOnClick();
    }
  };

  onClose = event => {
    if (event.code === 'Escape') {
      this.props.modalOnClick();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <>
        <div onClick={this.handlerClick} className={css.overlay}>
          <div className={css.modal}>
            <img src={largeImageURL} alt={tags} />
          </div>
        </div>
        ;
      </>
    );
  }
}

Modal.propTypes = {
  //   contacts: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.string.isRequired,
  //       name: PropTypes.string.isRequired,
  //       number: PropTypes.string.isRequired,
  //     }).isRequired
  //   ).isRequired,
  //   onDeleteTodo: PropTypes.func.isRequired,
};

export default Modal;
