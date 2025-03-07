export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'apartment' | 'house' | 'room';
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  amenities: string[];
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento Moderno en el Centro',
    description: 'Hermoso apartamento completamente renovado con excelente ubicación',
    price: 1200000,
    type: 'apartment',
    location: 'Centro, Bogotá',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    amenities: ['Parqueadero', 'Seguridad 24/7', 'Gimnasio']
  },
  {
    id: '2',
    title: 'Casa Familiar en Zona Norte',
    description: 'Espaciosa casa con jardín y zona de BBQ',
    price: 2500000,
    type: 'house',
    location: 'Zona Norte, Bogotá',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    amenities: ['Jardín', 'BBQ', 'Sala de juegos']
  },
  {
    id: '3',
    title: 'Habitación en Apartamento Compartido',
    description: 'Habitación amoblada en apartamento tranquilo',
    price: 600000,
    type: 'room',
    location: 'Chapinero, Bogotá',
    bedrooms: 1,
    bathrooms: 1,
    area: 15,
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
    amenities: ['Amoblado', 'Internet', 'Servicios incluidos']
  },
  {
    id: '4',
    title: 'Apartamento de Lujo con Vista',
    description: 'Exclusivo apartamento con vista panorámica a la ciudad',
    price: 3500000,
    type: 'apartment',
    location: 'Usaquén, Bogotá',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    amenities: ['Vista panorámica', 'Piscina', 'Terraza']
  }
]; 