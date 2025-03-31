import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AuthRequiredDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AuthRequiredDialog = ({ open, onClose }: AuthRequiredDialogProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar sesión requerido</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para realizar esta acción, necesitas iniciar sesión en tu cuenta.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 