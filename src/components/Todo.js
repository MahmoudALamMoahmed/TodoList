import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { TodosContext } from "../contexts/todosContext";
//Import Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

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
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const deleteTodos = todos.filter((t) => {
      // false dont return element true return element
      /*   if (t.id == todo.id) {
        return false;
      } else {
        return true;
      } */
      return t.id !== todo.id; // ShortCut to code that prev
    });
    setTodos(deleteTodos);
    localStorage.setItem("todos", JSON.stringify(deleteTodos));
  }

  function handleEditClick() {
    setShowEditDialog(true);
  }

  function handleEditClose() {
    setShowEditDialog(false);
  }

  function handleEditConfirm() {
    const editTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: editTodo.title, details: editTodo.details };
      } else {
        return t;
      }
    });
    setTodos(editTodos);
    setShowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(editTodos));
  }
  return (
    <>
      {/* Start Delete Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد ما تحذفها لإن احنا تطبيق غلبان على قد
            حاله معندناش سلة مهملات واسترجاع وحوارات
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم ، إحذف وريحني
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Modal */}

      {/* Start Edit Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleEditClose}
        open={showEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{todo.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={editTodo.title}
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={editTodo.details}
            onChange={(e) => {
              setEditTodo({ ...editTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>إغلاق</Button>
          <Button autoFocus onClick={handleEditConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Edit Modal */}

      <Card
        className="todoCard"
        sx={{
          width: { xs: "80%", sm: "100%" },
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
                variant="h6"
                sx={{ textAlign: "right" }}
                style={{ fontWeight: "200" }}
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
              /* sx={{ paddingLeft: { xs: "20px" } }} */
            >
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
            </Grid>
            {/*End Action Buttons Icons */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
