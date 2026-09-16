// Referências DOM
const botaoDoador = document.getElementById("botaoDoador");
const botaoAluno = document.getElementById("botaoAluno");
const botaoJaSouDoador = document.getElementById("botaoJaSouDoador");
const telaInteresses = document.getElementById("telaInteresses");

const telaInicial = document.getElementById("telaInicial");
const telaAluno = document.getElementById("telaAluno");
const telaAcessoDoador = document.getElementById("telaAcessoDoador");
const telaDoador = document.getElementById("telaDoador");
const telaPedidos = document.getElementById("telaPedidos");

const formularioAcessoDoador = document.getElementById("formularioAcessoDoador");
const botaoMeusInteresses = document.getElementById("botaoMeusInteresses");
const botaoVoltarPedidos = document.getElementById("botaoVoltarPedidos");
const botaoVoltarTelaPedidos = document.getElementById("botaoVoltarTelaPedidos");
const formularioAluno = document.getElementById("formularioAluno");
const botaoVoltarAluno = document.getElementById("botaoVoltarAluno");
const telaCriarPedido = document.getElementById("telaCriarPedido");
const formularioPedido = document.getElementById("formularioPedido");
const listaMateriais = document.getElementById("listaMateriais");
const botaoVoltarCriarPedido = document.getElementById("botaoVoltarCriarPedido");
const telaMeusPedidos = document.getElementById("telaMeusPedidos");
const botaoMeusPedidos = document.getElementById("botaoMeusPedidos");
const botaoVoltarMeusPedidos = document.getElementById("botaoVoltarMeusPedidos");

const botaoVoltarAcesso = document.getElementById("botaoVoltarAcesso");
const botaoVoltar = document.getElementById("botaoVoltar");
const formularioDoador = document.getElementById("formularioDoador");

const listaPedidos = document.getElementById("listaPedidos");
const listaInteresses = document.getElementById("listaInteresses");

const telaEscolhaAluno = document.getElementById("telaEscolhaAluno");
const telaAcessoAluno = document.getElementById("telaAcessoAluno");

const botaoAlunoCadastrado = document.getElementById("botaoAlunoCadastrado");
const botaoPrimeiroCadastro = document.getElementById("botaoPrimeiroCadastro");
const botaoVoltarEscolhaAluno = document.getElementById("botaoVoltarEscolhaAluno");

const formularioAcessoAluno = document.getElementById("formularioAcessoAluno");
const botaoVoltarAcessoAluno = document.getElementById("botaoVoltarAcessoAluno");

const telaEscola = document.getElementById("telaEscola");
const botaoAcessoEscola = document.getElementById("botaoAcessoEscola");
const botaoVoltarEscola = document.getElementById("botaoVoltarEscola");
const listaPedidosEscola = document.getElementById("listaPedidosEscola");

// ===== Popup de mensagens (substitui os alert() do navegador) =====
const popupMensagem = document.getElementById("popupMensagem");
const popupMensagemTexto = document.getElementById("popupMensagemTexto");
const popupMensagemFechar = document.getElementById("popupMensagemFechar");
let popupMensagemTimeoutId = null;

function exibirMensagem(mensagem, tipo = "erro") {
    popupMensagemTexto.textContent = mensagem;
    popupMensagem.classList.remove("popup-erro", "popup-sucesso");
    popupMensagem.classList.add(tipo === "sucesso" ? "popup-sucesso" : "popup-erro");
    popupMensagem.classList.add("popup-visivel");

    if (popupMensagemTimeoutId) clearTimeout(popupMensagemTimeoutId);
    popupMensagemTimeoutId = setTimeout(fecharMensagem, 4000);
}

function fecharMensagem() {
    popupMensagem.classList.remove("popup-visivel");
}

popupMensagemFechar.addEventListener("click", fecharMensagem);

// Navegação basica
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

botaoVoltarAluno.addEventListener("click", function () {
    telaAluno.classList.add("tela-escondida");
    telaEscolhaAluno.classList.remove("tela-escondida");
});

// Acesso Doador
formularioAcessoDoador.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    const email = document.getElementById("emailAcessoDoador").value;

    try {
        const resposta = await fetch(
            `/usuarios/doador?email=${encodeURIComponent(email)}`
        );
        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, "erro");
            return;
        }

        localStorage.setItem("doadorId", dados.id);
        telaAcessoDoador.classList.add("tela-escondida");
        telaPedidos.classList.remove("tela-escondida");
        carregarPedidos();
    } catch (erro) {
        console.error("Erro ao buscar doador:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
});

// Cadastro Doador
formularioDoador.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    const nome = document.getElementById("nomeDoador").value;
    const email = document.getElementById("emailDoador").value;

    try {
        const resposta = await fetch("/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, tipo: "DOADOR" })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, "erro");
            return;
        }

        localStorage.setItem("doadorId", dados.id);
        telaDoador.classList.add("tela-escondida");
        telaPedidos.classList.remove("tela-escondida");
        carregarPedidos();
    } catch (erro) {
        console.error("Erro ao cadastrar doador:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
});

