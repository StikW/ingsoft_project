import { mockProperties, Property } from '../data/mockData';

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockService = {
  // Propiedades
  async getProperties(): Promise<Property[]> {
    await delay(500);
    return mockProperties;
  },

  async getPropertyById(id: string): Promise<Property | null> {
    await delay(500);
    return mockProperties.find(p => p.id === id) || null;
  },

  async searchProperties(query: string): Promise<Property[]> {
    await delay(500);
    const searchTerm = query.toLowerCase();
    return mockProperties.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.location.toLowerCase().includes(searchTerm) ||
      p.type.toLowerCase().includes(searchTerm) ||
      p.amenities.some(a => a.toLowerCase().includes(searchTerm))
    );
  },

  async filterProperties(filters: {
    type?: Property['type'];
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minBathrooms?: number;
  }): Promise<Property[]> {
    await delay(500);
    return mockProperties.filter(p => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) return false;
      if (filters.minBathrooms && p.bathrooms < filters.minBathrooms) return false;
      return true;
    });
  }
}; 