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
    const { nome, matricula, email, tipo } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({
            erro: "Nome e tipo são obrigatórios."
        });
    }

    if (tipo === "ALUNO" && !matricula) {
        return res.status(400).json({
            erro: "Aluno deve possuir matrícula."
        });
    }

    if (tipo === "DOADOR" && matricula) {
        return res.status(400).json({
            erro: "Doador não deve possuir matrícula."
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
                matricula: matricula || null,
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

export async function buscarAluno(
    req: Request,
    res: Response
) {
    const matricula = req.query.matricula;
    const nome = req.query.nome;

    if (
        typeof matricula !== "string" ||
        !matricula.trim() ||
        typeof nome !== "string" ||
        !nome.trim()
    ) {
        return res.status(400).json({
            erro: "Matrícula e nome são obrigatórios."
        });
    }

    try {

        const aluno = await prisma.usuario.findFirst({
            where: {
                matricula: matricula.trim(),
                nome: nome.trim(),
                tipo: "ALUNO"
            }
        });

        if (!aluno) {
            return res.status(404).json({
                erro: "Aluno não encontrado. Verifique a matrícula e o nome."
            });
        }

        return res.json({
            id: aluno.id,
            nome: aluno.nome,
            matricula: aluno.matricula,
            tipo: aluno.tipo
        });

    } catch (erro) {

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function buscarDoadorPorEmail(
    req: Request,
    res: Response
) {
    const email = req.query.email;

    if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            erro: "Email é obrigatório."
        });
    }

    try {
        const doador = await prisma.usuario.findUnique({
            where: {
                email: email.trim()
            }
        });

        if (!doador) {
            return res.status(404).json({
                erro: "Doador não encontrado."
            });
        }

        if (doador.tipo !== "DOADOR") {
            return res.status(400).json({
                erro: "O email informado não pertence a um doador."
            });
        }

        return res.json({
            id: doador.id,
            nome: doador.nome,
            email: doador.email,
            tipo: doador.tipo
        });

    } catch (erro) {

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

export async function deletarUsuario(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID do usuário inválido."
        });
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        await prisma.$transaction(async (tx) => {

            // Remove os interesses em que o usuário é doador
            await tx.interesse.deleteMany({
                where: {
                    doadorId: id
                }
            });

            // Busca os pedidos do aluno
            const pedidos = await tx.pedido.findMany({
                where: {
                    alunoId: id
                },
                select: {
                    id: true
                }
            });

            const pedidosIds = pedidos.map((pedido) => pedido.id);

            // Remove os interesses relacionados aos pedidos
            if (pedidosIds.length > 0) {
                await tx.interesse.deleteMany({
                    where: {
                        pedidoId: {
                            in: pedidosIds
                        }
                    }
                });

                // Remove os materiais relacionados aos pedidos
                await tx.pedidoMaterial.deleteMany({
                    where: {
                        pedidoId: {
                            in: pedidosIds
                        }
                    }
                });

                // Remove os pedidos do aluno
                await tx.pedido.deleteMany({
                    where: {
                        alunoId: id
                    }
                });
            }

            // Finalmente remove o usuário
            await tx.usuario.delete({
                where: {
                    id
                }
            });
        });

        return res.json({
            mensagem: "Usuário excluído com sucesso."
        });

    } catch (erro) {
        console.error("Erro ao deletar usuário:", erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}