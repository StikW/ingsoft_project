import { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilters } from '../components/PropertyFilters';
import { useStore } from '../store/useStore';
import { Property } from '../types';

export const Search = () => {
  const properties = useStore((state) => state.properties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = (filters: any) => {
    setIsLoading(true);
    // Simular carga
    setTimeout(() => {
      let filtered = [...properties];
      
      if (filters.type) {
        filtered = filtered.filter(p => p.type === filters.type);
      }
      
      if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
      }
      
      if (filters.amenities?.length > 0) {
        filtered = filtered.filter(p => 
          filters.amenities.every((amenity: string) => p.amenities.includes(amenity))
        );
      }

      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="page-container">
      <Container maxWidth="xl" className="main-content">
        <Box className="mb-8">
          <Typography variant="h4" className="font-bold mb-2 text-gray-900">
            Propiedades Disponibles
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Encuentra la propiedad perfecta para ti
          </Typography>
        </Box>

        {/* Filtros */}
        <Box className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <PropertyFilters onFilter={handleFilter} />
        </Box>

        {/* Grid de Propiedades */}
        <Grid container spacing={4}>
          {isLoading ? (
            // Estado de carga
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Box className="animate-pulse bg-white rounded-lg overflow-hidden">
                  <Box className="bg-gray-200 h-48 w-full"></Box>
                  <Box className="p-4">
                    <Box className="bg-gray-200 h-4 w-3/4 mb-2"></Box>
                    <Box className="bg-gray-200 h-4 w-1/2 mb-4"></Box>
                    <Box className="bg-gray-200 h-20 mb-4"></Box>
                    <Box className="bg-gray-200 h-10"></Box>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : filteredProperties.length > 0 ? (
            // Propiedades filtradas
            filteredProperties.map((property) => (
              <Grid item xs={12} sm={6} lg={4} key={property.id}>
                <PropertyCard property={property} />
              </Grid>
            ))
          ) : (
            // Sin resultados
            <Grid item xs={12}>
              <Box className="text-center py-12 bg-white rounded-lg">
                <Typography variant="h6" className="text-gray-500">
                  No se encontraron propiedades que coincidan con tus criterios
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}; 