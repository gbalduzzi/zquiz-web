import 'whatwg-fetch';
import {getCookie, setCookie} from './cookie.js';
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

    /*
     * getUser -> get user data by ID
     * username: username of the user to obtain infos
     * fn is the success function callback
     */
    static getUser(user,fn) {
        fetch(url+'/user?username='+encodeURIComponent(user), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }

    /*
     * searchMatch
     * fn is the success function callback
     */
    static searchMatch(fn) {
        var token = getCookie('user_token');
        fetch(url+'/searchmatch?token='+encodeURIComponent(token), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }

    /*
     * getQuestion
     * n number of the question
     * fn is the success function callback
     */
    static getQuestion(n, fn) {
        var token = getCookie('user_token');
        var match_id = localStorage.match_id;

        fetch(url+'/question?token='+encodeURIComponent(token)+"&match_id="+encodeURIComponent(match_id)+"&number="+encodeURIComponent(n), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }

    /*
     * reply to a question
     * data is an object containing reply data
     * fn is the success function callback
     */
    static reply(data,fn) {
        fetch(url+'/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                match_id: data.match_id,
                number: data.number,
                token: getCookie('user_token')
            })
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }

    /*
     * endMatch
     * fn is the success function callback
     */
    static endMatch(fn) {
        var token = getCookie('user_token');
        var match_id = localStorage.match_id;

        fetch(url+'/endmatch?token='+encodeURIComponent(token)+"&match_id="+encodeURIComponent(match_id), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            fn(json);
        })
        .catch(function(error) {
            console.log("Errore!");
            console.log(error);
        });
    }
}

export default Api;
