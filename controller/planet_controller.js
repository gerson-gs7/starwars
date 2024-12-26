import { Planet } from "../model/Planet.js";
import { service } from "../service/service.js";

const data_container = document.querySelector('[data-container]');
const pagination_menu = document.querySelector('[pagination]')
const select = document.querySelector("select");
let total_records = ""
let total_pages = ""
let previous_page = ""
let next_page = ""
let currentPage = "1"
let limit = "10"
const currentUrl = new URL(window.location.href);
const params = new URLSearchParams(currentUrl.search);
// Pegando os valores dos parâmetros da url
if(params.get('page')) currentPage = params.get('page')
if(params.get('limit')) limit = params.get('limit')

// Esse método retorna uma array de planetas
const planets_list = async (page, limit) => {
    const planets = []

    try {
        const dataAPI = await service.get_list("planets", page, limit)
        total_records = dataAPI.total_records
        total_pages = dataAPI.total_pages
        previous_page = dataAPI.previous
        next_page = dataAPI.next
        dataAPI.results.forEach(result => {
            planets.push(result)
        })

        return planets
    } catch (error) {
        console.log(`Erro planets_list: ${error}`);
    }
}
// Esse método retorna uma instância do objeto Planet
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
// Esse método retorna um elemento card com os dados do Planeta
const createNewCard = (planet) => {
    const card = document.createElement('div');
    const container = `
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
    card.innerHTML = container;
    card.className = 'card text-white mb-3 col-sm-12';
    card.id = 'card';
    card.style = 'max-width: 18rem;'
    return card;
}
// Esse método retorna o menu de paginação
const createPagination = (page) => {
    const ul = document.createElement('ul')
    ul.className = 'pagination';
    
    let btPrevious = document.createElement('li')
    btPrevious.className = 'page-item'
    btPrevious.innerHTML = `<button class="page-link">Previous</button>`
    if(page==1) btPrevious.querySelector('button').className = "page-link disabled"
    btPrevious.addEventListener("click", function() {
        render(page-1,limit)
    })
    ul.appendChild(btPrevious)
    
    for (let i = 1; i <= total_pages; i++) {

        let li = document.createElement('li')
        li.className = 'page-item'
        li.innerHTML = ` <a class="page-link active" href="?page=${i}&limit=${limit}">${i}</a>` 
        if(page != i)li.querySelector('a').className = 'page-link'
        
        ul.appendChild(li)
        
    }
      
    let btNext = document.createElement('li')
    btNext.className = 'page-item'
    btNext.innerHTML = `<button class="page-link" href="#">Next</button>`
    if(page==total_pages) btNext.querySelector('button').className = "page-link disabled";
    btNext.addEventListener("click", function() {
        render(page+1,limit)
    })
    ul.appendChild(btNext)
    
    return ul;
}

    // Esse método renderiza na tela todos os cards carregados
const render = async (page, limit) => {
    
    const list_planets = await planets_list(page, limit)
    
    while (data_container.firstChild) {
        data_container.removeChild(data_container.firstChild)
    }
    while (pagination_menu.firstChild) {
        pagination_menu.removeChild(pagination_menu.firstChild)
    }

    list_planets.map(async (result) => {
        const planet = await get_planet(result.url)
        data_container.appendChild(createNewCard(planet));
    })
    pagination_menu.appendChild(createPagination(page));
}
render(currentPage, limit)

select.addEventListener("change", function (event) {
    limit = event.target.value
    render(1, limit)
})

const optionToSelect = select.querySelector(`option[value="${limit}"]`);
optionToSelect.selected = true;