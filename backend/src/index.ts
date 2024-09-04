import express from "express";
import cors from "cors";
const app = express();

app.use(express.json()); // for parsing application/json
if (!process.env.FRONTEND_URL) {
  app.use(cors());
} else {
  const corsOptions = {
    origin: process.env.FRONTEND_URL,
  };
  app.use(cors(corsOptions));
  console.log(`CORS is enabled only for ${process.env.FRONTEND_URL}`);
}

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
