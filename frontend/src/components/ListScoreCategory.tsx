import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import ListScoreButton from "./ListScoreButton";
import { playerPointsType } from "../types";

const ListScoreCategory = ({
  category,
  players,
}: {
  category: string;
  players: playerPointsType;
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon>star</Icon>
        </ListItemIcon>
        <ListItemText primary={category} />
        {open ? (
          <Icon>keyboard_arrow_up</Icon>
        ) : (
          <Icon>keyboard_arrow_down</Icon>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(players).map(([name, points]) => (
            <ListScoreButton key={name} name={name} points={points} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ListScoreCategory;
