import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { SnackbarContext } from "./context/SnackbarContext";
import { useState } from "react";
import SimpleSnackbar from "./SimpleSnackbar";

function App() {
  const [open, setOpen] = useState(false);
  const [massage, setMassage] = useState("");

  function showSnscker(massage) {
    setOpen(true);
    setMassage(massage);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <>
      <SnackbarContext.Provider value={{ showSnscker }}>
        <Container
          maxWidth="sm"
          sx={{
            direction: "rtl",
            background: "white",
            maxHeight: "80vh",
            overflow: "scroll",
          }}
          id="containr"
        >
          {" "}
          <SimpleSnackbar open={open} massage={massage} />
          <Todo />
          <AddTodo />
        </Container>
      </SnackbarContext.Provider>
    </>
  );
}

export default App;
