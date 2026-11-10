async function carregarResultado() {
    const totalElemento = document.getElementById("total-votos");
    const placar = document.getElementById("placar");

    try {
        const participantes = await listarNaRoca();
        const votos = await listarVotos();
        const total = votos.length;

        totalElemento.textContent = `${total} voto(s) computado(s)`;

        if (total === 0) {
            placar.innerHTML = `
                <div class="alert alert-warning text-center py-4">
                    <p class="mb-3">Nenhum voto ainda. Escolha quem sai da roça para ajudar o programa.</p>
                    <a href="votacao.html" class="btn btn-danger">Vá votar</a>
                </div>
            `;
            return;
        }

        const resultado = participantes.map(function (participante) {
            const quantidade = votos.filter(function (voto) {
                return voto.participanteId === participante.id;
            }).length;

            return {
                ...participante,
                votos: quantidade,
                percentual: (quantidade / total) * 100
            };
        });

        resultado.sort(function (a, b) {
            return b.votos - a.votos;
        });

        placar.innerHTML = "";

        resultado.forEach(function (participante) {
            const percentual = participante.percentual.toFixed(1);
            const lider = participante.votos === resultado[0].votos;

            placar.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex align-items-center gap-3">
                            <img src="${participante.foto}" alt="${participante.nome}" width="80" class="rounded">

                            <div class="flex-grow-1">
                                <h2 class="h5">${participante.nome}</h2>

                                ${lider
                                    ? '<span class="badge bg-danger mb-2">Sairia hoje</span>'
                                    : ''}

                                <p class="mb-2">
                                    ${participante.votos} voto(s) — ${percentual}%
                                </p>

                                <div class="progress"
                                     role="progressbar"
                                     aria-label="Percentual de ${participante.nome}"
                                     aria-valuenow="${percentual}"
                                     aria-valuemin="0"
                                     aria-valuemax="100">
                                    <div class="progress-bar bg-danger"
                                         style="width: ${percentual}%">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        totalElemento.textContent = "Erro ao carregar o resultado.";
        placar.innerHTML = `
            <p class="alert alert-danger">
                Confira se o JSON Server está funcionando.
            </p>
        `;
        console.error(erro);
    }
}

carregarResultado();

const botaoZerar = document.getElementById("confirmar-zerar");

botaoZerar.addEventListener("click", async function () {
    const mensagemErro = document.getElementById("erro-zerar");

    botaoZerar.disabled = true;
    mensagemErro.textContent = "";

    try {
        await zerarVotos();
        await carregarResultado();

        const elementoModal = document.getElementById("modal-zerar");
        const modal = bootstrap.Modal.getInstance(elementoModal);

        modal.hide();
    } catch (erro) {
        mensagemErro.textContent =
            "Não foi possível apagar todos os votos. Tente novamente.";

        await carregarResultado();
        console.error(erro);
    } finally {
        botaoZerar.disabled = false;
    }
});
