import { useEffect, useState } from 'react';
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
} from '@mui/icons-material';
import { mockService } from '../services/mockService';
import { Property } from '../data/mockData';

const PropertyTypeIcon = ({ type }: { type: Property['type'] }) => {
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

export const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      if (id) {
        const data = await mockService.getPropertyById(id);
        setProperty(data);
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="animate-pulse">
          <Skeleton variant="rectangular" height={400} />
          <Box className="mt-4">
            <Skeleton variant="text" height={40} width="60%" />
            <Skeleton variant="text" height={24} width="40%" />
            <Skeleton variant="text" height={32} width="30%" />
          </Box>
        </Box>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h5" className="text-center text-gray-600">
          Propiedad no encontrada
        </Typography>
        <Box className="text-center mt-4">
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
            variant="contained"
          >
            Volver
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Botón Volver */}
      <IconButton
        onClick={() => navigate(-1)}
        className="mb-4 hover:bg-gray-100"
        size="large"
      >
        <ArrowBack />
      </IconButton>

      <Grid container spacing={4}>
        {/* Imagen Principal */}
        <Grid item xs={12}>
          <Box className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </Box>
        </Grid>

        {/* Información Principal */}
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h4" className="font-bold mb-2">
              {property.title}
            </Typography>
            
            <Typography 
              variant="h5" 
              className="text-primary-main font-bold mb-4"
            >
              {formatPrice(property.price)}
            </Typography>

            <Box className="flex items-center gap-2 mb-6">
              <LocationOn className="text-gray-500" />
              <Typography variant="subtitle1" className="text-gray-600">
                {property.location}
              </Typography>
            </Box>

            {/* Características Principales */}
            <Grid container spacing={3} className="mb-6">
              <Grid item xs={4}>
                <Card className="text-center h-full">
                  <CardContent>
                    <BedroomParentOutlined className="text-primary-main mb-2" />
                    <Typography variant="h6">{property.bedrooms}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Habitaciones
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className="text-center h-full">
                  <CardContent>
                    <BathtubOutlined className="text-primary-main mb-2" />
                    <Typography variant="h6">{property.bathrooms}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Baños
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className="text-center h-full">
                  <CardContent>
                    <SquareFootOutlined className="text-primary-main mb-2" />
                    <Typography variant="h6">{property.area}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      m² Área
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Descripción */}
            <Typography variant="h6" className="font-semibold mb-2">
              Descripción
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              {property.description}
            </Typography>

            {/* Amenidades */}
            <Typography variant="h6" className="font-semibold mb-3">
              Amenidades
            </Typography>
            <Box className="flex flex-wrap gap-2 mb-6">
              {property.amenities.map((amenity, index) => (
                <Chip
                  key={index}
                  label={amenity}
                  className="bg-primary-main text-gray-50"
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Sidebar - Contacto */}
        <Grid item xs={12} md={4}>
          <Card className="sticky top-4">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                ¿Te interesa esta propiedad?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className="mb-4"
              >
                Contactar al Propietario
              </Button>
              <Typography variant="body2" color="text.secondary" className="text-center">
                El propietario responderá a tu mensaje lo antes posible
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}; 