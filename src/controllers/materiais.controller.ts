import type { Request, Response } from "express";
import prisma from "../prisma.js";

export async function listarMateriais(req: Request, res: Response) {
    try {
        const materiais = await prisma.material.findMany({
            where: {
                ativo: true
            },
            orderBy: {
                nome: "asc"
            }
        });

        res.json(materiais);
    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}