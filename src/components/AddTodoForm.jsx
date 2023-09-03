/* eslint-disable react/prop-types */
import { IconButton, InputAdornment, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";

const AddTodoForm = ({ handelAddTodo }) => {
  const [text, setText] = useState("");
  const handelTextChange = (evt) => {
    setText(evt.target.value);
  };

  const handelSubmit = (evt) => {
    evt.preventDefault();
    handelAddTodo(text);
    setText("");
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Add new Todo"
          variant="outlined"
          value={text}
          onChange={handelTextChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handelSubmit}>
                  <AddBoxIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default AddTodoForm;
