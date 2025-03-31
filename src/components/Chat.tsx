import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { chatService } from '../services/chatService';
import { Message } from '../types';

interface ChatProps {
  propertyId: string;
  currentUserId: string;
  otherUserId: string;
}

export const Chat = ({ propertyId, currentUserId, otherUserId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadMessages();
    scrollToBottom();
    chatService.markAllAsRead(propertyId, currentUserId);
  }, [propertyId, currentUserId]);

  const loadMessages = async () => {
    const loadedMessages = await chatService.getMessages(propertyId, currentUserId);
    setMessages(loadedMessages);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = await chatService.sendMessage({
      senderId: currentUserId,
      receiverId: otherUserId,
      propertyId,
      content: newMessage.trim(),
      read: false,
    });

    setMessages([...messages, message]);
    setNewMessage('');
    scrollToBottom();
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Chat sobre la propiedad</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.senderId === currentUserId ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              sx={{
                p: 1,
                maxWidth: '70%',
                backgroundColor: message.senderId === currentUserId ? 'primary.main' : 'grey.100',
                color: message.senderId === currentUserId ? 'white' : 'text.primary',
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Divider />
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}; 