import React, { Component } from 'react';
import { getImages } from 'service/apiPixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    image: [],
    value: '',
    page: 1,
    isOpenModal: false,
    isLoading: false,
    largeImageURL: null,
    tags: '',
  };

  async componentDidUpdate(prevProp, prevState) {
    console.log(prevState);
    if (
      prevState.page !== this.state.page ||
      prevState.value !== this.state.value
    ) {
      if (!this.state.value) {
        return;
      }
      const {
        data: { hits, totalHits },
      } = await getImages({
        value: this.state.value,
        page: this.state.page,
      });
      if (hits.length) {
        this.setState(prev => ({
          image: [...prev.image, ...this.makeNormalizedImages(hits)],
        }));
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
    });
  };

  imageOnClick = ({ largeImageURL, tags }) => {
    this.setState({ isOpenModal: true, largeImageURL, tags });
  };

  modalOnClick = () => {
    this.setState({ isOpenModal: false, largeImageURL: null, tags: '' });
  };

  render() {
    const { image, largeImageURL, tags, isOpenModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {image.length !== 0 && (
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
        )}
        {isOpenModal && (
          <Modal
            modalOnClick={this.modalOnClick}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}

export default App;
