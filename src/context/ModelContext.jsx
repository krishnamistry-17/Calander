import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <ModalContext.Provider value={{ openModel, setOpenModel }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
