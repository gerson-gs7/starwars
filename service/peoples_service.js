const listaPersonagens = () => {
    return fetch(`https://www.swapi.tech/api/people/1`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw new Error('Não foi possível listar os personagens')
        })
        .then(dados => {
            const { name, birth_year, eye_color } = dados.result.properties;
            return { name, birth_year, eye_color };
        })
        .catch(erro => {
            console.error(erro);
        });
}

export const peopleService = {
    listaPersonagens
}