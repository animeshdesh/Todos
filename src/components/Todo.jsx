/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";
import AddTodoForm from "./AddTodoForm";
import { Container, List, Typography, Button, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";

function getTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day} - `;
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(today);

  return `${formattedDate}${dayOfWeek}`;
}

const Todo = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [name, setName] = useState(() => {
    const gettingName = localStorage.getItem("name");
    if (!gettingName) return;
    return gettingName;
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [todos, setTodos] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("todos"));
    if (!storageData) return [];
    return storageData;
  });

  const todayDate = getTodaysDate();

  const deletemessages = [
    "hope u completed the task and not skipped it u lazy ass",
    "hope u r not procrastinating u dumb human",
    "deleted it? really? u r that smart? unreal",
    "wowowow i cant believe u completed it",
    "Hope you're not procrastinating!",
    "Is that task still playing hide and seek?",
  ];
  const addingmessages = [
    "look at u adding task",
    "Make sure u complete them or i will tell ur momma",
    "adding task uff, which self help book made u do this?",
    "taking life control back? lets see how long it lasts",
    "u better finish this task & not just look at it everyday",
    "your present self have to complete the task not your future",
  ];
  const openSnackbar = (message) => {
    setSnackbarMessage(message);

    setSnackbarOpen(true);
  };

  const handelRemove = (id) => {
    const randomIndex = Math.floor(Math.random() * deletemessages.length);
    const randomMessage = deletemessages[randomIndex];
    openSnackbar(randomMessage);
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
    const randomIndex = Math.floor(Math.random() * addingmessages.length);
    const randomMessage = addingmessages[randomIndex];
    openSnackbar(randomMessage);
    setTodos((prevtodos) => {
      return [
        ...prevtodos,
        { name: text, id: crypto.randomUUID(), checked: false },
      ];
    });
  };

  const handelDeleteAllSelected = () => {
    const randomIndex = Math.floor(Math.random() * deletemessages.length);
    const randomMessage = deletemessages[randomIndex];
    openSnackbar(randomMessage);
    setTodos((prevtodo) => {
      const updatedTodos = prevtodo.filter((todo) => !todo.checked);

      return updatedTodos;
    });
  };
  const handelLogout = () => {
    localStorage.removeItem("name");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {name ? (
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1.5rem 0rem 1.5rem 0rem",
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>Todo List📃</Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>Hi {name}👋</Typography>
          </Box>
          <Typography variant="h5" sx={{ fontSize: "1.5rem" }}>
            {todayDate}
          </Typography>
          {todos ? (
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                border: "1px solid grey",
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
          ) : (
            <Typography>
              No Todos for you (Good mental health you are having)
            </Typography>
          )}

          <AddTodoForm handelAddTodo={handelAddTodo} />
          <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: "25px", width: "100%" }}
            onClick={handelDeleteAllSelected}
          >
            Delete Selected
          </Button>
          <Link to="/">
            <Button
              variant="outlined"
              sx={{ marginTop: "25px", width: "100%" }}
              onClick={handelLogout}
            >
              Log Out
            </Button>
          </Link>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000} // Adjust the duration as needed
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
            />
          </Box>
          <Box
            sx={{
              marginTop: "5rem",
              bottom: 10,
              left: 50,
              right: 0,
              padding: "10px",
              background: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
            }}
          >
            <a
              href="https://www.linkedin.com/in/animesh-deshmukh/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Typography>Made with Love ❤️ </Typography>
              <Typography>by Animesh 👨‍💻</Typography>
            </a>
          </Box>
        </Container>
      ) : (
        <Container sx={{ marginTop: "5rem" }}>
          <Typography variant="h3">Please enter the name</Typography>

          <Link to="/">
            <Button
              sx={{
                fontSize: "32px",
                textAlign: "left",
                color: "black",
                marginTop: "5rem",
              }}
            >
              Go Back
            </Button>
          </Link>
          <Box
            sx={{
              bottom: 10,
              left: 50,
              right: 0,
              padding: "10px",
              background: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
            }}
          >
            <a
              href="https://www.linkedin.com/in/animesh-deshmukh/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Typography>
                I'll Beat you with Love ❤️ go back and enter name{" "}
              </Typography>
              <Typography>by Animesh 👨‍💻</Typography>
            </a>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Todo;
