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
  Grid,
  Container,
} from '@mui/material';
import {
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../services/mockService';
import { Property } from '../types';
import { favoritesService } from '../services/favoritesService';
import { useAuth } from '../contexts/AuthContext';
import { PropertyCard } from './PropertyCard';

export const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Cargar propiedades
        const data = await mockService.getProperties();
        setProperties(data);

        // Inicializar favoritos solo si el usuario está autenticado
        if (isAuthenticated) {
          await favoritesService.initializeFavorites();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [isAuthenticated]); // Re-ejecutar cuando cambie el estado de autenticación

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography>Cargando propiedades...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Box sx={{ height: '100%' }}>
              <PropertyCard property={property} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 