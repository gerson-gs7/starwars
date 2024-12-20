const listaPersonagens = () => {
    return fetch(`https://www.swapi.tech/api/peoples/1`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw new Error('Não foi possível listar os clientes')
        })
}

export const peopleService = {
    listaPersonagens
}