import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./socket/socket.js";

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use("/api", routes);
if (process.env.NODE_ENV !== "development") {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory
  const frontendDistPath = path.join(__dirname, "../../../frontend/dist/");
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

const { PORT = 80 } = process.env;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
