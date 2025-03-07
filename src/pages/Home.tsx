import { useState } from 'react';
import { Container } from '@mui/material';
import { SearchFilter } from '../components/SearchFilter';
import { PropertyCard } from '../components/PropertyCard';
import { mockProperties, Property } from '../data/mockData';

export const Home = () => {
  const [loading] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Filtro de búsqueda */}
      <SearchFilter />

      {/* Grid de propiedades */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProperties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </Container>
  );
}; 