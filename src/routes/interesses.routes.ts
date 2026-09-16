import { Router } from "express";
import { criarInteresse, listarInteresses } from "../controllers/interesses.controller.js";


const router = Router();

router.post("/", criarInteresse);
router.get("/", listarInteresses);

export default router;