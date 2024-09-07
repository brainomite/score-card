import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListScoreCategory from "../components/ListScoreCategory";

const DUMMY_DATA = [
  {
    pointName: "dragon points",
    points: [
      { name: "Aaron", score: 1 },
      { name: "Jason", score: 0 },
      { name: "Jenny", score: 15 },
      { name: "Katie", score: 9 },
    ],
  },
  {
    pointName: "Egg points",
    points: [
      { name: "Aaron", score: 6 },
      { name: "Jason", score: 7 },
      { name: "Jenny", score: 1 },
      { name: "Katie", score: 3 },
    ],
  },
];

const ScoreSheet = () => {
  const listScoreCategories = () =>
    DUMMY_DATA.map(({ pointName, points }) => {
      return (
        <ListScoreCategory
          key={pointName}
          pointName={pointName}
          points={points}
        />
      );
    });
  return (
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
  );
};

export default ScoreSheet;
