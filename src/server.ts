import express from "express";
import prisma from "./prisma.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import materiaisRoutes from "./routes/materiais.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Doe Escola funcionando!"
    });
});

app.use("/usuarios", usuariosRoutes);
app.use("/materiais", materiaisRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});