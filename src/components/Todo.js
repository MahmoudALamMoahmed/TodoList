import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

function Todo({ todo, showDelete, showEdit }) {
  /* const [editTodo, setEditTodo] = useState({
    title: todo.title,
    details: todo.details,
  }); */
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast(); //const { showHideToast } = useContext(ToastContext);

  //Event Handlers

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        /* if (t.isCompleted == true) {
      t.isCompleted = false;
    } else {
      t.isCompleted = true;
    } */
        t.isCompleted = !t.isCompleted;
        if (t.isCompleted) {
          showHideToast("لقد انجزت المهمة بنجاح");
        } else {
          showHideToast(" ! لقد أزلت المهمة من الانجازات");
        }
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleEditClick() {
    showEdit(todo);
  }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          /*  width: { xs: "100%", sm: "100%" }, */
          backgroundColor: "#283593",
          color: "white",
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container>
            <Grid size={8}>
              <Typography
                variant="h6"
                sx={{ textAlign: "right" }}
                style={{
                  fontWeight: "bold",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                /* variant="h6" */
                sx={{ textAlign: "right" }}
                style={{ fontSize: "12px" }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/*Start Action Buttons Icons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              /* flexWrap="wrap" */
              flexDirection="row-reverse"
              /* sx={{ paddingLeft: { sm: "15px" } }} */
            >
              {/* Icon Delete */}

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon
                  sx={{ fontSize: { xs: 15, sm: 24 } }}
                />
              </IconButton>

              {/* Icon Delete */}

              {/* Icon Edit */}

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={handleEditClick}
              >
                <ModeEditOutlineOutlinedIcon
                  sx={{ fontSize: { xs: 15, sm: 24 } }}
                />
              </IconButton>
              {/* Icon Edit */}

              {/* Icont right */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted === true ? "white" : "#8bc34a",
                  backgroundColor:
                    todo.isCompleted === true ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon sx={{ fontSize: { xs: 15, sm: 24 } }} />
              </IconButton>
              {/* Icon right */}
            </Grid>
            {/*End Action Buttons Icons */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
