import { Planet } from "../model/Planet.js";
import { service } from "../service/service.js";
import { utils } from "../utils/utils.js";

const data_container = document.querySelector('[data-container]');
const pagination_menu = document.querySelector('[pagination]')
const select = document.querySelector("select");
let total_pages = ""
var currentPage = 1
let limit = 10

const currentUrl = new URL(window.location.href);
const params = new URLSearchParams(currentUrl.search);

// Pegando os valores dos parâmetros da url
if (params.get('page')) currentPage = params.get('page')
if (params.get('limit')) limit = params.get('limit')

// Retorna uma array de planetas
const planets_list = async (page, limit) => {

    const planets = []
    const params = `?page=${page}&limit=${limit}`
    try {
        const dataAPI = await service.get_list("planets", params)
        total_pages = dataAPI.total_pages
        dataAPI.results.forEach(result => {
            planets.push(result)
        })

        return planets
    } catch (error) {
        console.log(`Erro planets_list: ${error}`);
    }
}
// Retorna uma instância do objeto Planet
const get_planet = async (url) => {
    try {
        const res_api = await service.get_properties(url)

        const planet = new Planet(
            res_api.name,
            res_api.rotation_period,
            res_api.orbital_period,
            res_api.climate,
            res_api.gravity,
            res_api.terrain,
            res_api.population
        )
        return planet
    } catch (error) {
        console.log(`Erro get_planet: ${error}`);
    }
}
// Retorna um elemento card com os dados do Planeta
const newCard = (planet) => {
    const model = `
                    <div class="card" style="width: 18rem;">
                    <div class="card-header">
                    <h5 class="card-title">${planet.get_name()}</h5>
                    </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-secondary">Rotation period: ${planet.get_rotation_period()}</li>
                            <li class="list-group-item bg-ligth">Orbital period: ${planet.get_orbital_period()}</li>
                            <li class="list-group-item bg-secondary">CLimate: ${planet.get_climate()}</li>
                            <li class="list-group-item bg-ligth">Gravity: ${planet.get_gravity()}</li>
                            <li class="list-group-item bg-secondary">Terrain: ${planet.get_terrain()}</li>
                            <li class="list-group-item bg-ligth">Population: ${planet.get_population()}</li>
                        </ul>
                    </div>
    
                `
    const card = utils.createCard(model)
    return card;
}
// Renderiza na tela todos os cards carregados
const render = async (page, limit) => {
    document.getElementById('loading-overlay').style.display = 'flex';
    const list = await planets_list(page, limit)

    while (data_container.firstChild) {
        data_container.removeChild(data_container.firstChild)
    }
    while (pagination_menu.firstChild) {
        pagination_menu.removeChild(pagination_menu.firstChild)
    }

    list.map(async (result) => {

        const planet = await get_planet(result.url)
        data_container.appendChild(newCard(planet));

        document.getElementById('loading-overlay').style.display = 'none';
        rolarParaElemento()

    })
    pagination_menu.appendChild(utils.createPagination(page, limit, total_pages));
}
//render(currentPage, limit)

// Pega o evento de troca de opção no select
select.addEventListener("change", function (event) {
    document.getElementById('loading-overlay').style.display = 'flex';
    limit = event.target.value
    render(1, limit)
})

const optionToSelect = select.querySelector(`option[value="${limit}"]`);
optionToSelect.selected = true;

function rolarParaElemento() {
    const elemento = document.getElementById("container");
    window.scrollTo({
        top: elemento.offsetTop,
        behavior: 'smooth'
    });
}
