const botaoDoador = document.getElementById("botaoDoador");
const botaoAluno = document.getElementById("botaoAluno");
const botaoJaSouDoador = document.getElementById("botaoJaSouDoador");
const telaInteresses = document.getElementById("telaInteresses");

const telaInicial = document.getElementById("telaInicial");
const telaAluno = document.getElementById("telaAluno");
const telaAcessoDoador = document.getElementById("telaAcessoDoador");
const telaDoador = document.getElementById("telaDoador");
const telaPedidos = document.getElementById("telaPedidos");

const formularioAcessoDoador =
    document.getElementById("formularioAcessoDoador");

const botaoMeusInteresses =
    document.getElementById("botaoMeusInteresses");

const botaoVoltarPedidos =
    document.getElementById("botaoVoltarPedidos");

const formularioAluno =
    document.getElementById("formularioAluno");

const botaoVoltarAluno =
    document.getElementById("botaoVoltarAluno");

const telaCriarPedido =
    document.getElementById("telaCriarPedido");

const formularioPedido =
    document.getElementById("formularioPedido");

const listaMateriais =
    document.getElementById("listaMateriais");

const botaoVoltarCriarPedido =
    document.getElementById("botaoVoltarCriarPedido");

const telaMeusPedidos =
    document.getElementById("telaMeusPedidos");

const botaoMeusPedidos =
    document.getElementById("botaoMeusPedidos");

const botaoVoltarMeusPedidos =
    document.getElementById("botaoVoltarMeusPedidos");

const botaoVoltarAcesso = document.getElementById("botaoVoltarAcesso");
const botaoVoltar = document.getElementById("botaoVoltar");
const formularioDoador = document.getElementById("formularioDoador");

const listaPedidos = document.getElementById("listaPedidos");
const listaInteresses = document.getElementById("listaInteresses");

const telaEscolhaAluno =
    document.getElementById("telaEscolhaAluno");

const telaAcessoAluno =
    document.getElementById("telaAcessoAluno");

const botaoAlunoCadastrado =
    document.getElementById("botaoAlunoCadastrado");

const botaoPrimeiroCadastro =
    document.getElementById("botaoPrimeiroCadastro");

const botaoVoltarEscolhaAluno =
    document.getElementById("botaoVoltarEscolhaAluno");

const formularioAcessoAluno =
    document.getElementById("formularioAcessoAluno");

const botaoVoltarAcessoAluno =
    document.getElementById("botaoVoltarAcessoAluno");

botaoDoador.addEventListener("click", function () {

    telaInicial.classList.add("tela-escondida");
    telaDoador.classList.remove("tela-escondida");

});

botaoJaSouDoador.addEventListener("click", function () {

    telaInicial.classList.add("tela-escondida");
    telaAcessoDoador.classList.remove("tela-escondida");

});

botaoVoltar.addEventListener("click", function () {

    telaDoador.classList.add("tela-escondida");
    telaInicial.classList.remove("tela-escondida");

});

botaoVoltarAcesso.addEventListener("click", function () {

    telaAcessoDoador.classList.add("tela-escondida");
    telaInicial.classList.remove("tela-escondida");

});

botaoAluno.addEventListener("click", function () {

    telaInicial.classList.add("tela-escondida");
    telaEscolhaAluno.classList.remove("tela-escondida");

});

botaoPrimeiroCadastro.addEventListener("click", function () {

    telaEscolhaAluno.classList.add("tela-escondida");
    telaAluno.classList.remove("tela-escondida");

});

botaoAlunoCadastrado.addEventListener("click", function () {

    telaEscolhaAluno.classList.add("tela-escondida");
    telaAcessoAluno.classList.remove("tela-escondida");

});

botaoVoltarEscolhaAluno.addEventListener("click", function () {

    telaEscolhaAluno.classList.add("tela-escondida");
    telaInicial.classList.remove("tela-escondida");

});

botaoVoltarAcessoAluno.addEventListener("click", function () {

    telaAcessoAluno.classList.add("tela-escondida");
    telaEscolhaAluno.classList.remove("tela-escondida");

});

