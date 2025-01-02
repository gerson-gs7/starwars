import { Starship } from "../model/Starship.js";
import { service } from "../service/service.js";
import { utils } from "../utils/utils.js";

const data_container = document.querySelector('[data-container]');
const pagination_menu = document.querySelector('[pagination]')
const select = document.querySelector("select");
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton')
var currentPage = 1
let limit = 10
let total_pages = ""


const currentUrl = new URL(window.location.href);
const params = new URLSearchParams(currentUrl.search);

// Pegando os valores dos parâmetros da url
if (params.get('page')) currentPage = params.get('page')
if (params.get('limit')) limit = params.get('limit')


const starship_list = async (page, limit) => {

    const ships = []
    const params = `?page=${page}&limit=${limit}`
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
    // const model = `
    //             <div class="card" style="width: 18rem;">
    //                 <div class="card-header">
    //                     <h5 class="card-title">${starship.get_name()}</h5>
    //                 </div>
    //                 <ul class="list-group list-group-flush">
    //                     <li class="list-group-item bg-secondary">Model: ${starship.get_model()}</li>
    //                     <li class="list-group-item bg-ligth">Cost in credits: ${starship.get_cost_in_credits()}</li>
    //                     <li class="list-group-item bg-secondary">Manufacturer: ${starship.get_manufacturer()}</li>
    //                     <li class="list-group-item bg-ligth">Crew: ${starship.get_crew()}</li>
    //                     <li class="list-group-item bg-secondary">Max atmosphering speed: ${starship.get_max_atmosphering_speed()}</li>
    //                     <li class="list-group-item bg-ligth">Hyperdrive rating: ${starship.get_hyperdrive_rating()}</li>
    //                     <li class="list-group-item bg-secondary">Class: ${starship.get_starship_class()}</li>
    //                 </ul>
    //             </div>
    // `
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

const render = async (page, limit) => {
    document.getElementById('loading-overlay').style.display = 'flex';

    const list = await starship_list(page, limit)
    while (data_container.firstChild) {
        data_container.removeChild(data_container.firstChild)
    }
    while (pagination_menu.firstChild) {
        pagination_menu.removeChild(pagination_menu.firstChild)
    }
    list.map(async (data) => {
        const starship = await get_ship(data.url)
        data_container.appendChild(newCard(starship))
        document.getElementById('loading-overlay').style.display = 'none';
    });
    pagination_menu.appendChild(utils.createPagination(page, limit, total_pages))
    rolarParaElemento()
}
// Pega o evento de troca de opção no select
select.addEventListener("change", function (event) {
    limit = event.target.value
    render(1, limit)
})

const optionToSelect = select.querySelector(`option[value="${limit}"]`);
optionToSelect.selected = true;

render(currentPage, limit)

//SCROLLAR
function rolarParaElemento() {
    const elemento = document.getElementById("container");
    window.scrollTo({
        top: elemento.offsetTop,
        behavior: 'smooth'
    });
}