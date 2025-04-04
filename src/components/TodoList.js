import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext); // {todos,setTodos} destructure  طلعلي التودوس والسيت تودوس علشان استخدمهم براحتي

  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, [setTodos]);

  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }
  //filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const x = [...todos, newTodo]; // magic to repair
    setTodos(x);
    localStorage.setItem("todos", JSON.stringify(x));
    setTitleInput(""); // to remove text in input after adding
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h3" style={{ fontWeight: "normal" }}>
            مهامي اليومية
          </Typography>
          <Divider />

          {/* Start filter Buttons */}
          <ToggleButtonGroup
            style={{
              direction: "ltr",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            color="primary"
            value={displayTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
          >
            <ToggleButton value="non-completed">الغير منجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* End filter Buttons */}

          {/* Start Todos */}
          <div
            style={{
              maxHeight: "60vh",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
            }}
          >
            {todosJsx}
          </div>
          {/* End Todos */}

          {/*Start Input + Add Button */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/*End Input + Add Button */}
        </CardContent>
      </Card>
    </Container>
  );
}
