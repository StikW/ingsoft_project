import { Message, Chat } from '../types';

class ChatService {
  private messages: Message[] = [];
  private mockChats: Chat[] = [
    {
      id: '1',
      propertyId: '1',
      senderId: '1',
      receiverId: '2',
      lastMessage: '¿Está disponible la propiedad?',
      unreadCount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      propertyId: '2',
      senderId: '2',
      receiverId: '1',
      lastMessage: 'Me interesa agendar una visita',
      unreadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async getMessages(propertyId: string, userId: string): Promise<Message[]> {
    if (!propertyId) {
      // Si no se proporciona propertyId, obtener todos los mensajes del usuario
      return this.messages.filter(
        (msg) => msg.senderId === userId || msg.receiverId === userId
      );
    }

    // Si se proporciona propertyId, obtener mensajes específicos de la propiedad
    return this.messages.filter(
      (msg) => msg.propertyId === propertyId && 
      (msg.senderId === userId || msg.receiverId === userId)
    );
  }

  async sendMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      read: false,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  async markAsRead(messageId: string): Promise<void> {
    const message = this.messages.find((msg) => msg.id === messageId);
    if (message) {
      message.read = true;
      message.updatedAt = new Date();
    }
  }

  async markAllAsRead(propertyId: string, userId: string): Promise<void> {
    this.messages
      .filter(
        (msg) => 
          msg.propertyId === propertyId && 
          msg.receiverId === userId && 
          !msg.read
      )
      .forEach((msg) => {
        msg.read = true;
        msg.updatedAt = new Date();
      });
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Retornar chats donde el usuario es sender o receiver
    return this.mockChats.filter(
      chat => chat.senderId === userId || chat.receiverId === userId
    );
  }

  async getChatById(chatId: string): Promise<Chat | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockChats.find(chat => chat.id === chatId) || null;
  }
}

export const chatService = new ChatService(); 