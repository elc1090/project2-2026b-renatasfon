import { Router } from "express";
import { listarMateriais } from "../controllers/materiais.controller.js";

const router = Router();

router.get("/", listarMateriais);

export default router;