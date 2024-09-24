import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ScoreSheet/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ScoreSheet/ResultList";
import { categoryType } from "../types";
import { FC, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ScoreSheetSpeedDial from "../components/ScoreSheet/ScoreSheetSpeedDial";

export const Component: FC = () => {
  const [scoreData, setScoreData] = useState<categoryType>(
    useLoaderData() as categoryType
  );
  const { id } = useParams() as { id: string };
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
      <ScoreSheetSpeedDial />
    </Box>
  );
};
