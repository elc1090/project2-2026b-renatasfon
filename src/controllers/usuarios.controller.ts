import type { Request, Response } from "express";
import prisma from "../prisma.js";

export async function listarUsuarios(req: Request, res: Response) {
    const usuarios = await prisma.usuario.findMany();

    res.json(usuarios);
}

export async function criarUsuario(req: Request, res: Response) {
    const { nome, email, tipo } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({
            erro: "Nome e tipo são obrigatórios."
        });
    }

    // se aluno não possui email
    if (tipo === "ALUNO" && email) {
        return res.status(400).json({
            erro: "Aluno não deve possuir email."
        });
    }

    // se doador precisa possuir email
    if (tipo === "DOADOR" && !email) {
        return res.status(400).json({
            erro: "Doador deve possuir email."
        });
    }

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            tipo,
        },
    });

    res.status(201).json(usuario);
}