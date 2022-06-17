import {MAIN_API_URL} from './config';
import Api from "./api";

class MainApi extends Api {

    constructor({serverUrl, headers}) {
        super({serverUrl});
        this._headers = headers;
    }

    registerNewUser(email, password) {
        return fetch(`${this._serverUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResult);
    }

    loginUser(email, password) {
        return fetch(`${this._serverUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResult);
    }

    updateTokenInHeaders() {
        // console.log(' !!! updateTokenInHeaders:  token = ', `Bearer ${localStorage.getItem('token')}`);
        this._headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    getUserInfo() {
        // console.log(' !!! getUserInfo: fetch( ', `${this._serverUrl}/users/me`);
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResult);
    }

    updateUserInfo(name, email) {
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(this._checkResult);
    }

    saveMovie(
                country, 
                director, 
                duration, 
                year, 
                description, 
                image, 
                trailerLink, 
                thumbnail,
                movieId, 
                nameRU, 
                nameEN
            ) {
            console.log(' !!! saveMovie: fetch( ', `${this._serverUrl}/movies`);  
            return fetch(`${this._serverUrl}/movies`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    country: country, 
                    director: director, 
                    duration: duration, 
                    year: year,
                    description: description, 
                    image: image, 
                    trailerLink: trailerLink, 
                    thumbnail: thumbnail,
                    movieId : movieId, 
                    nameRU: nameRU, 
                    nameEN: nameEN
            })
        })
            .then(this._checkResult);
    }

    deleteMovie(id) {
        return fetch(`${this._serverUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResult);
    }

    getSavedMovies() {
        return fetch(`${this._serverUrl}/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
            .then(this._checkResult);
    }
}

const mainApi = new MainApi({
    // serverUrl: MAIN_API_URL,
    serverUrl: 'https://mesto.backend.annsyh.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default mainApi;