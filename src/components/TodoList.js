import * as React from "react";
import { useState, useContext, useEffect, useMemo } from "react";
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

//Import Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../contexts/ToastContext";
import VisitorCounter from "./VisitorCounter";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext); // {todos,setTodos} destructure  طلعلي التودوس والسيت تودوس علشان استخدمهم براحتي
  const { showHideToast } =
    useToast(); /* const { showHideToast } = useContext(ToastContext); */

  const [dialogTodo, setDialogTodo] = useState(todos);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, [setTodos]);

  //filteration arrays
  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling from completedTodos ");

      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling from notCompletedTodos ");
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  //Handlers
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
    showHideToast("تمت إضافة مهمة جديدة");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function openEditDialog(todo) {
    setDialogTodo(todo);
    setShowEditDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const deleteTodos = todos.filter((t) => {
      // false dont return element true return element
      /* if (t.id == todo.id) {
        return false;
      } else {
        return true;
      } */
      return t.id !== dialogTodo.id; // ShortCut to code that prev
    });
    setTodos(deleteTodos);
    localStorage.setItem("todos", JSON.stringify(deleteTodos));
    setShowDeleteDialog(false);
    showHideToast("تم حذف المهمة");
  }

  function handleEditClose() {
    setShowEditDialog(false);
  }

  function handleEditConfirm() {
    const editTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, title: dialogTodo.title, details: dialogTodo.details };
      } else {
        return t;
      }
    });
    setTodos(editTodos);
    setShowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(editTodos));
    showHideToast("تم تعديل المهمة ");
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showEdit={openEditDialog}
      />
    );
  });

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
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
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
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
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
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
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

      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h3" style={{ fontWeight: "normal" }}>
              المهام اليومية
            </Typography>
            <Divider />

            {/* Start filter Buttons */}
            <ToggleButtonGroup
              style={{
                direction: "ltr",
                marginTop: "20px",
              }}
              color="primary"
              value={displayTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton value="non-completed">لم تتم</ToggleButton>
              <ToggleButton value="completed">تمت</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* End filter Buttons */}

            {/* Start Todos */}
            <div
              style={{
                maxHeight: "40vh",
                overflow: "scroll",
                /* display: "flex",
              flexDirection: "column",
              alignItems: "center", */
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
                  label="اكتب المهمه هنا"
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
        <Typography style={{ color: "#C0C0C0" }}>
          <VisitorCounter />
        </Typography>
      </Container>
    </>
  );
}
