import TextField from "@mui/material/TextField";
import {
  useState,
  Dispatch,
  ChangeEvent,
  SyntheticEvent,
  useCallback,
} from "react";
import CreateListItem from "./CreateListItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

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

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const copyOfListItems = [...listItems];
      copyOfListItems.splice(dragIndex, 1);
      copyOfListItems.splice(hoverIndex, 0, listItems[dragIndex] as string);
      setListItems(copyOfListItems);
    },
    [listItems, setListItems]
  );

  const generateList = () => {
    return listItems.map((item, idx) => (
      <CreateListItem
        key={item}
        text={item}
        deleteItem={() => deleteItem(item)}
        moveItem={moveItem}
        idx={idx}
      />
    ));
  };

  const addListItem = () => {
    const found = listItems.find(
      (item) => item.toLowerCase() === inputValue.toLowerCase()
    );
    if (inputValue === "") {
      setInputError(true);
      setErrorMessage(`${name} cannot be empty`);
    } else if (!found) {
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
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              addListItem();
            }}
          >
            {`Add ${name}`}
          </Button>
        </Box>
        <List>{generateList()}</List>
      </Box>
    </>
  );
};

export default InputList;
