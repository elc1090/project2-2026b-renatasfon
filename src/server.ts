import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Doe Escola funcionando!"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});