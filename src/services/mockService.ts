import { User, Property, Message } from '../types';

// Simular delay en las llamadas
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Datos mock de usuarios
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'owner',
    phone: '3001234567',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    role: 'interested',
    phone: '3009876543',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

class MockService {
  private messages: Message[] = [];
  private mockProperties: Property[] = [
    {
      id: '1',
      ownerId: '1',
      type: 'apartment',
      title: 'Apartamento moderno en zona céntrica',
      description: 'Hermoso apartamento con vista a la ciudad',
      price: 250000,
      location: 'Centro, Ciudad',
      bedrooms: 2,
      bathrooms: 2,
      area: 75,
      isAvailable: true,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'
      ],
      amenities: ['parking', 'pool', 'gym'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      ownerId: '2',
      type: 'house',
      title: 'Casa familiar con jardín',
      description: 'Espaciosa casa con amplio jardín',
      price: 380000,
      location: 'Zona Residencial, Ciudad',
      bedrooms: 3,
      bathrooms: 2.5,
      area: 150,
      isAvailable: true,
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
      ],
      amenities: ['garden', 'parking', 'security'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private userFavorites: { [userId: string]: string[] } = {
    '1': ['2'],
    '2': ['1']
  };

  // Autenticación
  async login(email: string, password: string): Promise<User> {
    await delay(500);
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await delay(500);
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUsers.push(newUser);
    return newUser;
  }

  // Propiedades
  async getProperties(): Promise<Property[]> {
    await delay(500);
    return this.mockProperties;
  }

  async getPropertyById(id: string): Promise<Property | null> {
    await delay(500);
    return this.mockProperties.find(p => p.id === id) || null;
  }

  async getUserProperties(userId: string): Promise<Property[]> {
    await delay(500);
    return this.mockProperties.filter(property => property.ownerId === userId);
  }

  async getUserFavorites(userId: string): Promise<Property[]> {
    await delay(500);
    const favoriteIds = this.userFavorites[userId] || [];
    return this.mockProperties.filter(property => favoriteIds.includes(property.id));
  }

  async addFavorite(userId: string, propertyId: string): Promise<void> {
    await delay(500);
    if (!this.userFavorites[userId]) {
      this.userFavorites[userId] = [];
    }
    if (!this.userFavorites[userId].includes(propertyId)) {
      this.userFavorites[userId].push(propertyId);
      console.log('Favoritos actualizados:', this.userFavorites);
    }
  }

  async removeFavorite(userId: string, propertyId: string): Promise<void> {
    await delay(500);
    if (this.userFavorites[userId]) {
      this.userFavorites[userId] = this.userFavorites[userId].filter(id => id !== propertyId);
      console.log('Favoritos actualizados:', this.userFavorites);
    }
  }

  async deleteProperty(id: string): Promise<void> {
    await delay(500);
    const index = this.mockProperties.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProperties.splice(index, 1);
    }
  }

  async searchProperties(query: string): Promise<Property[]> {
    await delay(500);
    const searchTerm = query.toLowerCase();
    return this.mockProperties.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.location.toLowerCase().includes(searchTerm) ||
      p.type.toLowerCase().includes(searchTerm) ||
      p.amenities.some(a => a.toLowerCase().includes(searchTerm))
    );
  }

  async filterProperties(filters: {
    type?: Property['type'];
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minBathrooms?: number;
  }): Promise<Property[]> {
    await delay(500);
    return this.mockProperties.filter(p => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) return false;
      if (filters.minBathrooms && p.bathrooms < filters.minBathrooms) return false;
      return true;
    });
  }

  // Mensajes
  async getMessages(userId: string): Promise<Message[]> {
    await delay(500);
    return []; // Implementar lógica de mensajes cuando sea necesario
  }

  async sendMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message> {
    await delay(500);
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newMessage;
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    await delay(500);
    // Implementar lógica cuando sea necesario
  }
}

export const mockService = new MockService(); 