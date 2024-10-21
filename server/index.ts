import express from "express";
import { trackerRouter } from "./routes/tracker.router";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 500;

const app = express();
app.use(express.json());

app.use(cors());

//DATABASE CONNECTION
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "";
const DATABASE_NAME = process.env.DATABASE_NAME;

mongoose
  .connect(MONGO_URL, {
    dbName: DATABASE_NAME,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

app.use("/tracker", trackerRouter);

app.listen(3000, () => {
  console.log(`Server running on PORT ${PORT}`);
});
