import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputList from "../components/InputList";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import GithubCorner from "react-github-corner";
import { Button } from "@mui/material";

const GITHUB_REPO_URL = "https://github.com/brainomite/score-card-app";

const SetUpCard = () => {
  const [toSheet, setToSheet] = useState(false);
  const [scoreItems, setScoreItems] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);

  if (toSheet) {
    return <Navigate to="/sheet1" />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1,
          },
        }}
      >
        <InputList
          name="Category"
          listItems={scoreItems}
          setListItems={setScoreItems}
        />
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ margin: "10px" }}
        />
        <InputList name="Player" listItems={names} setListItems={setNames} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setToSheet(true)}
      >
        Submit
      </Button>
      <GithubCorner
        href={GITHUB_REPO_URL}
        bannerColor="#70B7FD"
        octoColor="#fff"
        size={80}
        direction="right"
        target="_blank"
      />
    </>
  );
};

export default SetUpCard;
