import { useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";
import AddTodoForm from "./AddTodoForm";
import { Container, List, Typography, Button, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

function getTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
}

const Todo = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [todos, setTodos] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("todos"));
    if (!storageData) return [];
    return storageData;
  });

  const todayDate = getTodaysDate();
  const openSnackbar = (message) => {
    setSnackbarMessage(message);

    setSnackbarOpen(true);
  };

  const handelRemove = (id) => {
    openSnackbar("Deleted Todo");
    setTodos((prevtodos) => {
      return prevtodos.filter((t) => t.id !== id);
    });
  };

  const handelChecked = (id) => {
    setTodos((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      });
    });
    openSnackbar(`Checked`);
  };

  const handelAddTodo = (text) => {
    openSnackbar("Added todo successfully");
    setTodos((prevtodos) => {
      return [
        ...prevtodos,
        { name: text, id: crypto.randomUUID(), checked: false },
      ];
    });
  };

  const handelDeleteAllSelected = () => {
    setTodos((prevtodo) => {
      const updatedTodos = prevtodo.filter((todo) => !todo.checked);
      openSnackbar("Selected todos deleted successfully");
      return updatedTodos;
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Todo List</Typography>
          <Typography variant="h4">{todayDate}</Typography>
        </Box>

        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            border: "1px solid black",
            margin: "25px 0px 25px 0px",
          }}
        >
          {todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo.id}`;

            return (
              <>
                <SingleTodo
                  todo={todo}
                  labelId={labelId}
                  key={todo.id}
                  handelRemove={() => handelRemove(todo.id)}
                  handelChecked={() => handelChecked(todo.id)}
                />
              </>
            );
          })}
        </List>
        <AddTodoForm handelAddTodo={handelAddTodo} />
        <Button
          variant="outlined"
          color="error"
          sx={{ marginTop: "25px" }}
          onClick={handelDeleteAllSelected}
        >
          Delete Selected
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000} // Adjust the duration as needed
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </>
  );
};

export default Todo;
