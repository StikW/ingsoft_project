import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  IconButton,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../services/mockService';
import { Property } from '../types';

interface FavoriteListProps {
  userId: string;
}

export const FavoriteList = ({ userId }: FavoriteListProps) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, [userId]);

  const loadFavorites = async () => {
    try {
      const userFavorites = await mockService.getUserFavorites(userId);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (propertyId: string) => {
    try {
      await mockService.removeFavorite(userId, propertyId);
      setFavorites(favorites.filter(prop => prop.id !== propertyId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleViewProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  if (loading) {
    return <Typography>Cargando favoritos...</Typography>;
  }

  if (favorites.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="textSecondary">No hay propiedades guardadas</Typography>
      </Box>
    );
  }

  return (
    <List>
      {favorites.map((property, index) => (
        <Box key={property.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={property.images[0]} variant="rounded">
                <HomeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={property.title}
              secondary={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" component="span">
                    {property.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="primary" component="span">
                      ${property.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span">
                      • {property.bedrooms} hab. • {property.bathrooms} baños
                    </Typography>
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleViewProperty(property.id)}
                sx={{ mr: 1 }}
              >
                <OpenInNewIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleRemoveFavorite(property.id)}
                color="error"
              >
                <FavoriteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < favorites.length - 1 && <Divider variant="inset" component="li" />}
        </Box>
      ))}
    </List>
  );
}; 