// Cadastro Aluno
formularioAluno.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    const nome = document.getElementById("nomeAluno").value;
    const matricula = document.getElementById("matriculaAluno").value;

    try {
        const resposta = await fetch("/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, matricula, tipo: "ALUNO" })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, "erro");
            return;
        }

        localStorage.setItem("alunoId", dados.id);
        exibirMensagem("Cadastro realizado com sucesso!", "sucesso");
        telaAluno.classList.add("tela-escondida");
        telaCriarPedido.classList.remove("tela-escondida");
        carregarMateriais();
    } catch (erro) {
        console.error("Erro ao cadastrar aluno:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
});

// Acesso Aluno
formularioAcessoAluno.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    const nome = document.getElementById("nomeAcessoAluno").value;
    const matricula = document.getElementById("matriculaAcessoAluno").value;

    try {
        const resposta = await fetch(
            `/usuarios/aluno?matricula=${encodeURIComponent(matricula)}&nome=${encodeURIComponent(nome)}`
        );
        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, "erro");
            return;
        }

        localStorage.setItem("alunoId", dados.id);
        exibirMensagem("Acesso realizado com sucesso!", "sucesso");
        telaAcessoAluno.classList.add("tela-escondida");
        telaCriarPedido.classList.remove("tela-escondida");
        carregarMateriais();
    } catch (erro) {
        console.error("Erro ao buscar aluno:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
});

// Carregar Pedidos para o Doador
async function carregarPedidos() {
    try {
        const resposta = await fetch("/pedidos");
        const pedidos = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem("Não foi possível carregar os pedidos.", "erro");
            return;
        }

        listaPedidos.innerHTML = "";
        const pedidosDisponiveis = pedidos.filter(p => p.status === "DISPONIVEL");

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
                <p>${pedido.descricao}</p>
                <p><strong>Estudante:</strong> ${pedido.aluno ? pedido.aluno.nome : 'Não informado'}</p>
                <p><strong>Materiais necessários:</strong></p>
                <ul>${materiaisHTML}</ul>
                <button class="botaoInteresse" data-pedido-id="${pedido.id}">
                    Tenho interesse
                </button>
            `;
            listaPedidos.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao carregar pedidos:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
}

async function demonstrarInteresse(pedidoId) {
    const doadorId = localStorage.getItem("doadorId");
    if (!doadorId) {
        exibirMensagem("Doador não identificado.", "erro");
        return;
    }

    try {
        const resposta = await fetch("/interesses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pedidoId: Number(pedidoId),
                doadorId: Number(doadorId)
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, "erro");
            return;
        }

        exibirMensagem("Obrigado! A escola entrará em contato com você pelo e-mail informado.", "sucesso");
        carregarPedidos();
    } catch (erro) {
        console.error("Erro ao demonstrar interesse:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
}

async function carregarInteresses() {
    const doadorId = localStorage.getItem("doadorId");
    if (!doadorId) {
        exibirMensagem("Doador não identificado.", "erro");
        return;
    }

    try {
        const resposta = await fetch(`/interesses/doador/${doadorId}`);
        const interesses = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(interesses.erro, "erro");
            return;
        }

        listaInteresses.innerHTML = "";

        if (interesses.length === 0) {
            listaInteresses.innerHTML = `<p>Você ainda não demonstrou interesse em nenhum pedido.</p>`;
            return;
        }

        interesses.forEach(function (interesse) {
            const pedido = interesse.pedido;
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
                <p>${pedido.descricao}</p>
                <p><strong>Estudante:</strong> ${pedido.aluno ? pedido.aluno.nome : 'Não informado'}</p>
                <p><strong>Materiais necessários:</strong></p>
                <ul>${materiaisHTML}</ul>
                <p><strong>Status:</strong> ${pedido.status}</p>
            `;
            listaInteresses.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao carregar interesses:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
}

