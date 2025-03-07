import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import { PropertyType } from '../types';

interface PropertyFiltersProps {
  onFilter: (filters: any) => void;
}

const AMENITIES = [
  'Piscina',
  'Gimnasio',
  'Parqueadero',
  'Seguridad 24/7',
  'Ascensor',
  'Área Social',
  'Parque',
  'Zona de Lavandería',
];

export const PropertyFilters = ({ onFilter }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    amenities: [] as string[],
  });

  const handleTypeChange = (event: SelectChangeEvent) => {
    setFilters({ ...filters, type: event.target.value });
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      amenities: [],
    });
    onFilter({
      type: '',
      minPrice: '',
      maxPrice: '',
      amenities: [],
    });
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Filtros Principales */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormControl fullWidth>
            <InputLabel>Tipo de Propiedad</InputLabel>
            <Select
              value={filters.type}
              label="Tipo de Propiedad"
              onChange={handleTypeChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="apartment">Apartamento</MenuItem>
              <MenuItem value="house">Casa</MenuItem>
              <MenuItem value="room">Habitación</MenuItem>
              <MenuItem value="parking">Parqueadero</MenuItem>
              <MenuItem value="warehouse">Bodega</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Precio Mínimo"
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            InputProps={{
              startAdornment: '$',
            }}
          />

          <TextField
            fullWidth
            label="Precio Máximo"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            InputProps={{
              startAdornment: '$',
            }}
          />
        </Box>

        {/* Amenidades */}
        <Box>
          <InputLabel className="mb-2 block">Amenidades</InputLabel>
          <Box className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <Chip
                key={amenity}
                label={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                color={filters.amenities.includes(amenity) ? 'primary' : 'default'}
                variant={filters.amenities.includes(amenity) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        {/* Botones de Acción */}
        <Box className="flex justify-end gap-2">
          <Button
            variant="outlined"
            onClick={handleReset}
            className="btn-secondary"
          >
            Limpiar Filtros
          </Button>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            className="btn-primary"
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}; 