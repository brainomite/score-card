import path from "path";
import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const __dirname = path.resolve();

app.use(express.json()); // for parsing application/json

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
