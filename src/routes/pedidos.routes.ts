import { Router } from "express";
import {
    listarPedidos,
    criarPedido, atenderPedido
} from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/", listarPedidos);
router.post("/", criarPedido);
router.patch("/:id/atender", atenderPedido);

export default router;