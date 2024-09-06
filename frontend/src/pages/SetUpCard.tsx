import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputList from "../components/InputList";
import { useState } from "react";

const SetUpCard = () => {
  const [scoreItems, setScoreItems] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1,
          },
        }}
      >
        <InputList
          name="Score Item"
          listItems={scoreItems}
          setListItems={setScoreItems}
        />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ margin: "5px" }}
        />
        <InputList name="Players" listItems={names} setListItems={setNames} />
      </Box>
    </>
  );
};

export default SetUpCard;
