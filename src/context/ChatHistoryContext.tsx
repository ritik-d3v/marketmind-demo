import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

interface ChatMessageProps {
  id: string;
  prompt: string;
  response: string | React.ReactNode;
  showSuggestions: boolean;
  isCommentary: boolean;
}

interface ChatHistoryProps {
  children: ReactNode;
}

interface ChatHistoryContextProps {
  chatHistory: ChatMessageProps[];
  setChatHistory: Dispatch<SetStateAction<ChatMessageProps[]>>;
}

const ChatHistoryContext = createContext<ChatHistoryContextProps | undefined>(undefined);

const CHAT_HISTORY_KEY = 'chatHistory';

export function ChatHistoryProvider({ children }: ChatHistoryProps) {
  const [chatHistory, setChatHistoryState] = useState<ChatMessageProps[]>([]);

  useEffect(() => {
    // Clear localStorage and sessionStorage on initial load
    localStorage.removeItem(CHAT_HISTORY_KEY);
    sessionStorage.clear();

    // Initialize chat history to an empty array
    setChatHistoryState([]);
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CHAT_HISTORY_KEY) {
        const newHistory = event.newValue ? JSON.parse(event.newValue) : [];
        setChatHistoryState(newHistory);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatHistoryContext.Provider value={{ chatHistory, setChatHistory: setChatHistoryState }}>{children}</ChatHistoryContext.Provider>
  );
}

export const useChatHistory = (): ChatHistoryContextProps => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
};
