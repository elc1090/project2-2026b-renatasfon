import { Router } from "express";
import {
    listarUsuarios,
    criarUsuario, listarPedidosDoAluno, buscarDoadorPorEmail, buscarAluno, deletarUsuario
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.get("/aluno/:alunoId/pedidos", listarPedidosDoAluno);
router.get("/doador", buscarDoadorPorEmail);
router.get("/aluno", buscarAluno);
router.delete("/:id", deletarUsuario);

export default router;