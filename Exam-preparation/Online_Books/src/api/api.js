import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';


async function request(url, method, data) { //1) sendQueries  2) getInfoFromAnswer  3) errorHandling  4) authorization
    const options = {
        method,
        headers: {}
    };

    if(data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const res = await fetch(host + url, options);

        if(!res.ok) {
            if(res.status == 403) {
                clearUserData();
            }
            const error = await res.json();
            return alert(error.message);
        }

        if(res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch(err) {
        alert(err.message);
        throw err;
    }
    
}

export async function get(url) {
    return request(url, 'get');
}

export async function post(url, info) {
    return request(url, 'post', info);
}

export async function put(url, info) {
    return request(url, 'put', info);
}

export async function del(url) {
    return request(url, 'delete');
}