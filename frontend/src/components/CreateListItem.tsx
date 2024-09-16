// import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const CreateListItem = ({
  text,
  deleteItem,
}: {
  text: string;
  deleteItem: (text: string) => void;
}) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteItem(text)}
        >
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
