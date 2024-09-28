import mongoose from "mongoose";

const meditationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: 30,
  },
  type: {
    type: String,
    enum: ["Vipassana", "Body scan", "Compasión", "Otro"],
    default: "Vipassana",
  },
  notes: {
    type: String,
    trim: true,
  },
});

export const MeditationModel = mongoose.model("Medition", meditationSchema);
