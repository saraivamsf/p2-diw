async function carregarRoca() {
    const container = document.getElementById("participantes-roca");

    try {
        const participantes = await listarNaRoca();

        container.innerHTML = "";

        participantes.forEach(function (participante) {
            container.innerHTML += `
                <div class="col-auto">
                    <div class="participante-home d-flex align-items-center gap-2">
                        <img src="${participante.foto}"
                            alt="${participante.nome}">

                        <span class="fw-bold">${participante.nome}</span>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        container.innerHTML = `
            <div class="col-12">
                <p class="alert alert-danger"> Não foi possível carregar a roça. Confira se o JSON Server está funcionando. </p>
            </div>
        `;

        console.error(erro);
    }
}

carregarRoca();