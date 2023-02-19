import { StyledListItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data, onClick }) => {
  return (
    <>
      {data.map(item => {
        return (
          <StyledListItem className="gallery-item" key={item.id}>
            <img
              src={item.webformatURL}
              alt={item.tags}
              onClick={() => {
                onClick(item.largeImageURL);
              }}
            />
          </StyledListItem>
        );
      })}{' '}
    </>
  );
};
