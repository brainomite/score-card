// import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import { SetStateAction } from "react";

const CreateListItem = ({
  text,
  deleteItem,
}: // setListItems,
{
  text: string;
  deleteItem: () => void;
  // setListItems: (value: SetStateAction<string[]>) => void;
}) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
          <Icon>delete</Icon>
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <Icon>drag_indicator</Icon>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default CreateListItem;
