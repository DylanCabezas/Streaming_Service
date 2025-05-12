import express, { Request, Response } from "express";
import axios from "axios";
import { Historial, IHistorial } from "../models/historial.model";

const router = express.Router();

// URLs de tus microservicios (ajusta puertos o nombres de servicio de Docker)
const USER_SERVICE_URL = "http://localhost:4000/users";
const CONTENT_SERVICE_URL = "http://localhost:5000/videos";

/**
 * Helper para validar que un usuario exista.
 */
async function validateUser(userId: string): Promise<boolean> {
  try {
    const { data } = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    return !!data;
  } catch {
    return false;
  }
}

/**
 * Helper para validar que un video exista.
 */
async function validateVideo(videoId: string): Promise<boolean> {
  try {
    const { data } = await axios.get(`${CONTENT_SERVICE_URL}/${videoId}`);
    return !!data;
  } catch {
    return false;
  }
}

// POST /historial
router.post("/", async (req: Request, res: Response) => {
  const { user_id, video_id } = req.body as { user_id: string; video_id: string };

  // 1) Validar existencia
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  if (!(await validateVideo(video_id))) {
    return res.status(404).json({ error: "Video no encontrado" });
  }

  // 2) Insertar en historial
  let historial = await Historial.findOne({ user_id });
  if (!historial) {
    historial = new Historial({ user_id, videos: [] });
  }
  historial.videos.push({ video_id, watched_at: new Date() });
  await historial.save();

  res.status(201).json(historial);
});

// GET /historial?user_id=xyz
router.get("/", async (req: Request, res: Response) => {
  const user_id = String(req.query.user_id || "");

  // Validar usuario antes de devolver historial
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const historial = await Historial.findOne({ user_id });
  res.json(historial?.videos || []);
});

// DELETE /historial?user_id=xyz
router.delete("/", async (req: Request, res: Response) => {
  const user_id = String(req.query.user_id || "");

  // Validar usuario
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  await Historial.deleteOne({ user_id });
  res.json({ message: "Historial eliminado" });
});

// PUT /historial/:video_id?user_id=xyz
router.put("/:video_id", async (req: Request, res: Response) => {
  const user_id = String(req.query.user_id || "");
  const video_id = req.params.video_id;

  // Validar usuario y video
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  if (!(await validateVideo(video_id))) {
    return res.status(404).json({ error: "Video no encontrado" });
  }

  // Eliminar la entrada del video en el historial
  await Historial.updateOne(
    { user_id },
    { $pull: { videos: { video_id } } }
  );

  res.json({ message: "Video eliminado del historial" });
});

export default router;
