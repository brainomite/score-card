import "./App.css";
import { Route, Routes } from "react-router-dom";
import SetUpCard from "./pages/SetUpCard";
import ScoreSheet from "./pages/ScoreSheet";
import { Toaster } from "react-hot-toast";

function App() {
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
