import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { getPhotos } from 'utils/API';
import { Wrapper } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    loader: false,
    url: '',
    // showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getItems();
    }
  }
  handleSubmit = query => {
    if (query === this.state.query) return;
    this.setState({
      query,
      page: 1,
      items: [],
    });
  };

  getItems = async () => {
    try {
      this.loader();
      const { query, page } = this.state;

      const { hits, totalHits, total } = await getPhotos(query, page);

      this.setState(({ items }) => ({
        items: [...items, ...hits],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.loader();
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  loader = () => {
    this.setState(({ loader }) => ({
      loader: !loader,
    }));
  };

  closeModal = () => {
    this.setState(({ url }) => ({
      url: '',
    }));
  };
  clickImage = url => {
    this.setState({ url });
  };
  render() {
    const { items, loader, url } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.clickImage}></ImageGallery>
        )}
        {items.length && <Button onClick={this.loadMore}></Button>}
        {loader && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}

        {url.length > 0 && <Modal url={url} onClose={this.closeModal}></Modal>}
      </Wrapper>
    );
  }
}