async function carregarMateriais() {
    try {
        const resposta = await fetch("/materiais");
        const materiais = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem("Não foi possível carregar os materiais.", "erro");
            return;
        }

        listaMateriais.innerHTML = "";

        materiais.forEach(function (material) {
            const item = document.createElement("label");
            item.classList.add("material-item");
            item.innerHTML = `
                <input type="checkbox" value="${material.id}">
                ${material.nome}
            `;
            listaMateriais.appendChild(item);
        });

        const itemOutro = document.createElement("label");
        itemOutro.classList.add("material-item");
        itemOutro.innerHTML = `
            <input type="checkbox" id="checkboxOutro">
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

        const checkboxOutro = document.getElementById("checkboxOutro");
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
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
}

formularioPedido.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    const alunoId = localStorage.getItem("alunoId");

    if (!alunoId) {
        exibirMensagem("Aluno não identificado.", "erro");
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
            materiais.push({ materialId: Number(checkbox.value) });
        }
    });

    const checkboxOutro = document.getElementById("checkboxOutro");
    const campoOutro = document.getElementById("campoOutro");

    if (checkboxOutro && checkboxOutro.checked) {
        if (!campoOutro.value.trim()) {
            exibirMensagem("Informe qual material você precisa em 'Outro'.", "erro");
            return;
        }
        materiais.push({ materialOutro: campoOutro.value.trim() });
    }

    if (materiais.length === 0) {
        exibirMensagem("Selecione pelo menos um material.", "erro");
        return;
    }

    try {
        const resposta = await fetch("/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titulo,
                descricao,
                alunoId: Number(alunoId),
                materiais
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, "erro");
            return;
        }

        exibirMensagem("Pedido enviado com sucesso!", "sucesso");
        formularioPedido.reset();
        if (campoOutro) campoOutro.style.display = "none";
    } catch (erro) {
        console.error("Erro ao criar pedido:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
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
        exibirMensagem("Aluno não identificado.", "erro");
        return;
    }

    try {
        const resposta = await fetch(
            `/usuarios/aluno/${alunoId}/pedidos`
        );
        const pedidos = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(pedidos.erro, "erro");
            return;
        }

        const listaMeusPedidos = document.getElementById("listaMeusPedidos");
        listaMeusPedidos.innerHTML = "";

        if (pedidos.length === 0) {
            listaMeusPedidos.innerHTML = `<p>Você ainda não possui nenhum pedido.</p>`;
            return;
        }

        pedidos.forEach(function (pedido) {
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
                <p>${pedido.descricao}</p>
                <p><strong>Materiais necessários:</strong></p>
                <ul>${materiaisHTML}</ul>
                <p><strong>Status:</strong> ${pedido.status}</p>
            `;
            listaMeusPedidos.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao carregar meus pedidos:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
}

async function carregarPedidosEscola() {
    try {
        const resposta = await fetch("/pedidos");
        const pedidos = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem("Não foi possível carregar os pedidos.", "erro");
            return;
        }

        listaPedidosEscola.innerHTML = "";

        if (pedidos.length === 0) {
            listaPedidosEscola.innerHTML = `<p>Não existem pedidos cadastrados.</p>`;
            return;
        }

        pedidos.forEach(function (pedido) {
            const card = document.createElement("div");
            let materiaisHTML = "";

            pedido.materiais.forEach(function (item) {
                if (item.material) {
                    materiaisHTML += `<li>${item.material.nome}</li>`;
                } else if (item.materialOutro) {
                    materiaisHTML += `<li>${item.materialOutro}</li>`;
                }
            });

            let botaoHTML = "";
            if (pedido.status === "EM_ANDAMENTO") {
                botaoHTML = `
                    <button type="button" class="botaoAtenderPedido" data-pedido-id="${pedido.id}">
                        Confirmar doação
                    </button>
                `;
            }

            card.innerHTML = `
                <h2>${pedido.titulo}</h2>
                <p>${pedido.descricao}</p>
                <p><strong>Matrícula:</strong> ${pedido.aluno ? pedido.aluno.matricula : 'N/A'}</p>
                <p><strong>Materiais necessários:</strong></p>
                <ul>${materiaisHTML}</ul>
                <p><strong>Status:</strong> ${pedido.status}</p>
                ${botaoHTML}
            `;
            listaPedidosEscola.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao carregar pedidos da escola:", erro);
        exibirMensagem("Não foi possível conectar com o servidor.", "erro");
    }
}

listaPedidosEscola.addEventListener("click", async function (evento) {
    if (evento.target.classList.contains("botaoAtenderPedido")) {
        const pedidoId = evento.target.dataset.pedidoId;

        try {
            const resposta = await fetch(
                `/${pedidoId}/atender`,
                { method: "PATCH" }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                exibirMensagem(dados.erro, "erro");
                return;
            }

            exibirMensagem("Doação confirmada com sucesso!", "sucesso");
            carregarPedidosEscola();
        } catch (erro) {
            console.error("Erro ao confirmar doação:", erro);
            exibirMensagem("Não foi possível conectar com o servidor.", "erro");
        }
    }
});

// Navegação secundária
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

// Voltar da tela de Pedidos Disponíveis para a tela inicial
// (essa tela pode ser alcançada tanto pelo cadastro quanto pelo acesso do doador,
// então o retorno vai direto para o início do fluxo)
botaoVoltarTelaPedidos.addEventListener("click", function () {
    telaPedidos.classList.add("tela-escondida");
    telaInicial.classList.remove("tela-escondida");
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

botaoAcessoEscola.addEventListener("click", function () {
    telaInicial.classList.add("tela-escondida");
    telaEscola.classList.remove("tela-escondida");
    carregarPedidosEscola();
});

botaoVoltarEscola.addEventListener("click", function () {
    telaEscola.classList.add("tela-escondida");
    telaInicial.classList.remove("tela-escondida");
});