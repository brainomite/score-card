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

const ListScoreButton = ({ name, score }: { name: string; score: number }) => {
  const [open, setOpen] = useState(false);
  const [newScore, setNewScore] = useState(score);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ListItemButton key={name} sx={{ pl: 4 }} onClick={handleClickOpen}>
        <ListItemText inset primary={name} secondary={`points: ${score}`} />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const score = formJson.score;
            toast.success(`Score updated to ${score}`);
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
            type="number"
            value={newScore}
            onChange={(e) => setNewScore(parseInt(e.target.value))}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListScoreButton;
