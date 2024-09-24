import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Icon from "@mui/material/Icon";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef, Ref, FC } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ShareModalProps = {
  open: boolean;
  handleClose: () => void;
};

const ShareModal: FC<ShareModalProps> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QRCodeSVG value={document.URL} size={250} />
        <Icon
          fontSize="large"
          sx={{ marginTop: "2rem" }}
          onClick={() =>
            navigator.share({
              url: document.URL,
              // title: "Score Sheet",
              text: "Join our score sheet!",
            })
          }
        >
          send_to_mobile
        </Icon>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
