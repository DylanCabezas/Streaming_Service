import { Schema, model } from "mongoose";

const historialSchema = new Schema({
  user_id: { type: String, required: true },
  videos: [
    {
      video_id: { type: String, required: true },
      watched_at: { type: Date, default: Date.now },
    }
  ]
});

export const Historial = model("Historial", historialSchema);
