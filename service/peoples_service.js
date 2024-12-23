const listaPersonagens = async () => {
    try {
        const response = await fetch(`https://www.swapi.tech/api/people`);
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error(err);
    }
};

export const peopleService = {
    listaPersonagens
};