import express from "express";
import connectDb from "./db.js";
import mainRouter from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
  connectDb();
  console.log("server is running at http://localhost:3000");
});
