import { useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";
import AddTodoForm from "./AddTodoForm";
import { Container, List, Typography } from "@mui/material";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("todos"));
    if (!storageData) return [];
    return storageData;
  });

  const handelRemove = (id) => {
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
  };

  const handelAddTodo = (text) => {
    setTodos((prevtodos) => {
      return [
        ...prevtodos,
        { name: text, id: crypto.randomUUID(), checked: false },
      ];
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <Container>
        <Typography variant="h2">Todo List</Typography>
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
      </Container>
    </>
  );
};

export default Todo;
