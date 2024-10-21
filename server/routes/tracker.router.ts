import { Router } from "express";
import {
  createTracker,
  deleteTracker,
  getAllTrackers,
  updateTracker,
} from "../controllers/trackerControllers";

export const trackerRouter = Router();

trackerRouter.get("/", getAllTrackers);
trackerRouter.post("/", createTracker);
trackerRouter.put("/:id", updateTracker);
trackerRouter.delete("/:id", deleteTracker);
