import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ResultList";
import { categoryType } from "../types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface ScoreSheetProps {
  params: {
    id: string;
  };
}

const ScoreSheet = () => {
  const { id } = useParams() as { id: string };
  // console.log("🚀 ~ ScoreSheet ~ params:", params);
  const [scoreData, setScoreData] = useState<categoryType | null>(null);
  // fetch the score card data from the backend using the id
  useEffect(() => {
    const getInitialData = async () => {
      const promiseForScoreCardData = fetch(`/api/score-card/${id}/`);
      toast.promise(promiseForScoreCardData, {
        loading: "Fetching Card",
        success: "Loaded!",
        error: "Error while loading the score card",
      });
      const response = await promiseForScoreCardData;
      const data = await response.json();
      setScoreData(data);
    };
    getInitialData();
  }, [id]);

  const listScoreCategories = () => {
    return scoreData
      ? Object.entries(scoreData).map(([category, players]) => {
          return (
            <ListScoreCategory
              key={category}
              category={category}
              players={players}
            />
          );
        })
      : null;
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
            Score Items
          </ListSubheader>
        }
      >
        {listScoreCategories()}
      </List>
    </Box>
  );
};

export default ScoreSheet;
