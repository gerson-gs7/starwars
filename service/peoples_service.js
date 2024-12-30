export const peopleFetch = async () => {
    const cacheKey = 'todosPersonagens';
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        console.log('buscando personagem pelo cache');
        console.log(localStorage.getItem('todosPersonagens'));
        // console.log(cacheKey);
        // console.log(cachedData);
        return JSON.parse(cachedData);
    } else {
        console.log('buscando personagens pela api');

        let url = 'https://www.swapi.tech/api/people?page=1&limit=82';
        let todosPersonagens = [];

        try {
            const response = await fetch(url);
            const data = await response.json();
            todosPersonagens = todosPersonagens.concat(data.results);
            localStorage.setItem(cacheKey, JSON.stringify(todosPersonagens));

        } catch (err) {
            console.log('erro', err);
        }
        return todosPersonagens;
    }
};

export const peopleService = {
    peopleFetch
};
