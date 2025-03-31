import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Chip,
  CardActionArea,
  Dialog,
  useTheme,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn,
  Home,
  Bed,
  Bathtub,
  SquareFoot,
} from '@mui/icons-material';
import { Property } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { LoginDialog } from './LoginDialog';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const { isPropertyFavorite, toggleFavorite } = useFavorites();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = isPropertyFavorite(property.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      await toggleFavorite(property.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          },
          maxWidth: '100%',
          height: '440px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        onClick={handleCardClick}
      >
        <CardActionArea sx={{ flexGrow: 1 }}>
          <Box sx={{ 
            position: 'relative', 
            height: '200px',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
          }}>
            <CardMedia
              component="img"
              image={property.images[0] || 'https://via.placeholder.com/300x200'}
              alt={property.title}
              sx={{ 
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                display: 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>

          <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
            <Typography variant="h6" component="h2" sx={{ 
              fontSize: '1.1rem',
              fontWeight: 600,
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {property.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{
                fontSize: '0.875rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {property.location}
              </Typography>
            </Box>

            <Typography variant="h6" color="primary" sx={{ 
              mb: 2.5,
              fontSize: '1.25rem',
              fontWeight: 600
            }}>
              ${property.price.toLocaleString()}
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              mb: 2.5,
              '& .MuiChip-root': {
                height: '28px',
                '& .MuiChip-icon': {
                  fontSize: '16px'
                },
                '& .MuiChip-label': {
                  fontSize: '0.813rem',
                  padding: '0 8px'
                }
              }
            }}>
              <Chip
                size="small"
                icon={<Home />}
                label={property.type}
                variant="outlined"
              />
              <Chip
                size="small"
                icon={<Bed />}
                label={`${property.bedrooms} hab`}
                variant="outlined"
              />
              <Chip
                size="small"
                icon={<Bathtub />}
                label={`${property.bathrooms} baños`}
                variant="outlined"
              />
              <Chip
                size="small"
                icon={<SquareFoot />}
                label={`${property.area} m²`}
                variant="outlined"
              />
            </Box>

            <Chip
              size="small"
              label={property.isAvailable ? 'Disponible' : 'No disponible'}
              color={property.isAvailable ? 'success' : 'error'}
              variant="outlined"
              sx={{
                height: '28px',
                '& .MuiChip-label': {
                  fontSize: '0.813rem'
                }
              }}
            />
          </CardContent>
        </CardActionArea>
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            color: isFavorite ? theme.palette.error.main : undefined,
          }}
          disabled={isLoading}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Card>

      <LoginDialog
        open={isLoginDialogOpen}
        onClose={handleLoginDialogClose}
        message="Debes iniciar sesión para guardar propiedades en favoritos"
      />
    </>
  );
}; 