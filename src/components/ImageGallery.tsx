import { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
}

export const ImageGallery = ({ images, initialIndex = 0 }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Imagen principal */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '75%',
          borderRadius: 1,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={handleFullscreenToggle}
      >
        <img
          src={images[selectedIndex]}
          alt={`Imagen ${selectedIndex + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {!isMobile && (
          <>
            <IconButton
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Miniaturas */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'background.paper',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'divider',
            borderRadius: 4,
          },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              flexShrink: 0,
              width: 80,
              height: 60,
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              border: 2,
              borderColor: index === selectedIndex ? 'primary.main' : 'divider',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Miniatura ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Diálogo de pantalla completa */}
      <Dialog
        open={isFullscreen}
        onClose={handleFullscreenToggle}
        maxWidth="xl"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            onClick={handleFullscreenToggle}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isMobile ? '100vh' : '80vh',
            }}
          >
            <img
              src={images[selectedIndex]}
              alt={`Imagen ${selectedIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: isMobile ? '100vh' : '80vh',
                objectFit: 'contain',
              }}
            />
            {!isMobile && (
              <>
                <IconButton
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  onClick={handlePrevious}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  onClick={handleNext}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFullscreenToggle}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 