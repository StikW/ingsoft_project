import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { UserRole } from '../types';
import { mockService } from '../services/mockService';
import { useAuth } from '../contexts/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole,
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value as UserRole,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      // TODO: Implementar la lógica real de registro
      // Por ahora, simulamos un registro exitoso
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      login(newUser);
      navigate(newUser.role === 'owner' ? '/owner-dashboard' : '/search');
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Registro
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleTextChange}
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleTextChange}
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleTextChange}
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleTextChange}
            margin="normal"
            required
            disabled={loading}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Usuario</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              label="Tipo de Usuario"
              required
              disabled={loading}
            >
              <MenuItem value="owner">Propietario</MenuItem>
              <MenuItem value="interested">Interesado</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleTextChange}
            margin="normal"
            disabled={loading}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}; 