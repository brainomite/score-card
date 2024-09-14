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

const ListScoreButton = ({ name, score }: { name: string; score: number }) => {
  const [open, setOpen] = useState(false);
  const [newScore, setNewScore] = useState(score);
  const [currentScore, setCurrentScore] = useState(score);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reset: boolean) => {
    if (reset) {
      setNewScore(currentScore);
    }
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewScore(parseInt(event.target.value));
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
        <ListItemText
          inset
          primary={name}
          secondary={`points: ${currentScore}`}
        />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={() => handleClose(true)}
        closeAfterTransition={false}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const score = formJson.score;
            setCurrentScore(score);
            toast.success(`Score updated to ${score}`);
            handleClose(false);
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
            value={newScore}
            onChange={handleChange}
            error={error}
            helperText={error ? NOT_A_VALID_NUMBER : null}
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>Cancel</Button>
          <Button disabled={disabled} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListScoreButton;
