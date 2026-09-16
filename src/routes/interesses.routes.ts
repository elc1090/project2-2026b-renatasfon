import { Router } from "express";
import { criarInteresse, listarInteresses, listarInteressesDoDoador } from "../controllers/interesses.controller.js";


const router = Router();

router.post("/", criarInteresse);
router.get("/", listarInteresses);
router.get("/doador/:doadorId", listarInteressesDoDoador);

export default router;