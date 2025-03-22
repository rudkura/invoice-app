import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, type = "success") => {
    const id = Date.now();
    if (type === "netError") {
      message = `Chyba komunikace: ${message}`;
      type = "danger"
    }
    setMessages((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
