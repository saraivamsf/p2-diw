async function carregarRoca() {
    const container = document.getElementById("participantes-roca");

    try {
        const participantes = await listarNaRoca();

        container.innerHTML = "";

        participantes.forEach(function (participante) {
            container.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${participante.foto}"
                             alt="${participante.nome}"
                             class="card-img-top">

                        <div class="card-body">
                            <h3 class="h5 card-title">
                                ${participante.nome}
                            </h3>

                            <span class="badge bg-danger">Na roça</span>
                            <button type="button"
                                    class="btn btn-danger w-100 mt-3"
                                    onclick="votar(${participante.id}, this)">
                                Votar para eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        container.innerHTML = `
            <div class="col-12">
                <p class="alert alert-danger">
                    Não foi possível carregar a roça.
                    Confira se o JSON Server está funcionando.
                </p>
            </div>
        `;

        console.error(erro);
    }
}

carregarRoca();

async function carregarDemaisPeoes() {
    const container = document.getElementById("demais-participantes");

    try {
        const participantes = await listarForaDaRoca();

        container.innerHTML = "";

        participantes.forEach(function (participante) {
            container.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${participante.foto}" alt="${participante.nome}" class="card-img-top">

                        <div class="card-body">
                            <h3 class="h6 card-title">
                                ${participante.nome}
                            </h3>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        container.innerHTML = `
            <div class="col-12">
                <p class="alert alert-danger">
                    Não foi possível carregar os demais peões.
                </p>
            </div>
        `;

        console.error(erro);
    }
}

carregarDemaisPeoes();

let votosNestaPagina = 0;

async function votar(participanteId, botao) {
    const mensagem = document.getElementById("mensagem-voto");
    const nome = botao.closest(".card")
                      .querySelector(".card-title")
                      .textContent.trim();

    botao.disabled = true;

    try {
        await registrarVoto(participanteId);

        votosNestaPagina++;

        mensagem.className = "alert alert-success";
        mensagem.textContent =
            `Voto registrado para eliminar ${nome}! ` +
            `Você já votou ${votosNestaPagina} vez(es) nesta visita.`;
    } catch (erro) {
        mensagem.className = "alert alert-danger";
        mensagem.textContent = "Não foi possível votar. Tente novamente.";
        console.error(erro);
    } finally {
        botao.disabled = false;
    }
}