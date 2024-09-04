import path from "path";
import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const __dirname = path.resolve();

app.use(express.json()); // for parsing application/json

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
