/* eslint-disable react/prop-types */
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleTodo = ({ todo, labelId, handelRemove, handelChecked }) => {
  return (
    <ListItem
      key={todo.key}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={handelRemove}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
            onChange={handelChecked}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={todo.name}
          style={{ fontSize: "16px", fontWeight: "bold" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SingleTodo;
