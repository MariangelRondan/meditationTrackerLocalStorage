import { Request, Response } from "express";
import { MeditationModel } from "../database/models/trackerModel";

//GET ALL TRACK
export const getAllTrackers = async (req: Request, res: Response) => {
  try {
    const tracking = await MeditationModel.find();
    res.status(200).json(tracking);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

//CREATE A NEW RECORD
export const createTracker = async (req: Request, res: Response) => {
  try {
    const meditationData = req.body;
    const newMeditation = await MeditationModel.create(meditationData);
    res.status(201).json({ success: true, data: newMeditation });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

//UPDATE
export const updateTracker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meditationData = req.body;
    const meditation = await MeditationModel.findById(id);
    await meditation?.updateOne(meditationData);
    res.status(201).json({ success: true, data: meditation });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

//DELETE
export const deleteTracker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await MeditationModel.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Meditation deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
