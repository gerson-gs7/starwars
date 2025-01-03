import { Starship } from "../model/Starship.js";
import { service } from "../service/service.js";
import { utils } from "../utils/utils.js";

var currentPage = 1
let limit = 10
let total_pages = ""

const data_container = document.querySelector('[data-container]');
const pagination_menu = document.querySelector('[pagination]')
const select = document.querySelector("select");
// const searchInput = document.querySelector('#searchInput');
// const searchButton = document.querySelector('#searchButton')

const currentUrl = new URL(window.location.href);
const params = new URLSearchParams(currentUrl.search);

// Pegando os valores dos parâmetros da url
if (params.get('page')) currentPage = params.get('page')
if (params.get('limit')) limit = params.get('limit')

// const newCard = (starship) => {
//     const cardNewStarship = document.createElement('div');
//     cardNewStarship.classList.add('card', 'mb-3');
//     cardNewStarship.dataset.name = starship.get_name();
//     cardNewStarship.dataset.minPrice = starship.get_cost_in_credits();
//     cardNewStarship.dataset.maxPrice = starship.get_cost_in_credits();
//     cardNewStarship.dataset.shipClass = starship.get_starship_class();
//     const model = `
// <ul class="card-header text-black">${starship.get_name()}
//         </ul>
//         <div class="card-body">
//             <li class="list-group-item bg-dark text-white ps-1">&#8226 Model: ${starship.get_model()}</li>
//                         <li class="list-group-item text-black ps-1 card mb-3 col-sm-12">&#8226 Cost in credits: ${starship.get_cost_in_credits()}</li>
//                         <li class="list-group-item bg-dark text-white ps-1 card mb-3 col-sm-12">&#8226 Manufacturer: ${starship.get_manufacturer()}</li>
//                         <li class="list-group-item text-black ps-1 card mb-3 col-sm-12">&#8226 Crew: ${starship.get_crew()}</li>
//                         <li class="list-group-item bg-dark text-white ps-1 card mb-3 col-sm-12">&#8226 Max atmosphering speed: ${starship.get_max_atmosphering_speed()}</li>
//                         <li class="list-group-item text-black ps-1 card mb-3 col-sm-12">&#8226 Hyperdrive rating: ${starship.get_hyperdrive_rating()}</li>
//                         <li class="list-group-item bg-dark text-white ps-1 card mb-3 col-sm-12">&#8226 Class: ${starship.get_starship_class()}</li>
//                     </div>`

//     // const card = utils.createCard(model)
//     cardNewStarship.innerHTML = model;
//     return cardNewStarship
// };

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

const render = async (page, limit) => {
    document.getElementById('loading-overlay').style.display = 'flex';

    try {
        while (data_container.firstChild) {
            data_container.removeChild(data_container.firstChild)
        }
        while (pagination_menu.firstChild) {
            pagination_menu.removeChild(pagination_menu.firstChild)
        }
        const list = await starship_list(page, limit)

        list.map(async (data) => {

            const starship = await get_ship(data.url)
            data_container.appendChild(newCard(starship))
            document.getElementById('loading-overlay').style.display = 'none';
        });
        pagination_menu.appendChild(utils.createPagination(page, limit, total_pages))
        rolarParaElemento()

    } catch (error) {
        console.log("erro na renderização da starshipPage");

    }
}
// Pega o evento de troca de opção no select
select.addEventListener("change", function (event) {
    limit = event.target.value
    render(1, limit)
})

const optionToSelect = select.querySelector(`option[value="${limit}"]`);
optionToSelect.selected = true;
render(currentPage, limit)

//controle de filtros e pesquisa
const filtrarCards = () => {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('minPriceInput').value);
    const maxPrice = parseFloat(document.getElementById('maxPriceInput').value);
    const shipClass = document.getElementById('shipClassInput').value.toLowerCase();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.dataset.name ? card.dataset.name.toLowerCase() : '';
        const cardPrice = parseFloat(card.dataset.cost_in_credits);
        const cardShipClass = card.dataset.starship_class ? card.dataset.starship_class.toLowerCase() : '';

        const matchesSearch = !search || name.includes(search);
        const matchesMinPrice = isNaN(minPrice) || cardPrice >= minPrice;
        const matchesMaxPrice = isNaN(maxPrice) || cardPrice <= maxPrice;
        const matchesShipClass = !shipClass || cardShipClass.includes(shipClass);

        if (matchesSearch && matchesMinPrice && matchesMaxPrice && matchesShipClass) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Adicionar eventos de input para filtrar dinamicamente
document.getElementById('searchInput').addEventListener('input', filtrarCards);
document.getElementById('minPriceInput').addEventListener('input', filtrarCards);
document.getElementById('maxPriceInput').addEventListener('input', filtrarCards);
document.getElementById('shipClassInput').addEventListener('input', filtrarCards);

//SCROLLAR
function rolarParaElemento() {
    const elemento = document.getElementById("container");
    window.scrollTo({
        top: elemento.offsetTop,
        behavior: 'smooth'
    });
}