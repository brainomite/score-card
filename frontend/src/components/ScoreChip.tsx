import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import { categoryType } from "../types";
import { forwardRef, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import ScoreTable from "./ScoreTable";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ScoreChip = ({
  name,
  score,
  scoreData,
}: {
  name: string;
  score: number;
  scoreData: categoryType;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleChipClick = () => setOpen(true);

  const rows = useMemo(
    () =>
      Object.entries(scoreData).map(([category, playersScores]) => {
        // const player = playersScores.find((player) => player.name === name);
        return { category, points: playersScores[name] || 0 };
      }),
    [scoreData, name]
  );
  return (
    <>
      <Badge key={name} badgeContent={score} color="secondary" max={999}>
        <Chip label={name} color="primary" onClick={handleChipClick} />
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        closeAfterTransition={false}
      >
        <DialogTitle id="alert-dialog-title">
          {`${name}'s ${score} points`}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"> */}
          <ScoreTable rows={rows} />
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