formularioAcessoDoador.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const email = document.getElementById("emailAcessoDoador").value;

    try {

        const resposta = await fetch(
            `http://localhost:3000/usuarios/doador?email=${encodeURIComponent(email)}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro);
            return;
        }

        console.log("Doador encontrado:", dados);

        localStorage.setItem("doadorId", dados.id);

        telaAcessoDoador.classList.add("tela-escondida");
        telaPedidos.classList.remove("tela-escondida");

        carregarPedidos();

    } catch (erro) {

        console.error("Erro ao buscar doador:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
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

formularioAluno.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nomeAluno").value;
    const matricula =
        document.getElementById("matriculaAluno").value;

    try {

        const resposta = await fetch(
            "http://localhost:3000/usuarios",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: nome,
                    matricula: matricula,
                    tipo: "ALUNO"
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro);
            return;
        }

        console.log("Aluno cadastrado:", dados);

        localStorage.setItem("alunoId", dados.id);

        alert("Cadastro realizado com sucesso!");

        telaAluno.classList.add("tela-escondida");
        telaCriarPedido.classList.remove("tela-escondida");

        carregarMateriais();

    } catch (erro) {

        console.error("Erro ao cadastrar aluno:", erro);

        alert("Não foi possível conectar com o servidor.");
    }

});

formularioAcessoAluno.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const nome =
        document.getElementById("nomeAcessoAluno").value;

    const matricula =
        document.getElementById("matriculaAcessoAluno").value;

    try {

        const resposta = await fetch(
            `http://localhost:3000/usuarios/aluno?matricula=${encodeURIComponent(matricula)}&nome=${encodeURIComponent(nome)}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.erro);

            return;
        }

        console.log("Aluno encontrado:", dados);

        localStorage.setItem("alunoId", dados.id);

        alert("Acesso realizado com sucesso!");

        telaAcessoAluno.classList.add("tela-escondida");
        telaCriarPedido.classList.remove("tela-escondida");

        carregarMateriais();

    } catch (erro) {

        console.error("Erro ao buscar aluno:", erro);

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

            let materiaisHTML = "";

            pedido.materiais.forEach(function (item) {

                if (item.material) {
                    materiaisHTML += `<li>${item.material.nome}</li>`;
                } else if (item.materialOutro) {
                    materiaisHTML += `<li>${item.materialOutro}</li>`;
                }

            });

            card.innerHTML = `
                <h2>${pedido.titulo}</h2>

                <p>
                    ${pedido.descricao}
                </p>

                <p>
                    <strong>Estudante:</strong>
                    ${pedido.aluno.nome}
                </p>

                <p>
                    <strong>Materiais necessários:</strong>
                </p>

                <ul>
                    ${materiaisHTML}
                </ul>

                <button class="botaoInteresse" data-pedido-id="${pedido.id}">>
                    Tenho interesse
                </button>
            `;

            listaPedidos.appendChild(card);
        });

    } catch (erro) {

        console.error("Erro ao carregar pedidos:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
}

async function demonstrarInteresse(pedidoId) {

    const doadorId = localStorage.getItem("doadorId");

    if (!doadorId) {
        alert("Doador não identificado.");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/interesses", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                pedidoId: Number(pedidoId),
                doadorId: Number(doadorId)
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro);
            return;
        }

        alert("Obrigado! A escola entrará em contato com você pelo e-mail informado.");

        carregarPedidos();

    } catch (erro) {

        console.error("Erro ao demonstrar interesse:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
}

async function carregarInteresses() {

    const doadorId = localStorage.getItem("doadorId");

    if (!doadorId) {
        alert("Doador não identificado.");
        return;
    }

    try {

        const resposta = await fetch(
            `http://localhost:3000/interesses/doador/${doadorId}`
        );

        const interesses = await resposta.json();

        if (!resposta.ok) {
            alert(interesses.erro);
            return;
        }

        listaInteresses.innerHTML = "";

        if (interesses.length === 0) {

            listaInteresses.innerHTML = `
                <p>
                    Você ainda não demonstrou interesse em nenhum pedido.
                </p>
            `;

            return;
        }

        interesses.forEach(function (interesse) {

            const pedido = interesse.pedido;

            const card = document.createElement("div");

            let materiaisHTML = "";

            pedido.materiais.forEach(function (item) {

                if (item.material) {

                    materiaisHTML += `
                        <li>${item.material.nome}</li>
                    `;

                } else if (item.materialOutro) {

                    materiaisHTML += `
                        <li>${item.materialOutro}</li>
                    `;
                }

            });

            card.innerHTML = `
                <h2>${pedido.titulo}</h2>

                <p>
                    ${pedido.descricao}
                </p>

                <p>
                    <strong>Estudante:</strong>
                    ${pedido.aluno.nome}
                </p>

                <p>
                    <strong>Materiais necessários:</strong>
                </p>

                <ul>
                    ${materiaisHTML}
                </ul>

                <p>
                    <strong>Status:</strong>
                    ${pedido.status}
                </p>
            `;

            listaInteresses.appendChild(card);

        });

    } catch (erro) {

        console.error("Erro ao carregar interesses:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
}

async function carregarMateriais() {

    try {

        const resposta = await fetch(
            "http://localhost:3000/materiais"
        );

        const materiais = await resposta.json();

        if (!resposta.ok) {
            alert("Não foi possível carregar os materiais.");
            return;
        }

        listaMateriais.innerHTML = "";

        materiais.forEach(function (material) {

            const item = document.createElement("label");

            item.classList.add("material-item");

            item.innerHTML = `
                <input
                    type="checkbox"
                    value="${material.id}"
                >

                ${material.nome}
            `;

            listaMateriais.appendChild(item);

        });



        const itemOutro = document.createElement("label");

        itemOutro.classList.add("material-item");

        itemOutro.innerHTML = `
            <input
                type="checkbox"
                id="checkboxOutro"
            >

            Outro
        `;

        listaMateriais.appendChild(itemOutro);



        const campoOutro = document.createElement("input");

        campoOutro.type = "text";
        campoOutro.id = "campoOutro";
        campoOutro.placeholder = "Digite o material que você precisa";
        campoOutro.classList.add("campo-outro");

        campoOutro.style.display = "none";

        listaMateriais.appendChild(campoOutro);


        // Mostrar/esconder o campo "Outro"

        const checkboxOutro =
            document.getElementById("checkboxOutro");

        checkboxOutro.addEventListener("change", function () {

            if (checkboxOutro.checked) {

                campoOutro.style.display = "block";

            } else {

                campoOutro.style.display = "none";
                campoOutro.value = "";

            }

        });

    } catch (erro) {

        console.error("Erro ao carregar materiais:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
}

formularioPedido.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const alunoId = localStorage.getItem("alunoId");

    if (!alunoId) {
        alert("Aluno não identificado.");
        return;
    }

    const titulo = document.getElementById("tituloPedido").value;
    const descricao = document.getElementById("descricaoPedido").value;

    const checkboxes = listaMateriais.querySelectorAll(
        'input[type="checkbox"]:not(#checkboxOutro)'
    );

    const materiais = [];

    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            materiais.push({
                materialId: Number(checkbox.value)
            });

        }

    });


    const checkboxOutro =
        document.getElementById("checkboxOutro");

    const campoOutro =
        document.getElementById("campoOutro");


    if (checkboxOutro.checked) {

        if (!campoOutro.value.trim()) {

            alert("Informe qual material você precisa em 'Outro'.");

            return;
        }

        materiais.push({
            materialOutro: campoOutro.value.trim()
        });

    }


    if (materiais.length === 0) {

        alert("Selecione pelo menos um material.");

        return;
    }


    try {

        const resposta = await fetch(
            "http://localhost:3000/pedidos",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    titulo: titulo,
                    descricao: descricao,
                    alunoId: Number(alunoId),
                    materiais: materiais
                })
            }
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            alert(dados.erro);

            return;
        }


        console.log("Pedido criado:", dados);

        alert("Pedido enviado com sucesso!");

        formularioPedido.reset();

        campoOutro.style.display = "none";

    } catch (erro) {

        console.error("Erro ao criar pedido:", erro);

        alert("Não foi possível conectar com o servidor.");
    }

});

