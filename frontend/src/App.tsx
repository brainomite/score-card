import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/SetUpCard"),
  },
  {
    path: "/sheet/:id/",
    lazy: () => import("./pages/ScoreSheet"),
    loader: async ({ params }) => {
      const res = await fetch(`/api/score-card/${params.id}/`);
      if (res.status === 404) {
        throw new Response("Not Found", { status: 404 });
      }
      return res;
    },
    errorElement: <h1>Card Expired</h1>,
  },
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
