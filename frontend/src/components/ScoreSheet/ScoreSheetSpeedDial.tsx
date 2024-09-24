import Icon from "@mui/material/Icon";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";

const ScoreSheetSpeedDial: FC = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [navigateToSetupCard, setNavigateToSetupCard] = useState(false);
  const handleOpen = () => setSpeedDialOpen(true);
  const handleClose = () => setSpeedDialOpen(false);
  const speedDialActions = [
    { icon: <Icon>share</Icon>, name: "Share", action: handleClose },
    {
      icon: <Icon>note_add</Icon>,
      name: "New",
      action: () => setNavigateToSetupCard(true),
    },
    { icon: <Icon>lock_reset</Icon>, name: "Reset", action: handleClose },
  ];

  if (navigateToSetupCard) return <Navigate to="/" />;

  return (
    <SpeedDial
      ariaLabel={"Speed Dial"}
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<Icon>add</Icon>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={speedDialOpen}
    >
      {speedDialActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
          tooltipOpen
        />
      ))}
    </SpeedDial>
  );
};

export default ScoreSheetSpeedDial;