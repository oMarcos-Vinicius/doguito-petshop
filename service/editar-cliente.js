const trazerDados = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw Error('Não foi possível trazer o cliente')
        })
}

const atualizarDados = (id, name, mail) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: name,
            email: mail
        })
    })
}

(async() => {
    const pegarURL = new URL(window.location);

    const id = pegarURL.searchParams.get('id');

    const inputNome = document.querySelector('[data-nome]');
    const inputEmail = document.querySelector('[data-email]');
    try {
        const dados = await trazerDados(id)
        inputNome.value = dados.nome;
        inputEmail.value = dados.email;
    } catch (erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

    const formulario = document.querySelector('[data-form]');

    formulario.addEventListener('submit', async(evento) => {
        evento.preventDefault();
        try {
            await atualizarDados(id, inputNome.value, inputEmail.value)
            window.location.href = '../telas/cadastro_concluido.html'
        } catch (erro) {
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    })
})()