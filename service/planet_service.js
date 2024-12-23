const get_list = (endPoint) =>{
    fetch(`https://www.swapi.tech/api/${endPoint}`)
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err))
}