import { useReducer, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import TodosReducer from "../reducer/TodosReducer";
const initialState = [];

const STORAGE_KEY = "todos";

function initializer() {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  if (!storedTodos) return [];

  try {
    return JSON.parse(storedTodos);
  } catch (error) {
    console.error(error);

    return [];
  }
}
export function TodoProvider({ children }) {
  const [items, dispatch] = useReducer(TodosReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return (
    <TodoContext.Provider
      value={{
        items,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
