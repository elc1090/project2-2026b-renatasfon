import { Router } from "express";
import {
    listarPedidos,
    criarPedido
} from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/", listarPedidos);
router.post("/", criarPedido);

export default router;