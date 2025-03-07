import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
} from '@mui/icons-material';

export const SearchFilter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}${selectedType !== 'all' ? `&type=${selectedType}` : ''}`);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      <form onSubmit={handleSearch}>
        {/* Barra de búsqueda */}
        <div className={`flex items-center bg-white rounded-full border mb-4 ${isSearchFocused ? 'border-primary-main ring-2 ring-primary-light ring-opacity-50' : 'border-gray-200'}`}>
          <div className="flex-1 flex items-center">
            <SearchIcon className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Busca por ubicación, tipo de propiedad o características..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="ml-2 mr-2 bg-primary-main text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Buscar
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-primary-main text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('apartment')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'apartment'
                ? 'bg-primary-main text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Apartamentos
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('house')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'house'
                ? 'bg-primary-main text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Casas
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('room')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === 'room'
                ? 'bg-primary-main text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Habitaciones
          </button>
        </div>

        {/* Filtros adicionales */}
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <button
            type="button"
            className="flex items-center gap-1 hover:text-gray-900"
          >
            <FilterIcon className="w-4 h-4" />
            Más filtros
          </button>
          <span>|</span>
          <button type="button" className="hover:text-gray-900">
            Precio
          </button>
          <button type="button" className="hover:text-gray-900">
            Habitaciones
          </button>
          <button type="button" className="hover:text-gray-900">
            Baños
          </button>
        </div>
      </form>
    </div>
  );
}; 