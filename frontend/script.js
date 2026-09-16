const botaoDoador = document.getElementById("botaoDoador");
const botaoAluno = document.getElementById("botaoAluno");

const telaInicial = document.getElementById("telaInicial");
const telaDoador = document.getElementById("telaDoador");
const telaPedidos = document.getElementById("telaPedidos");

const botaoVoltar = document.getElementById("botaoVoltar");
const formularioDoador = document.getElementById("formularioDoador");

const listaPedidos = document.getElementById("listaPedidos");

botaoDoador.addEventListener("click", function () {

    telaInicial.classList.add("tela-escondida");
    telaDoador.classList.remove("tela-escondida");

});


botaoVoltar.addEventListener("click", function () {

    telaDoador.classList.add("tela-escondida");
    telaInicial.classList.remove("tela-escondida");

});


botaoAluno.addEventListener("click", function () {

    alert("Área do aluno");

});


formularioDoador.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nomeDoador").value;
    const email = document.getElementById("emailDoador").value;

    try {

        const resposta = await fetch("http://localhost:3000/usuarios", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                email: email,
                tipo: "DOADOR"
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro);
            return;
        }

        console.log("Doador cadastrado:", dados);

        localStorage.setItem("doadorId", dados.id);

        telaDoador.classList.add("tela-escondida");
        telaPedidos.classList.remove("tela-escondida");

        carregarPedidos();

    } catch (erro) {

        console.error("Erro ao cadastrar doador:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
});

async function carregarPedidos() {

    try {

        const resposta = await fetch("http://localhost:3000/pedidos");

        const pedidos = await resposta.json();

        if (!resposta.ok) {
            alert("Não foi possível carregar os pedidos.");
            return;
        }

        listaPedidos.innerHTML = "";

        const pedidosDisponiveis = pedidos.filter(function (pedido) {
            return pedido.status === "DISPONIVEL";
        });

        pedidosDisponiveis.forEach(function (pedido) {

            const card = document.createElement("div");

            card.innerHTML = `
                <h2>${pedido.titulo}</h2>

                <p>${pedido.descricao}</p>

                <p>
                    <strong>Estudante:</strong>
                    ${pedido.aluno.nome}
                </p>
            `;

            listaPedidos.appendChild(card);
        });

    } catch (erro) {

        console.error("Erro ao carregar pedidos:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
}