import { useEffect } from "react";
import "./App.css";
import { backendUrl } from "./utils/config.defaults";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import SetUpCard from "./pages/SetUpCard";
import ScoreSheet from "./pages/ScoreSheet";

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
        <Route path="/" element={<SetUpCard />} />
        <Route path="/sheet1/" element={<ScoreSheet />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
