import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ScoreSheet/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ScoreSheet/ResultList";
import { categoryType } from "../types";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ScoreSheetSpeedDial from "../components/ScoreSheet/ScoreSheetSpeedDial";
import toast from "react-hot-toast";

export const Component: FC = () => {
  const [scoreData, setScoreData] = useState<categoryType>(
    useLoaderData() as categoryType
  );
  const { id } = useParams() as { id: string };

  useEffect(() => {
    try {
      const cardEventSource = new EventSource(
        `/api/score-card/${id}/subscribe/`
      );
      cardEventSource.onmessage = (event) =>
        setScoreData(JSON.parse(event.data));
      cardEventSource.onerror = (error) => {
        if (import.meta.env.DEV) {
          console.error("SSE error:", error);
        }
      };
      return () => cardEventSource.close();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error connecting to the server");
    }
  }, [id]);

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
