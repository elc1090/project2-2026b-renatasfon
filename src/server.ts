import express from "express";
import prisma from "./prisma.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Doe Escola funcionando!"
    });
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuario.findMany();

    res.json(usuarios);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});