import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";

//Others
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});
const initialTodos = [];
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          height: "100vh",
          direction: "rtl",
          fontFamily: "Alexandria",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
