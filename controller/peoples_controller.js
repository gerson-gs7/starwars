import { peopleService } from "../service/peoples_service.js"

const criaLinha = (name, eye, year, id) => {
    const linhaNovoPersonagem = document.createElement('tr')
    const conteudo = ` 
        <td class="td" data-td>${name}</td>
            <td>${eye}</td>
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
        const character = await peopleService.listaPersonagens();
        console.log(character); // Verifique o que está sendo retornado

        const listaPersonagens = character.result.properties; // Acesse a propriedade correta

        listaPersonagens.forEach(elemento => {
            tabela.appendChild(criaLinha(elemento.name, elemento.eye_color, elemento.birth_year, elemento.id));
        });
    } catch (erro) {
        console.log(erro);
    }
};

render();

// const render = async (data) => {
//     const character = await peopleService.listaPersonagens();
//     console.log(character);
//     const listaPersonagens = character.result.properties;
//     if (data) {
//         listaPersonagens.forEach(elemento => {
//             tabela.appendChild(criaLinha(elemento.name, elemento.eye_color, elemento.birth_year, elemento.id));
//         });
//         // Supondo que data seja um objeto com as propriedades name, birth_year e eye_color
//         console.log(`Name: ${data.name}`);
//         console.log(`Birth Year: ${data.birth_year}`);
//         console.log(`Eye Color: ${data.eye_color}`);
//     } else {
//         console.error('Data is undefined or null:', data);
//     }
// };

// // Exemplo de uso
// peopleService.listaPersonagens().then(render);