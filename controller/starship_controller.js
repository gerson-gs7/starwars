import { Starship } from "../model/Starship.js";
import { starship_service } from "../service/starship_service.js";



const criaNovoCard = (starship) => {
    const card = document.createElement('div');
    const container = `
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        <h5 class="card-title">${starship.get_name()}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Model: ${starship.get_model()}</li>
                        <li class="list-group-item">Price: ${starship.get_price()}</li>
                        <li class="list-group-item">Manufacturer: ${starship.get_manufacturer()}</li>
                        <li class="list-group-item">Crew: ${starship.get_crew()}</li>
                        <li class="list-group-item">Max atmosphering speed:</li>
                        <li class="list-group-item">Hyperdrive rating:</li>
                        <li class="list-group-item">Class:</li>
                    </ul>
                </div>

    `
    card.innerHTML = container;
    card.className = 'card text-white bg-dark mb-3 col-sm-12';
    card.style = 'max-width: 18rem;'
    return card;
}
const container = document.querySelector('[data-container]');
const render = async () => {
    try {
        const starship_list = await starship_service.starship_list()
        starship_list.forEach(ship => {
            const starship = new Starship(
                ship.name,
                ship.model,
                ship.price,
                ship.cost_in_credits,
                ship.manufacturer,
                ship.crew,
                ship.max_atmosphering_speed,
                ship.hyperdrive_rating,
                ship.starship_class
            )
            container.appendChild(criaNovoCard(starship));
            console.log(ship);
            

        })
    } catch (error) {

        console.log(error);
    }
}
render();