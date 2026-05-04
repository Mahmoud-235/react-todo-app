import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TodoContext } from "./context/TodoContext";
import { useContext, useState } from "react";
import { SnackbarContext } from "./context/SnackbarContext";
import "./todo.css";

export default function AddTodo() {
  const { showSnscker } = useContext(SnackbarContext);
  const [valueInput, setValueInput] = useState("");
  const { items, setItems } = useContext(TodoContext);

  const handleAdd = () => {
    if (valueInput.trim() === "") return;

    const list = {
      id: Date.now(),
      name: valueInput,
      isdone: false,
    };
    const updatedTodos = [...items, list];
    setItems(updatedTodos);

    setValueInput("");
    showSnscker("تم الاضافه نجاح");
  };

  return (
    <div id="addcon">
      <TextField
        fullWidth
        label="عنوان المهمه"
        variant="outlined"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />

      <Button
        variant="contained"
        disableElevation
        id="btadd"
        onClick={handleAdd}
        disabled={valueInput.length == 0}
      >
        إضافة
      </Button>
    </div>
  );
}
