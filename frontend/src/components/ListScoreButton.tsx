import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

const NOT_A_VALID_NUMBER = "Please enter a valid number";

const ListScoreButton = ({
  name,
  points,
  setNewScore,
}: {
  setNewScore: (score: number) => Promise<void>;
  name: string;
  points: number;
}) => {
  const [open, setOpen] = useState(false);
  // const [newScore, setNewScore] = useState(points);
  const [updatedScore, setUpdatedScore] = useState(points.toString());
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClickOpen = () => {
    setUpdatedScore(points.toString());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisabled(false);
    setError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedScore(event.target.value);
    if (isNaN(Number(event.target.value)) || !event.target.value) {
      setError(true);
      setDisabled(true);
    } else {
      setError(false);
      setDisabled(false);
    }
  };
  return (
    <>
      <ListItemButton key={name} sx={{ pl: 4 }} onClick={handleClickOpen}>
        <ListItemText inset primary={name} secondary={`points: ${points}`} />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const score = parseInt(formJson.score);
            if (score !== points) {
              await setNewScore(score);
              toast.success(`Score updated!`);
            } else {
              toast.success(`Score unchanged`, { icon: "❗" });
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Change Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the score, please enter it below and hit save.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="score"
            label="Set Score"
            value={updatedScore}
            onChange={handleChange}
            error={error}
            helperText={error ? NOT_A_VALID_NUMBER : null}
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disabled} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListScoreButton;
