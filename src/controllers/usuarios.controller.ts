import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import prisma from "../prisma.js";

export async function listarUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await prisma.usuario.findMany();

        res.json(usuarios);
    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function criarUsuario(req: Request, res: Response) {
    const { nome, email, tipo } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({
            erro: "Nome e tipo são obrigatórios."
        });
    }

    if (tipo !== "ALUNO" && tipo !== "DOADOR") {
        return res.status(400).json({
            erro: "Tipo de usuário inválido. Use ALUNO ou DOADOR."
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

    try {
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email: email || null,
                tipo,
            },
        });

        res.status(201).json(usuario);
    } catch (erro) {
            if (
                erro instanceof Prisma.PrismaClientKnownRequestError &&
                erro.code === "P2002"
            ) {
                return res.status(409).json({
                    erro: "Este email já está cadastrado."
                });
            }

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
}

export async function listarPedidosDoAluno(
    req: Request,
    res: Response
) {
    const alunoId = Number(req.params.alunoId);

    if (!Number.isInteger(alunoId) || alunoId <= 0) {
        return res.status(400).json({
            erro: "ID do aluno inválido."
        });
    }

    try {
        const aluno = await prisma.usuario.findUnique({
            where: { id: alunoId }
        });

        if (!aluno) {
            return res.status(404).json({
                erro: "Aluno não encontrado."
            });
        }

        if (aluno.tipo !== "ALUNO") {
            return res.status(400).json({
                erro: "O usuário informado não é um aluno."
            });
        }

        const pedidos = await prisma.pedido.findMany({
            where: {
                alunoId: alunoId
            },
            include: {
                materiais: {
                    include: {
                        material: true
                    }
                }
            },
            orderBy: {
                criadoEm: "desc"
            }
        });

        return res.json(pedidos);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}