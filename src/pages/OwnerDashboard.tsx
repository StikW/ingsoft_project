import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Home as HomeIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useStore } from '../store/useStore';

export const OwnerDashboard = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const properties = useStore((state) => state.properties);
  const [selectedOption, setSelectedOption] = useState('properties');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    switch (option) {
      case 'new-property':
        navigate('/owner/properties/new');
        break;
      case 'manage-properties':
        navigate('/owner/properties/manage');
        break;
      case 'messages':
        navigate('/owner/messages');
        break;
      case 'profile':
        navigate('/owner/profile');
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Panel de Control
              </Typography>
              <List>
                <ListItem 
                  button 
                  selected={selectedOption === 'properties'}
                  onClick={() => handleOptionClick('properties')}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mis Propiedades" />
                </ListItem>
                <ListItem 
                  button 
                  selected={selectedOption === 'new-property'}
                  onClick={() => handleOptionClick('new-property')}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Publicar Propiedad" />
                </ListItem>
                <ListItem 
                  button 
                  selected={selectedOption === 'messages'}
                  onClick={() => handleOptionClick('messages')}
                >
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mensajes" />
                </ListItem>
                <ListItem 
                  button 
                  selected={selectedOption === 'profile'}
                  onClick={() => handleOptionClick('profile')}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mi Perfil" />
                </ListItem>
                <ListItem 
                  button 
                  selected={selectedOption === 'settings'}
                  onClick={() => handleOptionClick('settings')}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Configuración" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Contenido Principal */}
        <Grid item xs={12} md={9}>
          {selectedOption === 'properties' && (
            <Card>
              <CardContent>
                <Box className="flex justify-between items-center mb-4">
                  <Typography variant="h5">
                    Mis Propiedades
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOptionClick('new-property')}
                  >
                    Publicar Nueva Propiedad
                  </Button>
                </Box>
                
                <Divider className="my-4" />

                {properties.length === 0 ? (
                  <Box className="text-center py-8">
                    <Typography variant="body1" color="text.secondary">
                      No has publicado ninguna propiedad aún
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOptionClick('new-property')}
                      className="mt-4"
                    >
                      Publicar Primera Propiedad
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {properties.map((property) => (
                      <Grid item xs={12} sm={6} key={property.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {property.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {property.type === 'apartment' ? 'Apartamento' : 
                               property.type === 'house' ? 'Casa' : 'Habitación'}
                            </Typography>
                            <Typography variant="h6" className="mt-2">
                              ${property.price.toLocaleString()}
                            </Typography>
                            <Box className="mt-4">
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/owner/properties/${property.id}/edit`)}
                              >
                                Editar
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}; 