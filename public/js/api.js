async function listarNaRoca() {
    const resposta = await fetch("/participantes?naRoca=true");

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar os participantes.");
    }

    return resposta.json();
}

async function listarForaDaRoca() {
    const resposta = await fetch("/participantes?naRoca=false");

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar os demais peões.");
    }

    return resposta.json();
}

async function registrarVoto(participanteId) {
    const resposta = await fetch("/votos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            participanteId: participanteId,
            data: new Date().toISOString()
        })
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível registrar o voto.");
    }

    return resposta.json();
}

async function listarVotos() {
    const resposta = await fetch("/votos");

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar os votos.");
    }

    return resposta.json();
}

async function zerarVotos() {
    const votos = await listarVotos();

    for (const voto of votos) {
        const resposta = await fetch(`/votos/${voto.id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível apagar todos os votos.");
        }
    }
}