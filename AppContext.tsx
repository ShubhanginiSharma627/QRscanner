// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Text } from 'react-native';

interface AppContextProps {
  websiteLink: string | null;
  setWebsiteLink: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [websiteLink, setWebsiteLink] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ websiteLink, setWebsiteLink }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
