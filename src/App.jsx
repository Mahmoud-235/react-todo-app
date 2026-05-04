import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { SnakerProvider } from "./prodder/SnakerProvider";

function App() {
  return (
    <>
      <SnakerProvider>
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
          <Todo />
          <AddTodo />
        </Container>
      </SnakerProvider>
    </>
  );
}

export default App;
