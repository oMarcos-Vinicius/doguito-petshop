//cadastrar cliente

const cadastrarCliente = (nome, email) => {
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    }).then(resposta => {
        if (resposta.ok) {
            return resposta.body
        }
        throw Error('Não foi possível cadastrar o cliente')
    })
}

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async(evento) => {
    evento.preventDefault()
    const nome = evento.target.querySelector('[data-nome]').value
    const email = evento.target.querySelector('[data-email]').value
    try {
        await cadastrarCliente(nome, email)
        window.location.href = '../telas/cadastro_concluido.html'
    } catch (erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
})