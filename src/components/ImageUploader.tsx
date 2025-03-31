import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUploader = ({
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      if (i + images.length >= maxImages) break;
      
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (i === files.length - 1 || i + images.length === maxImages - 1) {
            onChange([...images, ...newImages]);
          }
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const handleZoom = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Imágenes de la propiedad
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '75%',
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  gap: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 1,
                  padding: 0.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleZoom(image)}
                  sx={{ color: 'white' }}
                >
                  <ZoomInIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  sx={{ color: 'white' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
        {images.length < maxImages && (
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '75%',
                borderRadius: 1,
                border: '2px dashed',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />
              <AddIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            </Box>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <img
            src={selectedImage || ''}
            alt="Vista previa"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70vh',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedImage(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 