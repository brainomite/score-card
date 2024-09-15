import { Box, Button, Paper, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import ListChip from "./ListChip";

const InputList = ({
  name,
  listItems,
  setListItems,
}: {
  name: string;
  listItems: string[];
  setListItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const deleteItem = (text: string) => {
    setListItems(listItems.filter((item) => item !== text));
  };

  const generateList = () => {
    return listItems.map((item) => (
      <ListChip text={item} deleteItem={deleteItem} />
    ));
  };

  const addListItem = () => {
    setListItems([...listItems, inputValue]);
    setInputValue("");
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack spacing={2} useFlexGap direction="row">
            <TextField
              label={name}
              variant="standard"
              fullWidth
              sx={{ margin: "10px" }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") addListItem();
              }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ height: "90%", width: "140px" }}
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              addListItem();
            }}
          >
            {`Add ${name}`}
          </Button>
        </Box>
        <Paper>
          <Stack
            spacing={1}
            direction={"column"}
            sx={{
              alignItems: "center",
            }}
          >
            {generateList()}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default InputList;
