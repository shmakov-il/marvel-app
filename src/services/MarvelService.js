class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=ad2a7e2018a3a18509d8f48aa026fa8b';

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`)
        return await res.json();
    }

    getCharactersAll = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=200&${this._apiKey}`);
        return res.data.results.map(this._transformChar)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 170)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;