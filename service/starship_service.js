
const starship_list = () =>{
    return fetch("https://www.swapi.tech/api/starships/")
    .then(res => res.json())
    .then(data => data.results)
    .catch(err => console.error(err))
}
export const starship_service = {
 starship_list   
}

