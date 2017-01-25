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
        var bodyStr=    "username=" + encodeURIComponent(data.username) +
                        "&password="+encodeURIComponent(data.password) +
                        "&name="+encodeURIComponent(data.name) +
                        "&surname="+encodeURIComponent(data.surname)
        fetch(url+'/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: bodyStr
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            if (json.token) {
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
        var bodyStr= "username=" + encodeURIComponent(data.username) +"&password="+encodeURIComponent(data.password)
        fetch(url+'/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: bodyStr
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json)
            // Imposta cookie se c'è il token
            if (json.token !== undefined) {
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
        var bodyStr= "match_id=" + encodeURIComponent(data.match_id) +
                     "&number="+encodeURIComponent(data.number) +
                     "&token="+getCookie('user_token') +
                     "&reply_n="+ encodeURIComponent(data.reply_id)
        fetch(url+'/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: bodyStr
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
