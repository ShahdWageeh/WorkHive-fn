import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const { token, decoded } = useContext(AuthContext);

  // Clear conversation when user changes
  useEffect(() => {
    if (decoded) {
      // Clear existing conversation data
      localStorage.removeItem('conversationId');
      setConversationId(null);
      setMessages([]);
      // Initialize new conversation for the current user
      initializeConversation();
    }
  }, [decoded?.id]);

  // Initialize conversation
  const initializeConversation = async () => {
    if (!token || !decoded) return null;

    try {
      // Check if we already have a conversation ID in localStorage
      const storedConversationId = localStorage.getItem('conversationId');
      
      if (storedConversationId) {
        // Verify if the stored conversation is still valid
        try {
          await axios.get(
            `https://work-hive-project.vercel.app/api/v1/messages/${storedConversationId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setConversationId(storedConversationId);
          return storedConversationId;
        } catch (error) {
          localStorage.removeItem('conversationId');
        }
      }

      try {
        // First try to create a new conversation
        const conversationData = {
          user_id: decoded.id,
          status: 'active',
          type: 'support'
        };

        console.log('Creating conversation with data:', conversationData);

        const response = await axios.post(
          'https://work-hive-project.vercel.app/api/v1/conversations',
          conversationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('Conversation response:', response.data);

        // If we get a 400 with "conversation already exists", extract the conversation ID from the error response
        if (response.data?.data?.id) {
          const newConversationId = response.data.data.id;
          setConversationId(newConversationId);
          localStorage.setItem('conversationId', newConversationId);
          return newConversationId;
        }

        throw new Error('Invalid response format from server');
      } catch (error) {
        console.error('Error creating conversation:', error);
        
        // If we get an error about existing conversation, extract the ID from the error response
        if (error.response?.data?.data?.id) {
          const existingConversationId = error.response.data.data.id;
          setConversationId(existingConversationId);
          localStorage.setItem('conversationId', existingConversationId);
          return existingConversationId;
        }

        throw error;
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      return null;
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!conversationId || !token) return;

    try {
      const response = await axios.get(
        `https://work-hive-project.vercel.app/api/v1/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send message
  const sendMessage = async (content, imageUrl = null) => {
    if (!conversationId || !token || !decoded) {
      const newConversationId = await initializeConversation();
      if (!newConversationId) return false;
    }

    try {
      const messageData = {
        conversation_id: conversationId,
        content,
        imageUrl,
        sender_type: 'user',
        sender_id: decoded.id
      };

      await axios.post(
        'https://work-hive-project.vercel.app/api/v1/messages',
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      await fetchMessages();
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  // Fetch messages when conversation ID changes
  useEffect(() => {
    if (conversationId && token) {
      fetchMessages();
    }
  }, [conversationId, token]);

  const value = {
    messages,
    sendMessage,
    conversationId,
    initializeConversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};