import React, { Component } from 'react';
import { getImages } from 'service/apiPixabay';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
// import css from './App.module.css';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

class App extends Component {
  state = {
    image: [],
    value: '',
    page: 1,
    isOpenModal: false,
    isLoading: false,
    largeImageURL: null,
    tags: '',
    isLoadMoreShow: false,
  };

  async componentDidUpdate(prevProp, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.value !== this.state.value
    ) {
      if (!this.state.value) {
        return;
      }
      this.setState({ isLoading: true });
      try {
        const {
          data: { hits, totalHits },
        } = await getImages({
          value: this.state.value,
          page: this.state.page,
        });
        if (hits.length) {
          this.setState(prev => ({
            isLoadMoreShow: prev.page !== Math.ceil(totalHits / 12),
            image: [...prev.image, ...this.makeNormalizedImages(hits)],
          }));
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  makeNormalizedImages(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  onSubmit = value => {
    this.setState({
      value,
      image: [],
      page: 1,
    });
  };

  loadMoreClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  imageOnClick = ({ largeImageURL, tags }) => {
    this.setState({ isOpenModal: true, largeImageURL, tags });
  };

  modalOnClick = () => {
    this.setState({ isOpenModal: false, largeImageURL: null, tags: '' });
  };

  render() {
    const {
      image,
      largeImageURL,
      tags,
      isOpenModal,
      isLoading,
      isLoadMoreShow,
    } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {image.length !== 0 && (
          <>
            <ImageGallery>
              {image.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  onClick={this.imageOnClick}
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              ))}
            </ImageGallery>
            {isLoadMoreShow && !isLoading && (
              <Button loadMoreClick={this.loadMoreClick} />
            )}
          </>
        )}
        {isOpenModal && (
          <Modal
            modalOnClick={this.modalOnClick}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
