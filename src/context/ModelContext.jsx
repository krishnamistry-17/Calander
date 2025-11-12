import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModel, setOpenModel] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <ModalContext.Provider value={{ openModel, setOpenModel, modalData, setModalData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
