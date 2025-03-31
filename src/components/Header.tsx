import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout: authLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authLogout();
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleDashboard = () => {
    handleClose();
    navigate('/owner-dashboard');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={() => setAnchorEl(document.body)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <HomeIcon />
          Inmobiliaria
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<SearchIcon />}
              onClick={() => navigate('/search')}
            >
              Buscar
            </Button>
            {user ? (
              <>
                {user.role === 'owner' && (
                  <Button
                    color="inherit"
                    startIcon={<DashboardIcon />}
                    onClick={handleDashboard}
                  >
                    Panel de Control
                  </Button>
                )}
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  onClick={handleProfile}
                >
                  Mi Perfil
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        )}

        {isMobile && (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenu}
              sx={{ ml: 2 }}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user ? (
                <>
                  {user.role === 'owner' && (
                    <MenuItem onClick={handleDashboard}>
                      <DashboardIcon sx={{ mr: 1 }} />
                      Panel de Control
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Mi Perfil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate('/login')}>
                    Iniciar Sesión
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/register')}>
                    Registrarse
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
