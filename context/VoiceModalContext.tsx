import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VoiceModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const VoiceModalContext = createContext<VoiceModalContextType | undefined>(undefined);

interface VoiceModalProviderProps {
  children: ReactNode;
}

export const VoiceModalProvider: React.FC<VoiceModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <VoiceModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </VoiceModalContext.Provider>
  );
};

export const useVoiceModal = (): VoiceModalContextType => {
  const context = useContext(VoiceModalContext);
  if (!context) {
    throw new Error('useVoiceModal must be used within a VoiceModalProvider');
  }
  return context;
};
