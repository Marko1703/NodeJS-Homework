import express from "express";
import { trainerRouter } from "./src/trainers.routes.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the trainers api</h1>");
});

app.use("/trainers", trainerRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up at port: ${PORT}`);
});