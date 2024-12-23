import { People } from "../model/People.js"
import { peopleService } from "../service/peoples_service.js"

const criaLinha = (People) => {
    const linhaNovoPersonagem = document.createElement('tr')
    const conteudo = ` 
        <td class="td" data-td>${People.get_name()}</td>
            <td>${People.get_homeworld()}</td>
            <td>${People.get_eye_color()}</td>
            <td>${People.get_hair_color()}</td>
            <td>${People.get_gender()}</td>
            <td>${People.get_birth_year()}</td>
        </td>
        `
    linhaNovoPersonagem.innerHTML = conteudo
    // linhaNovoPersonagem.dataset.uid = id
    return linhaNovoPersonagem
}

const tabela = document.querySelector('[data-tabela]')
const render = async () => {
    
    try {
        const character = await peopleService.listaPersonagens();
        console.log(character)
        character.forEach( character => {
            const people = new People(character.name)
            tabela.appendChild(criaLinha(people));
        })
        // console.log(conteudo);
        
    } catch (error) {
        
        console.log(error);
    }
}
    render()
