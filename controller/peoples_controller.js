import { peopleService } from "../service/peoples_service.js"

const criaLinha = (personagem, homeworldName) => {
    const linhaNovoPersonagem = document.createElement('tr');
    const conteudo = ` 
        <td class="td" data-td>${substituirIndefinido(personagem.name)}</td>
        <td>${substituirIndefinido(homeworldName)}</td>
        <td>${substituirIndefinido(personagem.eye_color)}</td>
        <td>${substituirIndefinido(personagem.hair_color)}</td>
        <td>${substituirIndefinido(personagem.gender)}</td>
        <td>${substituirIndefinido(personagem.birth_year)}</td>
    `;
    linhaNovoPersonagem.innerHTML = conteudo;
    return linhaNovoPersonagem;
};

const fetchTodosPersonagens = async () => {
    let url = 'https://www.swapi.tech/api/people?page=1&limit=10';
    let todosPersonagens = [];
    let hasNextPage = true;

    while (hasNextPage) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            todosPersonagens = todosPersonagens.concat(data.results);

            if (data.next) {
                url = data.next;
            } else {
                hasNextPage = false;
            }
        } catch (err) {
            console.error(err);
            hasNextPage = false;
        }
    }

    return todosPersonagens;
};

const substituirIndefinido = (valor) => {
    return valor === "n/a" ? "indefinido" : valor;
};

const tabela = document.querySelector('[data-tabela]');

const render = async () => {
    try {
        const personagens = await fetchTodosPersonagens();
        const detalhesPersonagens = await Promise.all(personagens.map(async (personagem) => {
            const response = await fetch(personagem.url);
            const data = await response.json();
            const personagemDetalhes = data.result.properties;

            // Buscar o nome do planeta de origem
            const homeworldResponse = await fetch(personagemDetalhes.homeworld);
            const homeworldData = await homeworldResponse.json();
            const homeworldName = substituirIndefinido(homeworldData.result.properties.name);

            return { ...personagemDetalhes, homeworldName };
        }));

        detalhesPersonagens.forEach(personagem => {
            tabela.appendChild(criaLinha(personagem, personagem.homeworldName));
        });
    } catch (error) {
        console.log(error);
    }
};

render();