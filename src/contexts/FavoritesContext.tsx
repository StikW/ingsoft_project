import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { favoritesService } from '../services/favoritesService';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Set<string>;
  toggleFavorite: (propertyId: string) => Promise<void>;
  isPropertyFavorite: (propertyId: string) => boolean;
  loadFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { isAuthenticated } = useAuth();

  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites(new Set());
      return;
    }

    try {
      const favoritesData = await favoritesService.getFavorites();
      setFavorites(new Set(favoritesData.map(fav => fav.id)));
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites(new Set());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setFavorites(new Set());
    }
  }, [isAuthenticated, loadFavorites]);

  const isPropertyFavorite = useCallback((propertyId: string): boolean => {
    return favorites.has(propertyId);
  }, [favorites]);

  const toggleFavorite = useCallback(async (propertyId: string) => {
    if (!isAuthenticated) {
      console.log('User not authenticated, cannot toggle favorite');
      return;
    }

    try {
      // Actualización optimista
      const newFavorites = new Set(favorites);
      if (favorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      setFavorites(newFavorites);

      // Llamada al servicio
      const result = await favoritesService.toggleFavorite(propertyId);
      
      // Si la llamada falla, revertimos el cambio
      if (!result.isFavorite === favorites.has(propertyId)) {
        setFavorites(favorites);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revertir el cambio en caso de error
      setFavorites(new Set(favorites));
    }
  }, [favorites, isAuthenticated]);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isPropertyFavorite,
      loadFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 