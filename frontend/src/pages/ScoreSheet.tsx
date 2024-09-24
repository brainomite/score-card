import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ScoreSheet/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ScoreSheet/ResultList";
import { categoryType } from "../types";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ScoreSheetSpeedDial from "../components/ScoreSheet/ScoreSheetSpeedDial";
import { socket } from "../utils/socket";
import toast from "react-hot-toast";
export const SCORE_SHEET_DATA = "scoreSheetData";
export const UPDATE_SCORESHEET = "updateScoreSheet";
export const JOIN_SCORESHEET = "joinScoreSheet";

export const Component: FC = () => {
  const [scoreData, setScoreData] = useState<categoryType>(
    useLoaderData() as categoryType
  );
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const onConnect = () => socket.emit(JOIN_SCORESHEET, id);
    const onDisconnect = () =>
      toast.error("Unknown error, disconnected from server");
    const onScoreSheetDataEvent = (updatedScoreCard: categoryType) =>
      setScoreData(updatedScoreCard);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(SCORE_SHEET_DATA, onScoreSheetDataEvent);
    socket.connect();
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(SCORE_SHEET_DATA, onScoreSheetDataEvent);
      socket.close();
    };
  }, [id]);

  const updateScoreForCategory =
    (category: string) => (player: string) => async (score: number) => {
      const payload = { id, category, player, score };
      await socket.emitWithAck(UPDATE_SCORESHEET, payload);
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
