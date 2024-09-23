import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ResultList";
import { categoryType } from "../types";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ScoreSheet = () => {
  const [scoreData] = useState<categoryType>(useLoaderData() as categoryType);
  // fetch the score card data from the backend using the id
  // useEffect(() => {
  //   const getInitialData = async () => {
  //     const promiseForScoreCardData = fetch(`/api/score-card/${id}/`);
  //     toast.promise(promiseForScoreCardData, {
  //       loading: "Fetching Card",
  //       success: "Loaded!",
  //       error: "Error while loading the score card",
  //     });
  //     const response = await promiseForScoreCardData;
  //     const data = await response.json();
  //     setScoreData(data);
  //   };
  //   getInitialData();
  // }, [id]);

  const listScoreCategories = () => {
    return Object.entries(scoreData).map(([category, players]) => {
      return (
        <ListScoreCategory
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
    </Box>
  );
};

export default ScoreSheet;
