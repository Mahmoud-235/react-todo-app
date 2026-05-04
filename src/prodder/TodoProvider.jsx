import { useState } from "react";
import { TodoContext } from "../context/TodoContext";
export function TodoProvider({ children }) {
  const [items, setItems] = useState([]);

  return (
    <TodoContext.Provider value={{ items, setItems }}>
      {children}
    </TodoContext.Provider>
  );
}
