import { Starship } from "../model/Starship.js";
import { service } from "../service/service.js";
import { starship_service } from "../service/starship_service.js";
service


const container = document.querySelector('[data-container]');
const page = "1"
const limit = "10"


const starship_list_url = async (page, limit) => {
    try {
        const urls = []
        const starship_list = await service.get_list("starships", page, limit)
        starship_list.forEach(result => {
            urls.push(result.url)
        });
        
        return urls
    } catch (error) {
        
        console.log(error);
    }
}

const starship_list = async () => {
    const ships = []
    try {
        const dataAPI = await service.get_list("starships", page, limit)
        total_records = dataAPI.total_records
        total_pages = dataAPI.total_pages
        previous_page = dataAPI.previous
        next_page = dataAPI.next
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
        const ship = await starship_service.starship_properties(url)
        
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

const createNewCard = (starship) => {
    const card = document.createElement('div');
    const container = `
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        <h5 class="card-title">${starship.get_name()}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-secondary">Model: ${starship.get_model()}</li>
                        <li class="list-group-item bg-ligth">Cost in credits: ${starship.get_cost_in_credits()}</li>
                        <li class="list-group-item bg-secondary">Manufacturer: ${starship.get_manufacturer()}</li>
                        <li class="list-group-item bg-ligth">Crew: ${starship.get_crew()}</li>
                        <li class="list-group-item bg-secondary">Max atmosphering speed: ${starship.get_max_atmosphering_speed()}</li>
                        <li class="list-group-item bg-ligth">Hyperdrive rating: ${starship.get_hyperdrive_rating()}</li>
                        <li class="list-group-item bg-secondary">Class: ${starship.get_starship_class()}</li>
                    </ul>
                </div>

    `
    card.innerHTML = container;
    card.className = 'card text-white mb-3 col-sm-12';
    card.id = 'card';
    card.style = 'max-width: 18rem;'
    return card;
}

const render = async () => {
    const list_ships = await starship_list_url()
    list_ships.map(async (url) => {
        const starship = await get_ship(url)
        container.appendChild(createNewCard(starship))
    });
}
//render();