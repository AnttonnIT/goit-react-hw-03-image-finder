import { Component } from 'react';
import { StyledOverlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = ({ currentTarget, target }) => {
    if (currentTarget !== target) {
      return;
    }

    this.props.onClose();
  };
  render() {
    const { url } = this.props;
    return (
      <StyledOverlay className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={url} alt="" />
        </div>
      </StyledOverlay>
    );
  }
}
