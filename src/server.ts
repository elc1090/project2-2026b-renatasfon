import express from "express";
import cors from "cors";

import prisma from "./prisma.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import materiaisRoutes from "./routes/materiais.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import interessesRoutes from "./routes/interesses.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Doe Escola funcionando!"
    });
});

app.use("/usuarios", usuariosRoutes);
app.use("/materiais", materiaisRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/interesses", interessesRoutes);


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});