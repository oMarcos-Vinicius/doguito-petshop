// buscar clientes

/*
--------- Metodo antigo para fazer uma requisição --------
const listasClientes = () => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        http.open('GET', 'http://localhost:3000/profile');

        http.onload = () => {
            if (http.status >= 400) {
                reject(JSON.parse(http.response))
            } else {
                resolve(JSON.parse(http.response))
            }
        }
        http.send();
    })
    return promise
}
*/

// ------ Metodo mais simples usando o Fetch --------------

const listasClientes = () => {
    return fetch(`http://localhost:3000/profile/`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw Error('Não foi possível listar os clientes')
        })
}


const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement('tr');
    const conteudo = `<td class="td" data-td>${nome}</td>
                        <td>${email}</td>
                        <td>
                            <ul class="tabela__botoes-controle">
                                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                            </ul>
                        </td>`
    linhaNovoCliente.innerHTML = conteudo;
    linhaNovoCliente.dataset.id = id
    return linhaNovoCliente;
}

const tabela = document.querySelector('[data-tabela]');

const render = async() => {
    try {
        const clientes = await listasClientes()
        clientes.forEach(element => {
            tabela.appendChild(criaNovaLinha(element.nome, element.email, element.id))
        })
    } catch (erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

}
render();

tabela.addEventListener('click', async(evento) => {
    console.log(evento)
    let ehBotaoDeleta = evento.target.className === "botao-simples botao-simples--excluir";
    console.log(ehBotaoDeleta)
    if (ehBotaoDeleta) {
        try {
            const linhaCliente = evento.target.closest('[data-id]');
            let id = linhaCliente.dataset.id
            await excluirCliente(id)
            await listasClientes.remove();
        } catch (erro) {
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }

})

const excluirCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (!resposta.ok) {
            throw Error('Não foi possível listar os clientes')
        }
    })
}