import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Box,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Home as HomeIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { chatService } from '../services/chatService';
import { mockService } from '../services/mockService';
import { Chat, Property } from '../types';

interface ChatListProps {
  userId: string;
}

interface ChatWithDetails extends Chat {
  property?: Property;
  otherUserName?: string;
}

export const ChatList = ({ userId }: ChatListProps) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, [userId]);

  const loadChats = async () => {
    try {
      const userChats = await chatService.getUserChats(userId);
      
      // Obtener detalles de las propiedades y usuarios
      const chatsWithDetails = await Promise.all(
        userChats.map(async (chat) => {
          const property = await mockService.getPropertyById(chat.propertyId);
          const otherUserId = chat.senderId === userId ? chat.receiverId : chat.senderId;
          const otherUser = await mockService.getUserById(otherUserId);
          
          return {
            ...chat,
            property,
            otherUserName: otherUser?.name,
          };
        })
      );

      setChats(chatsWithDetails);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (propertyId: string, otherUserId: string) => {
    navigate(`/property/${propertyId}`, { state: { openChat: true, otherUserId } });
  };

  if (loading) {
    return <Typography>Cargando chats...</Typography>;
  }

  if (chats.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="textSecondary">No hay chats activos</Typography>
      </Box>
    );
  }

  return (
    <List>
      {chats.map((chat, index) => (
        <Box key={chat.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={chat.otherUserName}
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HomeIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2" component="span">
                    {chat.property?.title}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleChatClick(chat.propertyId, chat.senderId === userId ? chat.receiverId : chat.senderId)}
              >
                <Badge
                  color="primary"
                  variant="dot"
                  invisible={!chat.unreadCount}
                >
                  <ArrowForwardIcon />
                </Badge>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < chats.length - 1 && <Divider variant="inset" component="li" />}
        </Box>
      ))}
    </List>
  );
}; 