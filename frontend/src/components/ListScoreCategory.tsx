import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import ListScoreButton from "./ListScoreButton";

type pointType = {
  name: string;
  score: number;
};

const ListScoreCategory = ({
  pointName,
  points,
}: {
  pointName: string;
  points: pointType[];
}) => {
  const [open, setOpen] = useState(false);

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
          {points.map(({ name, score }) => (
            <ListScoreButton key={name} name={name} score={score} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ListScoreCategory;
