import prisma from "../src/prisma.js";

const materiais = [
    "Caderno",
    "Estojo",
    "Lápis",
    "Régua",
    "Mochila",
    "Uniforme",
];

async function main() {
    for (const nome of materiais) {
        await prisma.material.create({
            data: {
                nome
            }
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (erro) => {
        console.error(erro);
        await prisma.$disconnect();
        process.exit(1);
    });