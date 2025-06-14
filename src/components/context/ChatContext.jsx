import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { token } = useContext(AuthContext);

  // Initialize conversation
  const initializeConversation = async () => {
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

      // Get user data from token
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      console.log('Token data:', tokenData);

      try {
        // First try to create a new conversation
        const conversationData = {
          user_id: tokenData.id,
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
  const fetchMessages = async (convId) => {
    if (!convId) return;
    
    try {
      const response = await axios.get(
        `https://work-hive-project.vercel.app/api/v1/messages/${convId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data?.data) {
        setMessages(Array.isArray(response.data.data) ? response.data.data : []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error.response?.data || error.message);
      setMessages([]);
    }
  };

  // Send message
  const sendMessage = async (content, imageUrl = null) => {
    try {
      let currentConversationId = conversationId;
      
      if (!currentConversationId) {
        currentConversationId = await initializeConversation();
        if (!currentConversationId) {
          throw new Error('Failed to initialize conversation');
        }
      }

      // Get user data from token
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const messageData = {
        conversation_id: currentConversationId,
        content,
        imageUrl,
        sender_type: 'user',
        sender_id: tokenData.id,
        type: 'text'
      };

      console.log('Sending message with data:', messageData);

      const response = await axios.post(
        'https://work-hive-project.vercel.app/api/v1/messages',
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Message response:', response.data);

      if (response.data?.data) {
        await fetchMessages(currentConversationId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      
      if (error.response?.data?.message === "Conversation not found.") {
        const newConversationId = await initializeConversation();
        if (newConversationId) {
          // Get user data from token
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const retryMessageData = {
            conversation_id: newConversationId,
            content,
            imageUrl,
            sender_type: 'user',
            sender_id: tokenData.id,
            type: 'text'
          };
          
          console.log('Retrying message with data:', retryMessageData);
          
          try {
            const retryResponse = await axios.post(
              'https://work-hive-project.vercel.app/api/v1/messages',
              retryMessageData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            
            console.log('Retry response:', retryResponse.data);
            
            if (retryResponse.data?.data) {
              await fetchMessages(newConversationId);
              return true;
            }
          } catch (retryError) {
            console.error('Error retrying message:', retryError);
            console.error('Retry error response data:', retryError.response?.data);
            console.error('Retry error status:', retryError.response?.status);
            console.error('Retry error headers:', retryError.response?.headers);
          }
        }
      }
      return false;
    }
  };

  // Initialize conversation on mount if token exists
  useEffect(() => {
    if (token) {
      initializeConversation();
    }
  }, [token]);

  // Set up polling for messages
  useEffect(() => {
    let intervalId;
    if (conversationId) {
      // Initial fetch
      fetchMessages(conversationId);
      
      // Set up polling every 3 seconds
      intervalId = setInterval(() => {
        fetchMessages(conversationId);
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [conversationId, token]);

  return (
    <ChatContext.Provider value={{
      conversationId,
      messages,
      sendMessage,
      fetchMessages,
      initializeConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 