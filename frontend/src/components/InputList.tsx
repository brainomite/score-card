import TextField from "@mui/material/TextField";
import { useState, Dispatch, ChangeEvent } from "react";
import ListChip from "./ListChip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const InputList = ({
  name,
  listItems,
  setListItems,
}: {
  name: string;
  listItems: string[];
  setListItems: Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const deleteItem = (text: string) => {
    setListItems(listItems.filter((item) => item !== text));
  };

  const generateList = () => {
    return listItems.map((item) => (
      <ListChip text={item} deleteItem={deleteItem} />
    ));
  };

  const addListItem = () => {
    // check if listItems already contains inputValue
    const found = listItems.find(
      (item) => item.toLowerCase() === inputValue.toLowerCase()
    );
    console.log("🚀 ~ addListItem ~ found:", found);

    if (!found) {
      setListItems([...listItems, inputValue]);
      setInputValue("");
    } else {
      setInputError(true);
      setErrorMessage(`${name} already exists`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setInputError(false);
    setErrorMessage("");
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
              error={inputError}
              helperText={errorMessage}
              onChange={handleChange}
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
