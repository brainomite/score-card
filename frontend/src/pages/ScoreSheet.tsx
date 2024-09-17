import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ResultList";
import { categoryType } from "../types";

const DUMMY_DATA = {
  dragons: {
    Aaron: 1,
    Jason: 0,
    Jenny: 15,
    Katie: 9,
  },
  Eggs: {
    Aaron: 6,
    Jason: 7,
    Jenny: 1,
    Katie: 3,
  },
} as categoryType;

const ScoreSheet = () => {
  const listScoreCategories = () =>
    Object.entries(DUMMY_DATA).map(([category, players]) => {
      return (
        <ListScoreCategory
          key={category}
          category={category}
          players={players}
        />
      );
    });
  return (
    <Box>
      {/* <ResultList scoreData={DUMMY_DATA} /> */}
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
