import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputList from "../components/InputList";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import GithubCorner from "react-github-corner";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
      preview: false,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

const GITHUB_REPO_URL = "https://github.com/brainomite/score-card-app";

export const Component: FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [scoreCardID, setScoreCardID] = useState<string | null>(null);

  if (scoreCardID) {
    return <Navigate to={`/sheet/${scoreCardID}/`} />;
  }

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!categories.length || !players.length) {
      toast.error("Please enter at least one category and one player");
      return;
    }
    // POST request to create a new score card sending an object with both categories and players
    try {
      const promiseForAResponse = fetch("/api/score-card", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories, players }),
      });
      toast.promise(promiseForAResponse, {
        loading: "Creating score card...",
        success: "Created!",
        error: "Error while creating score card",
      });
      const response = await promiseForAResponse;
      const { id } = await response.json();
      setScoreCardID(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //noop
    }
  };

  return (
    <DndProvider options={HTML5toTouch}>
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
          listItems={categories}
          setListItems={setCategories}
        />
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ margin: "10px" }}
        />
        <InputList
          name="Player"
          listItems={players}
          setListItems={setPlayers}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleClick}>
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
    </DndProvider>
  );
};
