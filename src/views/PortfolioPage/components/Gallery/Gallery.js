import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';

const Gallery = () => {
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const photos = [
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img5.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img5.jpg',
      rows: 1,
      cols: 2,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img6.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img6.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img7.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img7.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img10.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img10.jpg',
      rows: 1,
      cols: 2,
    },
  ];

  return (
    <Box>
      <Box display={'flex'} justifyContent={'flex-end'} marginBottom={2}>
        <Button
          color="primary"
          size="large"
          endIcon={
            <svg
              width={16}
              height={16}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          }
          onClick={() => openLightbox(0)}
        >
          Open the gallery
        </Button>
      </Box>
      <Box>
        <ImageList
          variant="quilted"
          cols={3}
          rowHeight={isMd ? 300 : 200}
          gap={isMd ? 16 : 4}
        >
          {photos.map((item, i) => (
            <ImageListItem key={i} cols={item.cols} rows={item.rows}>
              <LazyLoadImage
                height={'100%'}
                width={'100%'}
                src={item.src}
                alt="..."
                effect="blur"
                onClick={() => openLightbox(i)}
                style={{
                  objectFit: 'cover',
                  cursor: 'poiner',
                  borderRadius: 4,
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Box>
  );
};

export default Gallery;
