import { Link } from 'react-router-dom';
import {
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Barra Principal */}
        <div className="h-16 flex items-center justify-between">
          {/* Título */}
          <Link to="/" className="text-xl font-bold text-primary-main hover:text-primary-dark transition-colors">
            RentHub
          </Link>

          {/* Navegación Principal */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/map" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Explorar Mapa
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 text-sm font-medium">
                <span>Propiedades</span>
                <ArrowDownIcon className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/search?type=apartment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Apartamentos
                  </Link>
                  <Link to="/search?type=house" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Casas
                  </Link>
                  <Link to="/search?type=room" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Habitaciones
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/verified" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Verificados
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="bg-primary-main text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Registrarse
            </Link>
            <button className="md:hidden text-gray-600">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
