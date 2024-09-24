import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ResultList";
import { categoryType } from "../types";
import { FC, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Icon from "@mui/material/Icon";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export const Component: FC = () => {
  const [scoreData, setScoreData] = useState<categoryType>(
    useLoaderData() as categoryType
  );
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const handleOpen = () => setSpeedDialOpen(true);
  const handleClose = () => setSpeedDialOpen(false);
  const { id } = useParams() as { id: string };
  const speedDialActions = [
    { icon: <Icon>share</Icon>, name: "Share", action: handleClose },
    { icon: <Icon>note_add</Icon>, name: "New", action: handleClose },
    { icon: <Icon>lock_reset</Icon>, name: "Reset", action: handleClose },
  ];
  const updateScoreForCategory =
    (category: string) => (player: string) => async (score: number) => {
      const res = await fetch(`/api/score-card/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          player,
          score,
        }),
      });
      const updatedCard = (await res.json()) as categoryType;
      setScoreData(updatedCard);
    };

  const listScoreCategories = () => {
    return Object.entries(scoreData).map(([category, players]) => {
      return (
        <ListScoreCategory
          updateScoreFor={updateScoreForCategory(category)}
          key={category}
          category={category}
          players={players}
        />
      );
    });
  };
  return (
    <Box>
      <ResultList scoreData={scoreData} />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Score Categories
          </ListSubheader>
        }
      >
        {listScoreCategories()}
      </List>
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
    </Box>
  );
};
