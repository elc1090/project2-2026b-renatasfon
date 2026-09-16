import express from "express";
import cors from "cors";
import path from "path";

import prisma from "./prisma.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import materiaisRoutes from "./routes/materiais.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import interessesRoutes from "./routes/interesses.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(process.cwd(), "frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "frontend", "index.html"));
});

app.use("/usuarios", usuariosRoutes);
app.use("/materiais", materiaisRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/interesses", interessesRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});