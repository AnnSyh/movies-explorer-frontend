import { MOVIES_URL } from './config';
import Api from "./api";

class MoviesApi extends Api {
    constructor({ serverUrl }) {
        super({ serverUrl });
    }

    getAllMovies() {
        return fetch(`${this._serverUrl}/beatfilm-movies`, {
            method: 'GET',
        })
        .then(super._checkResult);
    }
}

const moviesApi = new MoviesApi({
    serverUrl: 'https://api.nomoreparties.co'
    // serverUrl: MOVIES_URL
});

export default moviesApi;