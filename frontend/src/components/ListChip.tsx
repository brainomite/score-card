import { Chip } from "@mui/material";

const ListChip = ({
  text,
  deleteItem,
}: {
  text: string;
  deleteItem: (text: string) => void;
}) => {
  return <Chip label={text} key={text} onDelete={() => deleteItem(text)} />;
};

export default ListChip;
