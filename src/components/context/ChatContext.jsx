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

      // Create a new conversation
      const response = await axios.post(
        'https://work-hive-project.vercel.app/api/v1/conversations',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      let newConversationId;
      if (response.data?.conversationId) {
        newConversationId = response.data.conversationId;
      } else if (response.data?.data?.id) {
        newConversationId = response.data.data.id;
      } else if (response.data?.id) {
        newConversationId = response.data.id;
      }

      if (newConversationId) {
        setConversationId(newConversationId);
        localStorage.setItem('conversationId', newConversationId);
        return newConversationId;
      }

      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('Error initializing conversation:', error.response?.data || error.message);
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

      const messageData = {
        conversation_id: currentConversationId,
        content,
        imageUrl
      };

      const response = await axios.post(
        'https://work-hive-project.vercel.app/api/v1/messages',
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data?.data) {
        await fetchMessages(currentConversationId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
      
      if (error.response?.data?.message === "Conversation not found.") {
        const newConversationId = await initializeConversation();
        if (newConversationId) {
          const retryMessageData = {
            conversation_id: newConversationId,
            content,
            imageUrl
          };
          
          try {
            const retryResponse = await axios.post(
              'https://work-hive-project.vercel.app/api/v1/messages',
              retryMessageData,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            
            if (retryResponse.data?.data) {
              await fetchMessages(newConversationId);
              return true;
            }
          } catch (retryError) {
            console.error('Error retrying message send:', retryError.response?.data || retryError.message);
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