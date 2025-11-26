import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalState {
  [key: string]: boolean;
}

interface InputModalContextProps {
  modals: ModalState;
  showModal: (key: string) => void;
  hideModal: (key: string) => void;
  toggleModal: (key: string) => void;
}

const InputModalContext = createContext<InputModalContextProps | undefined>(undefined);

export const InputModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalState>({
    project: false,
    workspace: false,
    task: false,
  });

  const showModal = (key: string) => setModals((prev) => ({ ...prev, [key]: true }));
  const hideModal = (key: string) => setModals((prev) => ({ ...prev, [key]: false }));
  const toggleModal = (key: string) => setModals((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <InputModalContext.Provider value={{ modals, showModal, hideModal, toggleModal }}>
      {children}
    </InputModalContext.Provider>
  );
};

export const useInputModal = (): InputModalContextProps => {
  const context = useContext(InputModalContext);
  if (!context) throw new Error('useInputModal must be used within InputModalProvider');
  return context;
};
