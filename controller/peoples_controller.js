import { peopleService } from "../service/peoples_service.js"

const criaLinha = (name, planet, year, id) => {
    const linhaNovoPersonagem = document.createElement('tr')
    const conteudo = ` 
        <td class="td" data-td>${name}</td>
            <td>${planet}</td>
            <td>${year}</td>
        </td>
        `
    linhaNovoPersonagem.innerHTML = conteudo
    linhaNovoPersonagem.dataset.id = id

    return linhaNovoPersonagem
}

const tabela = document.querySelector('[data-tabela]')

const render = async () => {
    try {
        const listaPersonagens = await peopleService.listaPersonagens()
        listaPersonagens.forEach(elemento => {
            tabela.appendChild(criaLinha(elemento.name, elemento.planet, elemento.year, elemento.id))
        })    
    } catch (erro) {
        console.log(erro);
    }
}

render()