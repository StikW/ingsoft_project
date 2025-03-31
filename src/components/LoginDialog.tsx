import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, message }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar sesión requerido</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleLogin} color="primary" variant="contained">
          Iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 