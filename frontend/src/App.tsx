import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SetUpCard from "./pages/SetUpCard";
import ScoreSheet from "./pages/ScoreSheet";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SetUpCard />,
  },
  { path: "/sheet/:id/", element: <ScoreSheet /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
