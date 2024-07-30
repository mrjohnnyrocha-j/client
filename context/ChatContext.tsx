import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface ChatMessage {
  id: number;
  chat_id: string;
  sender: string;
  message: string;
  created_at: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  icon: string;
}

interface ChatContextType {
  chats: Chat[];
  chatMessages: ChatMessage[];
  addChat: (chat: Chat) => void;
  addChatMessage: (chatId: string, sender: string, message: string) => Promise<void>;
  fetchChatMessages: (chatId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const addChat = (chat: Chat) => {
    setChats(prevChats => [...prevChats, chat]);
  };

  const addChatMessage = async (chatId: string, sender: string, message: string) => {
    try {
      const response = await axios.post('http://localhost:5500/chats', { chat_id: chatId, sender, message });
      setChatMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error adding chat message:', error);
    }
  };

  const fetchChatMessages = async (chatId: string) => {
    try {
      const response = await axios.get(`http://localhost:5500/chats/${chatId}`);
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ chats, chatMessages, addChat, addChatMessage, fetchChatMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