listaPedidos.addEventListener("click", function (evento) {

    if (evento.target.classList.contains("botaoInteresse")) {

        const pedidoId = evento.target.dataset.pedidoId;

        demonstrarInteresse(pedidoId);
    }

});

async function carregarMeusPedidos() {

    const alunoId = localStorage.getItem("alunoId");

    if (!alunoId) {
        alert("Aluno não identificado.");
        return;
    }

    try {

        const resposta = await fetch(
            `http://localhost:3000/usuarios/aluno/${alunoId}/pedidos`
        );

        const pedidos = await resposta.json();

        if (!resposta.ok) {
            alert(pedidos.erro);
            return;
        }

        const listaMeusPedidos =
            document.getElementById("listaMeusPedidos");

        listaMeusPedidos.innerHTML = "";

        if (pedidos.length === 0) {

            listaMeusPedidos.innerHTML = `
                <p>
                    Você ainda não possui nenhum pedido.
                </p>
            `;

            return;
        }

        pedidos.forEach(function (pedido) {

            const card = document.createElement("div");

            let materiaisHTML = "";

            pedido.materiais.forEach(function (item) {

                if (item.material) {

                    materiaisHTML += `
                        <li>${item.material.nome}</li>
                    `;

                } else if (item.materialOutro) {

                    materiaisHTML += `
                        <li>${item.materialOutro}</li>
                    `;

                }

            });

            card.innerHTML = `
                <h2>${pedido.titulo}</h2>

                <p>
                    ${pedido.descricao}
                </p>

                <p>
                    <strong>Materiais necessários:</strong>
                </p>

                <ul>
                    ${materiaisHTML}
                </ul>

                <p>
                    <strong>Status:</strong>
                    ${pedido.status}
                </p>
            `;

            listaMeusPedidos.appendChild(card);

        });

    } catch (erro) {

        console.error("Erro ao carregar meus pedidos:", erro);

        alert("Não foi possível conectar com o servidor.");
    }
}

botaoMeusInteresses.addEventListener("click", function () {

    telaPedidos.classList.add("tela-escondida");
    telaInteresses.classList.remove("tela-escondida");

    carregarInteresses();

});

botaoVoltarPedidos.addEventListener("click", function () {

    telaInteresses.classList.add("tela-escondida");
    telaPedidos.classList.remove("tela-escondida");

    carregarPedidos();

});

botaoVoltarCriarPedido.addEventListener("click", function () {

    telaCriarPedido.classList.add("tela-escondida");
    telaAluno.classList.remove("tela-escondida");

});

botaoMeusPedidos.addEventListener("click", function () {

    telaCriarPedido.classList.add("tela-escondida");
    telaMeusPedidos.classList.remove("tela-escondida");

    carregarMeusPedidos();

});

botaoVoltarMeusPedidos.addEventListener("click", function () {

    telaMeusPedidos.classList.add("tela-escondida");
    telaCriarPedido.classList.remove("tela-escondida");

});