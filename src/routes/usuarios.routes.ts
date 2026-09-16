import { Router } from "express";
import {
    listarUsuarios,
    criarUsuario, listarPedidosDoAluno
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.get("/aluno/:alunoId/pedidos", listarPedidosDoAluno);

export default router;