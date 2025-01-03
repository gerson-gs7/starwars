import { Starship } from "../model/Starship.js";
import { service } from "../service/service.js";
import { utils } from "../utils/utils.js";

const data_container = document.querySelector('[data-container]');
const pagination_menu = document.querySelector('[pagination]')
const select = document.querySelector("select");
const searchButton = document.getElementById('searchButton')

let total_pages = ""
var currentPage = 1
let limit = 10

// Pegando os valores dos parâmetros da url
const currentUrl = new URL(window.location.href);
const params = new URLSearchParams(currentUrl.search);
if (params.get('page')) currentPage = params.get('page')
if (params.get('limit')) limit = params.get('limit')

// Pega o evento de click no Botão Search    
searchButton.addEventListener('click',function(event){
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    
    if(searchInput.value.trim() !== ''){
        search()    
    }else{
        render()
    }
       
})
const search = async () => {

    const searchInput = document.getElementById('searchInput');
    const params = `?name=${searchInput.value}`
    render(params)
}
//Retorna uma array de naves
const starship_list_filter = async (params) => {

    const ships = []
    
    if (params === undefined) params = `?page=${currentPage}&limit=${limit}`
    
    try {
        const dataAPI = await service.get_list("starships", params)
        if(!dataAPI.result == []){
            document.getElementById('loading-overlay').style.display = 'none';
        }
        dataAPI.result.forEach(result => {
            ships.push(result)
        })
        
        return ships
    } catch (error) {
        console.log(`Erro starship_list: ${error}`);
    }
}
const starship_list = async () => {

    const ships = []
    const params = `?page=${currentPage}&limit=${limit}`
    try {
        const dataAPI = await service.get_list("starships", params)
        total_pages = dataAPI.total_pages
        dataAPI.results.forEach(result => {
            ships.push(result)
        })
        return ships
    } catch (error) {
        console.log(`Erro starships_list: ${error}`);
    }
}

const get_ship = async (url) => {
    try {
        const ship = await service.get_properties(url)

        const starship = new Starship(
            ship.name,
            ship.model,
            ship.cost_in_credits,
            ship.manufacturer,
            ship.crew,
            ship.max_atmosphering_speed,
            ship.hyperdrive_rating,
            ship.starship_class
        )
        return starship

    } catch (error) {
        console.log(error);
    }
}

const newCard = (starship) => {
    
    const model = `
        <ul class="card-header text-black">${starship.get_name()}
        </ul>
        <div class="card-body">
                <li class="list-group-item bg-dark text-white ps-1">&#8226 Model: ${starship.get_model()}</li>
                <li class="list-group-item text-black ps-1">&#8226 Cost in credits: ${starship.get_cost_in_credits()}</li>
                <li class="list-group-item bg-dark text-white ps-1">&#8226 Manufacturer: ${starship.get_manufacturer()}</li>
                <li class="list-group-item text-black ps-1">&#8226 Crew: ${starship.get_crew()}</li>
                <li class="list-group-item bg-dark text-white ps-1">&#8226 Max atmosphering speed: ${starship.get_max_atmosphering_speed()}</li>
                <li class="list-group-item text-black ps-1">&#8226 Hyperdrive rating: ${starship.get_hyperdrive_rating()}</li>
                <li class="list-group-item bg-dark text-white ps-1">&#8226 Class: ${starship.get_starship_class()}</li>
         </div>`
    const card = utils.createCard(model)
    return card
}

const render = async (params) => {
    while (data_container.firstChild) {
        data_container.removeChild(data_container.firstChild)
    }
    while (pagination_menu.firstChild) {
        pagination_menu.removeChild(pagination_menu.firstChild)
    }

    document.getElementById('loading-overlay').style.display = 'flex';

    
    if(params !== undefined){
        total_pages = 1;
        const list = await starship_list_filter(params)
        list.map(async (result)=> {
            const starship = await get_ship(result.properties.url)
            data_container.appendChild(newCard(starship))
            document.getElementById('loading-overlay').style.display = 'none';
            rolarParaElemento()
        })
    }else{
        const list = await starship_list()
        list.map(async (data) => {
            const starship = await get_ship(data.url)
            data_container.appendChild(newCard(starship))
            document.getElementById('loading-overlay').style.display = 'none';
            rolarParaElemento()
        });
    }
    pagination_menu.appendChild(utils.createPagination(currentPage, limit, total_pages))    
}
render()

// Pega o evento de troca de opção no select
select.addEventListener("change", function (event) {
    limit = event.target.value
    render(1, limit)
})

const optionToSelect = select.querySelector(`option[value="${limit}"]`);
optionToSelect.selected = true;

//SCROLLAR
function rolarParaElemento() {
    const elemento = document.getElementById("container");
    window.scrollTo({
        top: elemento.offsetTop,
        behavior: 'smooth'
    });
}