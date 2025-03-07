import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Search } from './pages/Search';
import { PropertyDetails } from './pages/PropertyDetails';
import { useStore } from './store/useStore';
import { theme } from './theme';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Componente para proteger rutas que requieren rol específico
const RoleProtectedRoute = ({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode;
  allowedRole: 'owner' | 'interested';
}) => {
  const user = useStore((state) => state.user);
  return user?.role === allowedRole ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#ebebeb]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<Search />} />
              
              {/* Rutas protegidas para propietarios */}
              <Route
                path="/owner-dashboard"
                element={
                  <ProtectedRoute>
                    <RoleProtectedRoute allowedRole="owner">
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold mb-4">Panel de Propietario</h1>
                        <p className="text-gray-600">Esta sección está en desarrollo</p>
                      </div>
                    </RoleProtectedRoute>
                  </ProtectedRoute>
                }
              />

              {/* Rutas protegidas para usuarios */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div className="container mx-auto px-4 py-8">
                      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
                      <p className="text-gray-600">Esta sección está en desarrollo</p>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <div className="container mx-auto px-4 py-8">
                      <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
                      <p className="text-gray-600">Esta sección está en desarrollo</p>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
