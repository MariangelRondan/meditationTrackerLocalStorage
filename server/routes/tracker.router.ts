import { Router } from "express";
import {
  createTracker,
  getAllTrackers,
} from "../controllers/trackerControllers";

export const trackerRouter = Router();

trackerRouter.get("/", getAllTrackers);
trackerRouter.post("/", createTracker);
