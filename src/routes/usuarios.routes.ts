import { Router } from "express";
import {
    listarUsuarios,
    criarUsuario, listarPedidosDoAluno, buscarDoadorPorEmail, buscarAluno
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.get("/aluno/:alunoId/pedidos", listarPedidosDoAluno);
router.get("/doador", buscarDoadorPorEmail);
router.get("/aluno", buscarAluno);

export default router;