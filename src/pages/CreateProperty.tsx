import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  LocationOn,
} from '@mui/icons-material';
import { useStore } from '../store/useStore';
import { PropertyType, Property } from '../types';

const AMENITIES = [
  'Piscina',
  'Gimnasio',
  'Parqueadero',
  'Seguridad 24/7',
  'Ascensor',
  'Área Social',
  'Parque',
  'Zona de Lavandería',
  'BBQ',
  'Terraza',
  'Balcón',
  'Jardín',
];

export const CreateProperty = () => {
  const navigate = useNavigate();
  const addProperty = useStore((state) => state.addProperty);
  const user = useStore((state) => state.user);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as PropertyType,
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: [] as string[],
    images: [] as string[],
  });
  const [newAmenity, setNewAmenity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<PropertyType>) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value as PropertyType,
    }));
  };

  const handleAmenityAdd = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity],
      }));
      setNewAmenity('');
    }
  };

  const handleAmenityDelete = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Debes iniciar sesión para publicar una propiedad');
      setLoading(false);
      return;
    }

    try {
      const newProperty: Property = {
        id: Date.now().toString(),
        ownerId: user.id,
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addProperty(newProperty);
      navigate('/owner-dashboard');
    } catch (err) {
      setError('Error al crear la propiedad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Publicar Nueva Propiedad
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Información Básica */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Información Básica
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Propiedad</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleSelectChange}
                  label="Tipo de Propiedad"
                  disabled={loading}
                >
                  <MenuItem value="apartment">Apartamento</MenuItem>
                  <MenuItem value="house">Casa</MenuItem>
                  <MenuItem value="room">Habitación</MenuItem>
                  <MenuItem value="parking">Parqueadero</MenuItem>
                  <MenuItem value="warehouse">Bodega</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>

            {/* Ubicación */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ubicación
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ubicación"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Características */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Características
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Habitaciones"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Baños"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Área (m²)"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>

            {/* Amenidades */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Amenidades
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box className="flex gap-2 mb-2">
                <TextField
                  fullWidth
                  label="Nueva Amenidad"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  disabled={loading}
                />
                <Button
                  variant="contained"
                  onClick={handleAmenityAdd}
                  disabled={!newAmenity || loading}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Box className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    onDelete={() => handleAmenityDelete(amenity)}
                    disabled={loading}
                  />
                ))}
              </Box>
            </Grid>

            {/* Botones */}
            <Grid item xs={12}>
              <Box className="flex justify-end gap-2">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/owner-dashboard')}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  Publicar Propiedad
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}; 