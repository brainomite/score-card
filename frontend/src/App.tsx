const GITHUB_REPO_URL = "https://github.com/brainomite/score-card-app";

import { useEffect } from "react";
import "./App.css";
import { backendUrl } from "./utils/config.defaults";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import SetUpCard from "./pages/SetUpCard";
import GithubCorner from "react-github-corner";
import ScoreSheet from "./pages/ScoreSheet.1";

function App() {
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        await fetch(`${backendUrl}/api`);
      } catch (error: any) {
        toast.error(`Failed to connect to ${backendUrl}\n${error.message}`);
      }
    };
    fetchResponse();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/score-card-app/" element={<SetUpCard />} />
        <Route path="/score-card-app/sheet1/" element={<ScoreSheet />} />
      </Routes>
      <Toaster />
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
}

export default App;
