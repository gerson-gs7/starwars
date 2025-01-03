import { Planet } from "../model/Planet.js";
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
const paramsURL = new URLSearchParams(currentUrl.search);
if (paramsURL.get('page')) currentPage = paramsURL.get('page')
if (paramsURL.get('limit')) limit = paramsURL.get('limit')

// Pega o evento de click no Botão Search    
searchButton.addEventListener('click',function(event){
    event.preventDefault();
    search()
    
})

const search = async () => {

    const searchInput = document.getElementById('searchInput');
    
    const params = `?name=${searchInput.value}`
    render(params)
}
//Retorna uma array de planetas
const planets_list_filter = async (params) => {

    const planets = []
    
    if (params === undefined) params = `?page=${currentPage}&limit=${limit}`
    
    try {
        const dataAPI = await service.get_list("planets", params)
        if(!dataAPI.result == []){
            document.getElementById('loading-overlay').style.display = 'none';
        }
        dataAPI.result.forEach(result => {
            planets.push(result)
        })
        
        
        return planets
    } catch (error) {
        console.log(`Erro planets_list: ${error}`);
    }
}
// Retorna uma array de planetas
const planets_list = async (params) => {

    const planets = []
 
    if (params === undefined)params = `?page=${currentPage}&limit=${limit}`

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
                            <li class="list-group-item bg-dark text-white ps-1">&#8226 Rotation period: ${planet.get_rotation_period()}</li>
                            <li class="list-group-item text-black ps-1">&#8226 Orbital period: ${planet.get_orbital_period()}</li>
                            <li class="list-group-item bg-dark text-white ps-1">&#8226 CLimate: ${planet.get_climate()}</li>
                            <li class="list-group-item text-black ps-1">&#8226 Gravity: ${planet.get_gravity()}</li>
                            <li class="list-group-item bg-dark text-white ps-1">&#8226 Terrain: ${planet.get_terrain()}</li>
                            <li class="list-group-item text-black ps-1">&#8226 Population: ${planet.get_population()}</li>
                        </ul>
                    </div>
    
                `
    const card = utils.createCard(model)
    return card;
}
// Renderiza na tela todos os cards carregados
const render = async (params) => {

    while (data_container.firstChild) {
        data_container.removeChild(data_container.firstChild)
    }
    while (pagination_menu.firstChild) {
        pagination_menu.removeChild(pagination_menu.firstChild)
    }

    document.getElementById('loading-overlay').style.display = 'flex';
    
    
    
    if (params !== undefined){
        total_pages = 1;
        const list = await planets_list_filter(params)
        list.map(async (result) => {

            const planet = await get_planet(result.properties.url)
            data_container.appendChild(newCard(planet));
    
            document.getElementById('loading-overlay').style.display = 'none';
            rolarParaElemento()
    
        })
    }else{
        const list = await planets_list()
        list.map(async (result) => {

            const planet = await get_planet(result.url)
            data_container.appendChild(newCard(planet));
    
            document.getElementById('loading-overlay').style.display = 'none';
            rolarParaElemento()    
        })        
    }    
    pagination_menu.appendChild(utils.createPagination(currentPage, limit, total_pages));
}

render()

// Pega o evento de troca de opção no select
select.addEventListener("change", function (event) {
    document.getElementById('loading-overlay').style.display = 'flex';
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
