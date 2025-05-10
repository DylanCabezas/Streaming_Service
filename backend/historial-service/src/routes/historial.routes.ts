import { Router } from "express";
import { Historial } from "../models/historial.model";

const router = Router();

// POST /historial
router.post("/", async (req, res) => {
  const { user_id, video_id } = req.body;

  let historial = await Historial.findOne({ user_id });
  if (!historial) {
    historial = new Historial({ user_id, videos: [] });
  }

  historial.videos.push({ video_id, watched_at: new Date() });
  await historial.save();
  res.status(201).json(historial);
});

// GET /historial?user_id=xyz
router.get("/", async (req, res) => {
  const { user_id } = req.query;
  const historial = await Historial.findOne({ user_id });
  res.json(historial?.videos || []);
});

// DELETE /historial?user_id=xyz
router.delete("/", async (req, res) => {
  const { user_id } = req.query;
  await Historial.deleteOne({ user_id });
  res.json({ message: "Historial eliminado" });
});

// PUT /historial/:video_id?user_id=xyz
router.put("/:video_id", async (req, res) => {
  const { user_id } = req.query;
  const { video_id } = req.params;

  await Historial.updateOne(
    { user_id },
    { $pull: { videos: { video_id } } }
  );

  res.json({ message: "Video eliminado del historial" });
});

export default router;
