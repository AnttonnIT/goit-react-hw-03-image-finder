import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <StyledList>
      <ImageGalleryItem data={items} onClick={onClick}></ImageGalleryItem>
    </StyledList>
  );
};
