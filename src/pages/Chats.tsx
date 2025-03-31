import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  IconButton,
  Dialog,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { chatService } from '../services/chatService';
import { mockService } from '../services/mockService';
import { Message, Property, User } from '../types';
import { Chat } from '../components/Chat';

const Chats = () => {
  const [conversations, setConversations] = useState<{
    property: Property;
    lastMessage: Message;
    unreadCount: number;
  }[]>([]);
  const [selectedChat, setSelectedChat] = useState<{
    propertyId: string;
    otherUserId: string;
  } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const currentUserId = '1'; // TODO: Obtener del contexto de autenticación

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      // Obtener todas las propiedades para mostrar información en los chats
      const properties = await mockService.getProperties();
      
      // Obtener todos los mensajes del usuario
      const allMessages = await chatService.getMessages('', currentUserId);
      
      // Agrupar mensajes por propiedad
      const messagesByProperty = allMessages.reduce((acc, message) => {
        if (!acc[message.propertyId]) {
          acc[message.propertyId] = [];
        }
        acc[message.propertyId].push(message);
        return acc;
      }, {} as { [key: string]: Message[] });

      // Crear lista de conversaciones
      const conversationsList = await Promise.all(
        Object.entries(messagesByProperty).map(async ([propertyId, messages]) => {
          const property = properties.find(p => p.id === propertyId);
          if (!property) return null;

          const lastMessage = messages[messages.length - 1];
          const unreadCount = messages.filter(
            msg => !msg.read && msg.receiverId === currentUserId
          ).length;

          return {
            property,
            lastMessage,
            unreadCount,
          };
        })
      );

      // Filtrar conversaciones nulas y ordenar por fecha del último mensaje
      setConversations(
        conversationsList
          .filter((conv): conv is NonNullable<typeof conv> => conv !== null)
          .sort((a, b) => 
            new Date(b.lastMessage.createdAt).getTime() - 
            new Date(a.lastMessage.createdAt).getTime()
          )
      );
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const handleChatClick = (propertyId: string, otherUserId: string) => {
    setSelectedChat({ propertyId, otherUserId });
    setChatOpen(true);
  };

  const formatMessagePreview = (message: Message) => {
    const content = message.content;
    return content.length > 50 ? `${content.substring(0, 50)}...` : content;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Conversaciones
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <List>
                {conversations.map((conversation) => (
                  <ListItem
                    key={conversation.property.id}
                    button
                    onClick={() => handleChatClick(
                      conversation.property.id,
                      conversation.lastMessage.senderId === currentUserId
                        ? conversation.lastMessage.receiverId
                        : conversation.lastMessage.senderId
                    )}
                  >
                    <ListItemAvatar>
                      <Badge
                        color="error"
                        variant="dot"
                        invisible={conversation.unreadCount === 0}
                      >
                        <Avatar>
                          <HomeIcon />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={conversation.property.title}
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {formatMessagePreview(conversation.lastMessage)}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {new Date(conversation.lastMessage.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {selectedChat ? (
            <Chat
              propertyId={selectedChat.propertyId}
              currentUserId={currentUserId}
              otherUserId={selectedChat.otherUserId}
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}
            >
              <ChatIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Selecciona una conversación para comenzar a chatear
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export { Chats }; 