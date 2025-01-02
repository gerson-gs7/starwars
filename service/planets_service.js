export const homeworldFetch = async (url) => {
    const cacheKey = `planet_${url}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        // console.log('buscando planeta natal pelo cache');
        // console.log(localStorage.getItem('planet_<url_do_planeta>'));
        // console.log(cacheKey);
        // console.log(cachedData);
        return JSON.parse(cachedData);
    } else {
        // console.log('buscando planeta natal pela api');
        try {
            const response = await fetch(url);
            const data = await response.json();
            const planetName = data.result.properties.name;
            localStorage.setItem(cacheKey, JSON.stringify(planetName));
            return planetName;

        } catch (err) {
            console.log('erro', err);
            return 'unknown';
        }
    }
};

export const planetService = {
    homeworldFetch
};
