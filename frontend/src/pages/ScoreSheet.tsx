import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ListScoreCategory";
import Box from "@mui/material/Box";
import ResultList from "../components/ResultList";
import { sheetDataType } from "../types";

const DUMMY_DATA = [
  {
    category: "dragons",
    players: [
      { name: "Aaron", points: 1 },
      { name: "Jason", points: 0 },
      { name: "Jenny", points: 15 },
      { name: "Katie", points: 9 },
    ],
  },
  {
    category: "Eggs",
    players: [
      { name: "Aaron", points: 6 },
      { name: "Jason", points: 7 },
      { name: "Jenny", points: 1 },
      { name: "Katie", points: 3 },
    ],
  },
] as sheetDataType[];

const ScoreSheet = () => {
  const listScoreCategories = () =>
    DUMMY_DATA.map(({ category, players }) => {
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
      <ResultList scoreData={DUMMY_DATA} />
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
