import 'whatwg-fetch';
import {setCookie} from './cookie.js';
import config from '../../config.json';

/*
 * File contente i metodi per le chiamate REST al server
 */

const url = config.api_url;

class Api {

    /*
     * Register new user
     * data is an object containing user data
     * fn is the success function callback
     */
    static register(data,fn) {
        fetch(url+'/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                name: data.name,
                surname: data.surname
            })
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.error === 0 && json.token) {
                setCookie('user_token',json.token,30);
            }
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }

    /*
     * authenticate
     * data is an object containing user data
     * fn is the success function callback
     */
    static authenticate(data,fn) {
        fetch(url+'/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            })
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            // Imposta cookie se c'è il token
            if (json.error === 0 && json.token) {
                setCookie('user_token',json.token,30);
            }
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }
}

export default Api;
