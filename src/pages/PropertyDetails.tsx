import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Dialog,
} from '@mui/material';
import {
  LocationOn,
  Home,
  MeetingRoom,
  Apartment,
  ArrowBack,
  BathtubOutlined,
  BedroomParentOutlined,
  SquareFootOutlined,
  Favorite,
  FavoriteBorder,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { mockService } from '../services/mockService';
import { Property, PropertyType } from '../types';
import { Chat } from '../components/Chat';
import { ReviewSection } from '../components/ReviewSection';
import { ImageGallery } from '../components/ImageGallery';
import { AuthRequiredDialog } from '../components/AuthRequiredDialog';
import { useAuth } from '../contexts/AuthContext';

const PropertyTypeIcon = ({ type }: { type: PropertyType }) => {
  switch (type) {
    case 'apartment':
      return <Apartment />;
    case 'house':
      return <Home />;
    case 'room':
      return <MeetingRoom />;
    default:
      return <Home />;
  }
};

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const currentUserId = user?.id || '';

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await mockService.getPropertyById(id || '');
        setProperty(data);
        if (currentUserId && id) {
          const userFavorites = await mockService.getUserFavorites(currentUserId);
          setIsFavorite(userFavorites.some(prop => prop.id === id));
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, currentUserId]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }

    if (!id || !currentUserId) return;
    
    try {
      if (isFavorite) {
        await mockService.removeFavorite(currentUserId, id);
      } else {
        await mockService.addFavorite(currentUserId, id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleContactOwner = () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }
    setChatOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" height={400} />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={20} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Propiedad no encontrada</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleFavoriteToggle} color={isFavorite ? 'error' : 'default'}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ height: 400, overflow: 'hidden', borderRadius: 1 }}>
            <img
              src={property.images[0]}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {property.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${property.price.toLocaleString()}/mes
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography>{property.location}</Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {property.description}
          </Typography>
          <ImageGallery images={property.images} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detalles
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BedroomParentOutlined sx={{ mr: 1 }} />
                <Typography>{property.bedrooms} habitaciones</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BathtubOutlined sx={{ mr: 1 }} />
                <Typography>{property.bathrooms} baños</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SquareFootOutlined sx={{ mr: 1 }} />
                <Typography>{property.area} m²</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ChatIcon />}
                onClick={handleContactOwner}
                disabled={!property.isAvailable}
              >
                {property.isAvailable ? 'Contactar al propietario' : 'No disponible'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Amenidades
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {property.amenities.map((amenity: string, index: number) => (
              <Chip key={index} label={amenity} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <ReviewSection propertyId={property.id} />
        </Grid>
      </Grid>

      <Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { height: '80vh' }
        }}
      >
        {property && (
          <Chat
            propertyId={property.id}
            currentUserId={currentUserId}
            otherUserId={property.ownerId}
          />
        )}
      </Dialog>

      <AuthRequiredDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
      />
    </Container>
  );
};

export { PropertyDetails }; 