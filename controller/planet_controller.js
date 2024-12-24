import { Planet } from "../model/Planet.js";
import { service } from "../service/service.js";

const container = document.querySelector('[data-container]');
const select = document.querySelector("select");

select.addEventListener("change", function (event){
    alert(`selecionado ${event.target.value}`)
    render(1, event.target.value)
})

const planets_list_url = async (page, limit) => {
    try {
        const urls = []
        const list = await service.get_list("planets",page,limit)
        starship_list.forEach(result => {
            urls.push(results.result.url)
        });

        return urls
    } catch (error) {

        console.log(`Erro planets_list_url: ${error}`);
    }

}
const get_planet = async(url) => {
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
const render = async (page, limit) => {
    const list_planets = planets_list_url(page, limit)
    list_planets.map(async (url)=>{
        const planet = await get_planet(url)

        console.log(`Planet: ${planet}`);
        
    })


}