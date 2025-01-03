import { People } from "../model/People.js";
import { service } from "../service/service.js";
import { utils } from "../utils/utils.js";

let currentPage = 1;
let limit = 10;
let total_pages = ""

const currentUrl = new URL(window.location.href);
const params = new URLSearchParams(currentUrl.search);

// Pegando os valores dos parâmetros da url
if (params.get('page')) currentPage = params.get('page')
    if (params.get('limit')) limit = params.get('limit')    
        
const data_container = document.querySelector('[data-container]');
const pagination_menu = document.querySelector('[pagination]')
const select = document.querySelector("#selectItensforPag")

//funçãod e criação de cards dos personagens

const criaCard = (personagem) => {

    const cardNovoPersonagem = document.createElement('div');
    cardNovoPersonagem.classList.add('card', 'mb-3');
    cardNovoPersonagem.dataset.name = personagem.name.toLowerCase();
    cardNovoPersonagem.dataset.eyeColor = personagem.eye_color.toLowerCase();
    cardNovoPersonagem.dataset.hairColor = personagem.hair_color.toLowerCase();
    cardNovoPersonagem.dataset.gender = personagem.gender.toLowerCase();
    
    const conteudo = ` 
        <ul class="card-header">${substituirIndefinido(personagem.name)}
        </ul>
        <div class="card-body">
            <li class="card-text bg-dark text-white ps-1">Eye Color: ${substituirIndefinido(personagem.eye_color)}</li>
            <li class="card-text ps-1">Hair Color: ${substituirIndefinido(personagem.hair_color)}</li>
            <li class="card-text bg-dark text-white ps-1">Gender: ${substituirIndefinido(personagem.gender)}</li>
            <li class="card-text ps-1">Birth Year: ${substituirIndefinido(personagem.birth_year)}</li>
            <li class="card-text bg-dark text-white ps-1">Homeworld: ${substituirIndefinido(personagem.get_homeworld())}</li>
            </div>
            `
    cardNovoPersonagem.innerHTML = conteudo;
    return cardNovoPersonagem;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const peopleList = async () =>{
    let people = []
    let params = `?page=${currentPage}&limit=${limit}`
    try {
        const dataAPI = await service.get_list("people", params)
            
        total_pages = dataAPI.total_pages
        
        dataAPI.results.forEach(res =>{
            people.push(res)
        })
        return people;
    } catch (error) {
        console.log("peopleList: "+error);       
    } 
}

const getPeople = async (url) => {
    const resAPI = await service.get_properties(url)
    try {
        const planet_name = await getPlanetName(resAPI.homeworld)
        const people = new People(
            resAPI.name,
            planet_name,
            resAPI.hair_color,
            resAPI.eye_color,
            resAPI.birth_year,
            resAPI.gender,
            resAPI.uid)
            
            return people
        } catch (error) {
            console.log("get people ERROR:"+error);          
    }
}
const getPlanetName = async (url) => {
    try {
        const res_api = await service.get_properties(url)

        const planet_name = res_api.name
        return planet_name
        
    } catch (error) {
        console.log(`Erro get_planet: ${error}`);
    }
}
//método para renderizar os cards
const render = async () => {
    document.getElementById('loading-overlay').style.display = 'flex';
    try {
        while (data_container.firstChild) {
            data_container.removeChild(data_container.firstChild)
        }
        while (pagination_menu.firstChild) {
            pagination_menu.removeChild(pagination_menu.firstChild)
        }
        const personagens = await peopleList();
        
        personagens.map(async (res) => {
            
            const people = await getPeople(res.url)
            data_container.appendChild(criaCard(people))
        })
        pagination_menu.appendChild(utils.createPagination(currentPage, limit, total_pages))
        document.getElementById('loading-overlay').style.display = 'none';
    } catch (error) {
        console.log(error);
    }
};

// Pega o evento de troca de opção no select
select.addEventListener("change", function (event) {
    limit = event.target.value
    render(1, limit)
})

const optionToSelect = select.querySelector(`option[value="${limit}"]`);
optionToSelect.selected = true;
render();

//substituindo o valor retornado de n/a para undefined
const substituirIndefinido = (valor) => {
    return valor === "n/a" ? "undefined" : valor;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//controle de filtros e pesquisa
const filtrarCards = () => {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const eyeColor = document.getElementById('eyeColorInput').value.toLowerCase();
    const hairColor = document.getElementById('hairColorInput').value.toLowerCase();
    const gender = document.getElementById('genderSelectInput').value.toLowerCase();
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.dataset.name;
        const cardEyeColor = card.dataset.eyeColor;
        const cardHairColor = card.dataset.hairColor;
        const cardGender = card.dataset.gender;
        
        const matchesSearch = !search || name.includes(search);
        const matchesEyeColor = !eyeColor || cardEyeColor.includes(eyeColor);
        const matchesHairColor = !hairColor || cardHairColor.includes(hairColor);
        const matchesGender = !gender || cardGender === gender;
        
        if (matchesSearch && matchesEyeColor && matchesHairColor && matchesGender) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};
// Adicionar eventos de input para filtrar dinamicamente
document.getElementById('searchInput').addEventListener('input', filtrarCards);
document.getElementById('eyeColorInput').addEventListener('input', filtrarCards);
document.getElementById('hairColorInput').addEventListener('input', filtrarCards);
document.getElementById('genderSelectInput').addEventListener('change', filtrarCards);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////