async function carregarRoca() {
    const container = document.getElementById("participantes-roca");

    try {
        const participantes = await listarNaRoca();

        container.innerHTML = "";

        participantes.forEach(function (participante) {
            container.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${participante.foto}" alt="${participante.nome}" class="card-img-top">

                        <div class="card-body">
                            <h3 class="h5 card-title">
                                ${participante.nome}
                            </h3>

                            <span class="badge bg-danger">Na roça</span>
                        </div>
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