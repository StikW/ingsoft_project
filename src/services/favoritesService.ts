import { Property } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface FavoriteResponse {
  id: string;
  propertyId: string;
  userId: string;
}

// Mantener un caché local de favoritos
let favoritesCache: Set<string> = new Set();
let isInitialized = false;

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found - user not authenticated');
  }
  return token;
};

export const favoritesService = {
  // Inicializar el caché de favoritos
  async initializeFavorites(): Promise<void> {
    if (isInitialized) return;
    
    try {
      // Solo intentamos inicializar si hay un token
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token available - skipping favorites initialization');
        return;
      }

      const favorites = await this.getFavorites();
      favoritesCache = new Set(favorites.map(fav => fav.id));
      isInitialized = true;
      console.log('Favorites initialized:', Array.from(favoritesCache));
    } catch (error) {
      console.error('Error initializing favorites:', error);
      favoritesCache.clear();
      isInitialized = false;
    }
  },

  // Obtener todos los favoritos
  async getFavorites(): Promise<Property[]> {
    const token = getAuthToken();

    try {
      const response = await fetch(`${API_URL}/favorites`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching favorites: ${response.statusText}`);
      }

      const favorites: Property[] = await response.json();
      favoritesCache = new Set(favorites.map((fav: Property) => fav.id));
      console.log('Favorites fetched:', Array.from(favoritesCache));
      return favorites;
    } catch (error) {
      console.error('Error in getFavorites:', error);
      throw error;
    }
  },

  // Verificar si una propiedad está en favoritos
  isPropertyFavorite(propertyId: string): boolean {
    // Si no hay token, asumimos que no hay favoritos
    if (!localStorage.getItem('token')) {
      return false;
    }
    return favoritesCache.has(propertyId);
  },

  // Alternar favorito
  async toggleFavorite(propertyId: string): Promise<{ isFavorite: boolean }> {
    const token = getAuthToken();

    try {
      console.log('Toggling favorite for:', propertyId);
      
      // Optimistic update
      const currentlyFavorite = favoritesCache.has(propertyId);
      if (currentlyFavorite) {
        favoritesCache.delete(propertyId);
      } else {
        favoritesCache.add(propertyId);
      }

      const response = await fetch(`${API_URL}/favorites/toggle/${propertyId}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Revert optimistic update if request fails
        if (currentlyFavorite) {
          favoritesCache.add(propertyId);
        } else {
          favoritesCache.delete(propertyId);
        }
        throw new Error(`Error toggling favorite: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Toggle result:', result);
      return result;
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      throw error;
    }
  },

  // Limpiar el caché (útil al cerrar sesión)
  clearCache() {
    console.log('Clearing favorites cache');
    favoritesCache.clear();
    isInitialized = false;
  }
}; 