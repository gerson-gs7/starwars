import { Starship } from "../model/Starship.js";
import { starship_service } from "../service/starship_service.js";


const container = document.querySelector('[data-container]');

const createNewCard = (starship) => {
    const card = document.createElement('div');
    const container = `
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        <h5 class="card-title">${starship.get_name()}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Model: ${starship.get_model()}</li>
                        <li class="list-group-item">Cost in credits: ${starship.get_cost_in_credits()}</li>
                        <li class="list-group-item">Manufacturer: ${starship.get_manufacturer()}</li>
                        <li class="list-group-item">Crew: ${starship.get_crew()}</li>
                        <li class="list-group-item">Max atmosphering speed: ${starship.get_max_atmosphering_speed()}</li>
                        <li class="list-group-item">Hyperdrive rating: ${starship.get_hyperdrive_rating()}</li>
                        <li class="list-group-item">Class: ${starship.get_starship_class()}</li>
                    </ul>
                </div>

    `
    card.innerHTML = container;
    card.className = 'card text-white bg-dark mb-3 col-sm-12';
    card.id = 'card';
    card.style = 'max-width: 18rem;'
    return card;
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

const starship_list_url = async () => {
    try {
        const urls = []
        const starship_list = await starship_service.starship_list()
        starship_list.forEach(result => {
            urls.push(result.url)
        });

        return urls
    } catch (error) {

        console.log(error);
    }

}

const render = async () => {
    const list_ships = await starship_list_url()
    list_ships.map(async (url) => {
        const starship = await get_ship(url)
        container.appendChild(createNewCard(starship))
    });
}
render();