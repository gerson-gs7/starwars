const get_list = (endPoint, page, limit) =>{
    fetch(`https://www.swapi.tech/api/${endPoint}?page=${page}&limit=${limit}`)
.then(res => res.json())
.then(data => data)
.catch(err => console.error(err))
}


const get_properties = (url)=>{
    return fetch(url)
    .then(res => res.json())
    .then(data => data.result.properties)

}
export const service = {
    get_list,
    get_properties
}











