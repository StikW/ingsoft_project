import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PropertyDetails } from './pages/PropertyDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Search } from './pages/Search';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { CreateProperty } from './pages/CreateProperty';
import { Chats } from './pages/Chats';
import { Profile } from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CssBaseline } from '@mui/material';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AppRoutes } from './routes';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Componente para proteger rutas que requieren rol específico
const RoleProtectedRoute = ({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode;
  allowedRole: 'owner' | 'interested';
}) => {
  const { user } = useAuth();
  return user?.role === allowedRole ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                          <OwnerDashboard />
                        </RoleProtectedRoute>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/owner/properties/new"
                    element={
                      <ProtectedRoute>
                        <RoleProtectedRoute allowedRole="owner">
                          <CreateProperty />
                        </RoleProtectedRoute>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/owner/properties/:id/edit"
                    element={
                      <ProtectedRoute>
                        <RoleProtectedRoute allowedRole="owner">
                          <div className="container mx-auto px-4 py-8">
                            <h1 className="text-2xl font-bold mb-4">Editar Propiedad</h1>
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
                        <Profile />
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

                  <Route path="/chats" element={<Chats />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ThemeProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
