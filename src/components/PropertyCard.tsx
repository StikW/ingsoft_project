import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CardActions,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Home,
  MeetingRoom,
  Apartment,
} from '@mui/icons-material';
import { Property } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

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

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const [loginDialog, setLoginDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleContactClick = () => {
    setLoginDialog(true);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Card 
        className="h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        onClick={() => navigate(`/property/${property.id}`)}
      >
        <Box className="relative">
          <CardMedia
            component="img"
            height="200"
            image={property.imageUrl}
            alt={property.title}
            className="h-48 object-cover"
          />
          <Box className="absolute top-2 right-2 z-10">
            <Tooltip title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
              <IconButton 
                size="small" 
                onClick={handleFavoriteClick}
                className="bg-white/90 hover:bg-white rounded-full shadow-sm"
              >
                {isFavorite ? <Favorite className="text-red-500" /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent className="flex-grow">
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" className="font-semibold line-clamp-2">
                {property.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                className="flex items-center gap-1 mt-1"
              >
                <LocationOn fontSize="small" />
                {property.location}
              </Typography>
            </Box>
            
            <Typography variant="h5" className="font-bold text-primary-main">
              {formatPrice(property.price)}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip 
                icon={<PropertyTypeIcon type={property.type} />}
                label={property.type === 'apartment' ? 'Apartamento' : 
                       property.type === 'house' ? 'Casa' : 'Habitación'}
                color="primary"
                variant="outlined"
                size="small"
              />
              <Chip 
                label={`${property.bedrooms} hab.`}
                size="small"
                className="bg-gray-100"
              />
              <Chip 
                label={`${property.bathrooms} baños`}
                size="small"
                className="bg-gray-100"
              />
              <Chip 
                label={`${property.area} m²`}
                size="small"
                className="bg-gray-100"
              />
            </Stack>

            <Box>
              <Typography variant="body2" className="line-clamp-2 text-gray-600">
                {property.description}
              </Typography>
            </Box>

            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-primary-main text-gray-50 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </Stack>
        </CardContent>

        <CardActions className="p-4 pt-0">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleContactClick}
            className="bg-primary-main hover:bg-primary-dark text-white py-2 rounded-full"
          >
            Contactar Propietario
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={loginDialog}
        onClose={() => setLoginDialog(false)}
        className="rounded-lg"
      >
        <DialogTitle className="pb-1">
          Iniciar Sesión Requerido
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Para contactar al propietario, necesitas iniciar sesión o registrarte en la plataforma.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={() => setLoginDialog(false)}
            className="text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => navigate('/login')} 
            variant="contained"
            className="bg-primary-main hover:bg-primary-dark"
          >
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 