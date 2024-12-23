const listaPersonagens = () => {
    return fetch(`https://www.swapi.tech/api/people`)
    .then(res => res.json())
    .then(data => data.results)
    .catch(err => console.error(err))
}
export const peopleService = {
    listaPersonagens
}
