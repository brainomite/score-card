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
        {/* <Route path="/sheet1/" element={<ScoreSheet />} /> */}
        {/* // create a route to "sheet/:id" that renders the ScoreSheet component */}
        <Route path="/sheet/:id/" element={<ScoreSheet />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
