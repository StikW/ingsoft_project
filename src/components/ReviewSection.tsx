import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { reviewService } from '../services/reviewService';
import { Review } from '../types';
import { useStore } from '../store/useStore';
import { AuthRequiredDialog } from './AuthRequiredDialog';
import { useAuth } from '../contexts/AuthContext';

interface ReviewSectionProps {
  propertyId: string;
}

export const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { isAuthenticated, user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [propertyId]);

  const loadReviews = async () => {
    const propertyReviews = await reviewService.getPropertyReviews(propertyId);
    setReviews(propertyReviews);
    const average = await reviewService.getAverageRating(propertyId);
    setAverageRating(average);
  };

  const handleAddReview = async () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }

    if (!user || !newReview.rating || !newReview.comment.trim()) return;

    await reviewService.createReview({
      propertyId,
      userId: user.id,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
    });

    setNewReview({ rating: 0, comment: '' });
    setIsAddingReview(false);
    loadReviews();
  };

  const handleEditReview = async () => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }

    if (!editingReview || !editingReview.rating || !editingReview.comment.trim()) return;

    await reviewService.updateReview(editingReview.id, {
      rating: editingReview.rating,
      comment: editingReview.comment.trim(),
    });

    setEditingReview(null);
    loadReviews();
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }

    await reviewService.deleteReview(reviewId);
    loadReviews();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Reseñas
        </Typography>
        <Rating value={averageRating} precision={0.1} readOnly />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          ({reviews.length} reseñas)
        </Typography>
      </Box>

      {user && (
        <Button
          variant="outlined"
          onClick={() => setIsAddingReview(true)}
          sx={{ mb: 2 }}
        >
          Escribir una reseña
        </Button>
      )}

      <List>
        {reviews.map((review) => (
          <ListItem
            key={review.id}
            secondaryAction={
              user?.id === review.userId && (
                <Box>
                  <IconButton
                    edge="end"
                    onClick={() => setEditingReview(review)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              }
              secondary={review.comment}
            />
          </ListItem>
        ))}
      </List>

      {/* Diálogo para agregar reseña */}
      <Dialog open={isAddingReview} onClose={() => setIsAddingReview(false)}>
        <DialogTitle>Escribir una reseña</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Rating
              value={newReview.rating}
              onChange={(_, value) => setNewReview({ ...newReview, rating: value || 0 })}
              size="large"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Cuéntanos tu experiencia..."
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingReview(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleAddReview}
            disabled={!newReview.rating || !newReview.comment.trim()}
          >
            Publicar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar reseña */}
      <Dialog open={!!editingReview} onClose={() => setEditingReview(null)}>
        <DialogTitle>Editar reseña</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Rating
              value={editingReview?.rating || 0}
              onChange={(_, value) =>
                setEditingReview(
                  editingReview
                    ? { ...editingReview, rating: value || 0 }
                    : null
                )
              }
              size="large"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={editingReview?.comment || ''}
              onChange={(e) =>
                setEditingReview(
                  editingReview
                    ? { ...editingReview, comment: e.target.value }
                    : null
                )
              }
              placeholder="Cuéntanos tu experiencia..."
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingReview(null)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleEditReview}
            disabled={
              !editingReview?.rating || !editingReview?.comment.trim()
            }
          >
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>

      <AuthRequiredDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
      />
    </Box>
  );
}; 