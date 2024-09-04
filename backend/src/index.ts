import path from "path";
import express from "express";
import cors from "cors";
const app = express();

app.use(express.json()); // for parsing application/json
if (!process.env.FRONTEND_URL) {
  app.use(cors());
} else {
  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
}

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const __dirname = path.resolve();

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
