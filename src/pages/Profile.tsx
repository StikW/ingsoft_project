import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Chat as ChatIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { ChatList } from '../components/ChatList';
import { PropertyList } from '../components/PropertyList';
import { FavoriteList } from '../components/FavoriteList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditProfile = () => {
    // TODO: Implementar actualización de perfil
    console.log('Actualizar perfil:', profileData);
    setEditProfileOpen(false);
  };

  const handleChangePassword = () => {
    // TODO: Implementar cambio de contraseña
    console.log('Cambiar contraseña:', passwordData);
    setChangePasswordOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Información del perfil */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto 16px auto',
                bgcolor: 'primary.main',
              }}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user?.role === 'owner' ? 'Propietario' : 'Interesado'}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditProfileOpen(true)}
              sx={{ mt: 2 }}
            >
              Editar Perfil
            </Button>
          </Paper>
        </Grid>

        {/* Pestañas y contenido */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<PersonIcon />} label="Información Personal" />
              <Tab icon={<ChatIcon />} label="Mis Chats" />
              {user?.role === 'owner' ? (
                <Tab icon={<HomeIcon />} label="Mis Propiedades" />
              ) : (
                <Tab icon={<FavoriteIcon />} label="Mis Favoritos" />
              )}
              <Tab icon={<SecurityIcon />} label="Seguridad" />
            </Tabs>

            {/* Información Personal */}
            <TabPanel value={activeTab} index={0}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Nombre" secondary={user?.name} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>@</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={user?.email} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>#</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Teléfono" secondary={user?.phone || 'No especificado'} />
                </ListItem>
              </List>
            </TabPanel>

            {/* Mis Chats */}
            <TabPanel value={activeTab} index={1}>
              {user?.id ? (
                <ChatList userId={user.id} />
              ) : (
                <Typography color="textSecondary">
                  Debes iniciar sesión para ver tus chats
                </Typography>
              )}
            </TabPanel>

            {/* Mis Propiedades o Favoritos */}
            <TabPanel value={activeTab} index={2}>
              {user?.id ? (
                user?.role === 'owner' ? (
                  <PropertyList userId={user.id} />
                ) : (
                  <FavoriteList userId={user.id} />
                )
              ) : (
                <Typography color="textSecondary">
                  Debes iniciar sesión para ver tus {user?.role === 'owner' ? 'propiedades' : 'favoritos'}
                </Typography>
              )}
            </TabPanel>

            {/* Seguridad */}
            <TabPanel value={activeTab} index={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<SecurityIcon />}
                  onClick={() => setChangePasswordOpen(true)}
                >
                  Cambiar Contraseña
                </Button>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo para editar perfil */}
      <Dialog open={editProfileOpen} onClose={() => setEditProfileOpen(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Teléfono"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProfileOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditProfile} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para cambiar contraseña */}
      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="Contraseña Actual"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Nueva Contraseña"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Confirmar Nueva Contraseña"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)}>Cancelar</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Cambiar Contraseña
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}; 