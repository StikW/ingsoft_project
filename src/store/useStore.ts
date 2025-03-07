import { create } from 'zustand';
import { User, Property, Message } from '../types';

interface AppState {
  user: User | null;
  properties: Property[];
  messages: Message[];
  setUser: (user: User | null) => void;
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  markMessageAsRead: (messageId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  properties: [],
  messages: [],
  
  setUser: (user) => set({ user }),
  
  setProperties: (properties) => set({ properties }),
  
  addProperty: (property) => 
    set((state) => ({ 
      properties: [...state.properties, property] 
    })),
    
  updateProperty: (property) =>
    set((state) => ({
      properties: state.properties.map((p) => 
        p.id === property.id ? property : p
      ),
    })),
    
  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
    })),
    
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
    
  markMessageAsRead: (messageId) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, read: true } : m
      ),
    })),
})); 