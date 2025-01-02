
const get_list = (endPoint, params) => {
    return fetch(`https://www.swapi.tech/api/${endPoint}${params}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err))
}

const get_properties = (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(data => data.result.properties)
        .catch(err => console.error(err))

}

export const service = {
    get_list,
    get_properties
}











