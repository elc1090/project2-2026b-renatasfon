import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import prisma from "../prisma.js";

export async function criarInteresse(req: Request, res: Response) {
    const { pedidoId, doadorId } = req.body;

    if (!pedidoId || !doadorId) {
        return res.status(400).json({
            erro: "Pedido e doador são obrigatórios."
        });
    }

    try {
        const pedido = await prisma.pedido.findUnique({
            where: {
                id: pedidoId
            }
        });

        if (!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        if (pedido.status !== "DISPONIVEL") {
            return res.status(400).json({
                erro: "Este pedido não está disponível para novos interesses."
            });
        }

        const doador = await prisma.usuario.findUnique({
            where: {
                id: doadorId
            }
        });

        if (!doador) {
            return res.status(404).json({
                erro: "Doador não encontrado."
            });
        }

        if (doador.tipo !== "DOADOR") {
            return res.status(400).json({
                erro: "O usuário informado não é um doador."
            });
        }

        const resultado = await prisma.$transaction(async (tx) => {
            const interesse = await tx.interesse.create({
                data: {
                    pedidoId,
                    doadorId
                }
            });

            await tx.pedido.update({
                where: {
                    id: pedidoId
                },
                data: {
                    status: "EM_ANDAMENTO"
                }
            });

            return interesse;
       });

       return res.status(201).json(resultado);

    } catch (erro) {
        if (
            erro instanceof Prisma.PrismaClientKnownRequestError &&
            erro.code === "P2002"
        ) {
            return res.status(409).json({
                erro: "Este doador já demonstrou interesse neste pedido."
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function listarInteresses(req: Request, res: Response) {
    try {
        const interesses = await prisma.interesse.findMany({
            select: {
                id: true,
                criadoEm: true,

                pedido: {
                    select: {
                        id: true,
                        titulo: true,

                        aluno: {
                            select: {
                                nome: true
                            }
                        }
                    }
                },

                doador: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        res.json(interesses);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function listarInteressesDoDoador(
    req: Request,
    res: Response
) {
    const doadorId = Number(req.params.doadorId);

    if (!doadorId) {
        return res.status(400).json({
            erro: "ID do doador inválido."
        });
    }

    try {
        const doador = await prisma.usuario.findUnique({
            where: {
                id: doadorId
            }
        });

        if (!doador) {
            return res.status(404).json({
                erro: "Doador não encontrado."
            });
        }

        if (doador.tipo !== "DOADOR") {
            return res.status(400).json({
                erro: "O usuário informado não é um doador."
            });
        }

        const interesses = await prisma.interesse.findMany({
            where: {
                doadorId
            },
            select: {
                id: true,
                criadoEm: true,

                pedido: {
                    select: {
                        id: true,
                        titulo: true,
                        descricao: true,
                        status: true,

                        aluno: {
                            select: {
                                nome: true
                            }
                        },

                        materiais: {
                            include: {
                                material: true
                            }
                        }
                    }
                }
            }
        });

        return res.json(interesses);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}