import { Starship } from "../model/Starship.js";
import { starship_service } from "../service/starship_service.js";



const criaNovoCard = (Starship)=>{
    const card = document.createElement('div');
    const container = `<div class="card-header">${Starship.get_name()}</div>
                <div class="card-body">
                  <h5 class="card-title">Dark card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>`

                card.innerHTML = container;
                card.className = 'card text-white bg-dark mb-3';
                card.style = 'max-width: 18rem;'
                return card;
}
const container = document.querySelector('[data-container]');
const render = async () => {
    try {
        const starship_list = await starship_service.starship_list()
        starship_list.forEach( ship => {
        const starship = new Starship(ship.name)
        container.appendChild(criaNovoCard(starship));

        })
    } catch (error) {
        
        console.log(error);
    }
}
render();