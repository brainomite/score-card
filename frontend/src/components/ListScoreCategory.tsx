import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import ListScoreButton from "./ListScoreButton";
import { playerType } from "../types";

const ListScoreCategory = ({
  category: pointName,
  players: points,
}: {
  category: string;
  players: playerType[];
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
        <ListItemText primary={pointName} />
        {open ? (
          <Icon>keyboard_arrow_up</Icon>
        ) : (
          <Icon>keyboard_arrow_down</Icon>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {points.map(({ name, points: score }) => (
            <ListScoreButton key={name} name={name} score={score} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ListScoreCategory;
