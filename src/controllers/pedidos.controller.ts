import type { Request, Response } from "express";
import prisma from "../prisma.js";

export async function listarPedidos(req: Request, res: Response) {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                materiais: {
                    include: {
                        material: true
                    }
                }
            }
        });

        res.json(pedidos);
    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function criarPedido(req: Request, res: Response) {
    const { titulo, descricao, alunoId, materiais } = req.body;

    if (!titulo || !descricao || !alunoId || !materiais) {
        return res.status(400).json({
            erro: "Título, descrição, aluno e materiais são obrigatórios."
        });
    }

    if (!Array.isArray(materiais) || materiais.length === 0) {
        return res.status(400).json({
            erro: "O pedido deve possuir pelo menos um material."
        });
    }

    try {
        const aluno = await prisma.usuario.findUnique({
            where: {
                id: alunoId
            }
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

        for (const item of materiais) {
            const possuiMaterialId = item.materialId !== undefined;
            const possuiOutro = item.materialOutro !== undefined;

            if (possuiMaterialId === possuiOutro) {
                return res.status(400).json({
                    erro: "Cada item deve possuir um materialId ou um materialOutro."
                });
            }

            if (possuiMaterialId) {
                const material = await prisma.material.findUnique({
                    where: {
                        id: item.materialId
                    }
                });

                if (!material || !material.ativo) {
                    return res.status(400).json({
                        erro: `Material com id ${item.materialId} não encontrado ou está inativo.`
                    });
                }
            }

            if (possuiOutro && !item.materialOutro.trim()) {
                return res.status(400).json({
                    erro: "O material informado em 'Outro' não pode estar vazio."
                });
            }
        }

        const pedido = await prisma.pedido.create({
            data: {
                titulo,
                descricao,
                alunoId,
                materiais: {
                    create: materiais.map((item: any) => ({
                        materialId: item.materialId ?? null,
                        materialOutro: item.materialOutro ?? null
                    }))
                }
            },
            include: {
                materiais: {
                    include: {
                        material: true
                    }
                }
            }
        });

        return res.status(201).json(pedido);
    } catch (erro) {
        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}