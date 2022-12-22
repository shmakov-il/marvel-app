class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=ad2a7e2018a3a18509d8f48aa026fa8b';

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`)
        return await res.json();
    }

    getCharactersAll = () => {
        return this.getResource(`${this._apiBase}/characters?limit=9&offset=200&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;