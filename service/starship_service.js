
const starship_list = () =>{
    return fetch("https://www.swapi.tech/api/starships/")
    .then(res => res.json())
    .then(data => data.results)
    .catch(err => console.error(err))
}

const starship_properties = (url) =>{

    return fetch(url)
    .then(res => res.json())
    .then(data => data.result.properties)
}

export const starship_service = {
 starship_list,
 starship_properties
}
